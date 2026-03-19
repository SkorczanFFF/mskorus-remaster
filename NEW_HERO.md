# NEW_HERO (Remaster notes)

## Current state (what we’re removing)

- **Desktop**: `src/components/Hero/Partials/Scene.tsx` renders a 12‑part “crystal” (`Icosphere001_Part_*`) with click-driven explode/reset behavior (GSAP + click counting) and a higher-level “break on click” signal.
- **Mobile**: `src/components/Hero/Partials/MobileScene.tsx` renders `nodes.crystal` with `meshPhysicalMaterial`.

Goal for this iteration:
- Keep **only** `maciej`, `skorus`, and the animated **background text** (`Background`).
- Replace the crystal with a **very-light, interactive, eye-catching** element.

---

## Replacement target (selected)

We’re targeting:
- **Particles/VFX field** that reacts to pointer/scroll subtly
- **Very light mobile budget** (avoid heavy postprocessing and expensive raycasting)

---

## Options / packages (research)

### Option A — Drei `Sparkles` (fastest path, “good enough”)
- **What**: prebuilt sparkle particle field component.
- **Pros**: trivial to drop in; looks “alive” quickly.
- **Cons**: less control; still needs care with transforms (known quirks when nested in moving groups).
- Link: [Drei Sparkles](https://drei.docs.pmnd.rs/staging/sparkles)

### Option B — Plain `<points>` + `THREE.PointsMaterial` (best perf / control)
- **What**: one `THREE.Points` object with a `BufferGeometry` position attribute.
- **Pros**: typically **the best performance** (single draw call, minimal React overhead), flexible look.
- **Cons**: you own the implementation details (distribution, animation, interactions).
- Links:
  - [R3F pointcloud example](https://github.com/pmndrs/react-three-fiber/blob/master/example/src/demos/Pointcloud.tsx)
  - [Three.js `PointsMaterial` docs](https://threejs.org/docs/api/en/materials/PointsMaterial.html)

### Option C — Drei `PointMaterial` (nicer points, still light)
- **What**: convenience material for points rendering in R3F/Drei.
- **Pros**: nicer output than default `PointsMaterial` in some cases.
- **Cons**: not strictly necessary; plain `PointsMaterial` is often enough for “very light”.
- Link: [Drei PointMaterial](https://drei.docs.pmnd.rs/shaders/point-material)

### Option D — “Bigger systems” (usually not worth it for this constraint)

#### Three Nebula (particle engine)
- **What**: full particle system engine for three.js.
- **Pros**: very feature-rich; editor tooling.
- **Cons**: heavier mental + runtime footprint; likely overkill for a hero accent effect.
- Link: [Three Nebula](https://three-nebula.org/)

#### Trails / metaballs / shader FX
- Trails can be expensive quickly if used broadly (geometry multiplier).
- Metaballs/marching cubes are eye-catching but generally not “very light”.

---

## Performance checklist (mobile-first)

Main bottleneck for particles is usually **fill-rate** (too many large translucent sprites).
Guidance:
- Keep point **size small**.
- Keep count modest (e.g. **200–800**).
- Prefer a single `points` draw call.
- Avoid per-point raycasting (no hover on each particle).
- If using blending, test both `AdditiveBlending` and standard alpha (additive can wash colors).
- Keep DPR controlled (project already uses a low `dpr` range on the `Canvas`).

Extra reference about fill-rate with big point sprites:
- [PointsMaterial performance discussion](https://stackoverflow.com/questions/46354608/three-js-pointsmaterial-performance-slow-big-sprites-shapes-slow-down-performa)

R3F performance scaling ideas (optional later):
- [Scaling performance](https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance)

---

## Recommended approach (what we’ll implement now)

### “HeroParticles” component (one draw call)
Implementation shape:
- Create `src/components/Hero/Partials/HeroParticles.tsx`
- Render a `points` cloud in the crystal’s old approximate area.
- Subtle motion:
  - slow rotation + slight “breathing” scale
  - pointer-based parallax (move the whole point cloud based on pointer, not per-point)
- Optional interaction:
  - a gentle “pulse” on click/tap (changes `PointsMaterial.size` briefly)

Why this matches constraints:
- **Very light**: minimal CPU, minimal GPU; no heavy shaders; no per-point interactions.
- **Eye-catching**: constant motion + depth + additive-ish glow potential.

---

## Visual direction notes (quick)

Suggested look:
- Particles colored around your palette (white/raspberry) or a cool tint to contrast the text.
- Slight depth: distribute points in a thin shell / ellipsoid instead of a flat plane.
- Keep it “premium”: movement should be slow, smooth, and not noisy.

---

## Upgrade (Galaxy/Nebula)

We upgraded the replacement into a **galaxy/nebula** vibe while keeping the “very light mobile” constraint:

- **Distribution**: two-layer particle distribution (dense core + wider halo).
- **Brand tint**: mostly white with subtle **raspberry** accents (halo has more tint than the core).
- **Premium particles**: use a small soft-disc sprite texture as `PointsMaterial.map` (canvas-generated), with `vertexColors`.
- **Interaction**: pointer parallax + tap/click pulse (pulse bumps size + opacity).
- **Desktop pop**: subtle Bloom added **desktop-only** in `Hero.tsx`.

References:
- three.js sprite points example: [webgl_points_sprites](https://threejs.org/examples/webgl_points_sprites.html)
- fill-rate + big sprite perf note: [PointsMaterial performance discussion](https://stackoverflow.com/questions/46354608/three-js-pointsmaterial-performance-slow-big-sprites-shapes-slow-down-performa)
- optional future (heavier, more organic motion): [OwnKng/r3f-curl-noise](https://github.com/OwnKng/r3f-curl-noise)

