# Hero Loading — Analysis & Enhancement Plan

## Current Behavior

### Loading Flow

```
Page render
  → isMounted=false: shows CSS `.loader` spinner (three bouncing bars)
  → useEffect sets isMounted=true
  → inView check (threshold 0.01, triggerOnce=false)
  → isMounted && inView: mounts Canvas + Suspense
    → Suspense fallback: <Loader /> (percentage text via DefaultLoadingManager)
    → Scene loads: me.png (TextureLoader), rasterizeHeroBioToCanvas, particle geometry
    → Suspense resolves → scene appears
```

### Issues Identified

#### 1. Double loading indicator

- **CSS loader** (`.loader` bars) shows before Canvas mounts
- **Suspense Loader** (percentage text) shows inside Canvas during asset loading
- User sees bars → blank → percentage → scene. Jarring 3-phase transition.

#### 2. Canvas destroyed on scroll-away, rebuilt on scroll-back

- `triggerOnce: false` + `inView` conditional means the entire Canvas unmounts when the hero section scrolls out of view
- Scrolling back forces full re-initialization: WebGL context, shader compilation, texture loading, geometry creation
- Each remount allocates new GPU resources (textures, buffers, programs)
- Users who scroll down then back up get a loading flash every time

#### 3. No asset preloading

- `me.png` (2MB) loads only when `ImageParticleFieldFromPath` mounts inside Suspense
- The bio canvas rasterization runs synchronously on first render inside `useMemo`
- No parallel loading — assets load sequentially as components mount

#### 4. No render pausing when offscreen

- `frameloop` defaults to `"always"` — the GPU renders 60fps even after the user scrolls past the hero
- Wastes battery and GPU cycles for zero visual benefit
- On mobile, this is significant power drain

#### 5. Percentage loader limited to DefaultLoadingManager

- Only tracks Three.js-managed loads (TextureLoader for me.png)
- Bio canvas rasterization, particle geometry creation are not tracked
- Percentage jumps from 0% to 100% with one texture, not very useful

#### 6. No fade-in transition

- Scene appears instantly when Suspense resolves
- No smooth opacity transition from loading state to rendered scene

---

## Enhancement Plan

### Priority 1: Keep Canvas alive, pause rendering when offscreen

**Problem**: Canvas unmounts/remounts on scroll.
**Fix**: Mount Canvas once (use `triggerOnce: true` or always-mounted), use `frameloop="demand"` + `invalidate()` pattern.

```tsx
// Canvas always mounted after first view, but only renders when visible
<Canvas frameloop='demand'>
  ...
  <FrameloopController inView={inView} /> // calls invalidate() when inView
</Canvas>
```

A component inside Canvas that calls `invalidate()` on every `useFrame` when `inView` is true, and does nothing when offscreen. Zero GPU cost when scrolled away, instant resume when scrolled back — no re-initialization.

### Priority 2: Preload me.png before Canvas mounts

**Problem**: 2MB image loads only after Canvas + Suspense mounts.
**Fix**: Call `useLoader.preload` at module level so the texture is cached before the component tree needs it.

```tsx
// Top of Scene.tsx or a dedicated preload file
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
useLoader.preload(TextureLoader, '/me.png');
```

The image starts downloading immediately on page load. By the time the user sees the hero, it may already be cached.

### Priority 3: Unify loading indicators

**Problem**: Two different loading UIs.
**Fix**: Single loading state. Options:

**Option A — drei's `useProgress` hook:**

```tsx
import { useProgress } from '@react-three/drei';
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span>{Math.round(progress)}%</span>
    </Html>
  );
}
```

Tracks all Three.js loading automatically, cleaner than manual DefaultLoadingManager patching.

**Option B — Skeleton approach:**
Keep the CSS loader as the only indicator, remove the percentage Suspense fallback entirely. Since preloading means assets are often cached, loading is fast enough that a simple spinner suffices.

### Priority 4: Fade-in transition on scene ready

**Problem**: Scene pops in instantly.
**Fix**: Wrap the scene in an opacity transition group that fades from 0 to 1 over ~500ms when Suspense resolves.

```tsx
function FadeIn({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = ready ? 1 : 0;
    groupRef.current.traverse((child) => {
      if ('material' in child) {
        const mat = child.material as THREE.Material & { opacity: number };
        mat.opacity += (target - mat.opacity) * Math.min(delta * 3, 1);
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}
```

Alternative: CSS opacity transition on the Canvas element itself (simpler, no shader involvement).

### Priority 5: Offscreen disposal (aggressive, optional)

For memory-constrained mobile devices, optionally dispose textures and geometry when offscreen for extended periods (e.g., 30+ seconds). Rebuild lazily on scroll-back. Trade-off: slight rebuild delay vs significant VRAM savings.

Not recommended unless mobile memory is a measured problem.

---

## Implementation Priority

| #   | Enhancement                                      | Effort | Impact                               |
| --- | ------------------------------------------------ | ------ | ------------------------------------ |
| 1   | `frameloop="demand"` + keep Canvas alive         | Medium | High — eliminates remount, saves GPU |
| 2   | `useLoader.preload` for me.png                   | Low    | Medium — faster perceived load       |
| 3   | Replace DefaultLoadingManager with `useProgress` | Low    | Low — cleaner code                   |
| 4   | Fade-in transition                               | Low    | Medium — polished UX                 |
| 5   | Offscreen disposal                               | High   | Low — only for extreme mobile        |

---

## References

- [R3F Canvas `frameloop` prop](https://r3f.docs.pmnd.rs/api/canvas) — `"always"` | `"demand"` | `"never"`
- [R3F `useLoader.preload`](https://r3f.docs.pmnd.rs/api/hooks) — preload assets in global scope
- [R3F `invalidate()`](https://r3f.docs.pmnd.rs/api/hooks) — trigger render in demand mode
- [drei `useProgress`](https://github.com/pmndrs/drei#useProgress) — track Three.js loading state
- [drei `Html`](https://github.com/pmndrs/drei#html) — overlay HTML in 3D scene (used by current Loader)
