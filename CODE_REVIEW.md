# Code Review - mskorus-remaster (v2)

**Date:** 2026-02-16
**Branch:** `2026-refresh`
**Stack:** Next.js 16 / React 19 / TypeScript / React Three Fiber / GSAP / TailwindCSS

---

## Table of Contents

1. [Critical / Bugs](#1-critical--bugs)
2. [Dead Code & Unused Exports](#2-dead-code--unused-exports)
3. [Duplicate Code](#3-duplicate-code)
4. [Incorrect Hook Usage](#4-incorrect-hook-usage)
5. [Overengineering & Unnecessary Complexity](#5-overengineering--unnecessary-complexity)
6. [Performance Issues](#6-performance-issues)
7. [Type Safety Problems](#7-type-safety-problems)
8. [CSS / Styling Issues](#8-css--styling-issues)
9. [Inconsistency & Naming](#9-inconsistency--naming)
10. [Three.js / R3F Specific](#10-threejs--r3f-specific)
11. [Configuration & Build](#11-configuration--build)
12. [Accessibility](#12-accessibility)
13. [Summary](#13-summary)

---

## 1. Critical / Bugs

### 1.1 `target='blank'` Missing Underscore — Portfolio.tsx:62

```tsx
target='blank'  // Opens a window named "blank", not a new tab
```

Every other anchor in the codebase correctly uses `target='_blank'`.

**Fix:** `target='_blank'`

---

### 1.2 404 Page "Back to Home" Is Not a Link — 404.tsx:21

```tsx
<h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
Back to Home  {/* plain text, not clickable */}
```

Users cannot navigate away from the 404 page.

**Fix:** Wrap in `<Link href='/'>Back to Home</Link>`.

---

### 1.3 404 Page Uses Undefined CSS Classes — 404.tsx:19

```tsx
<WarningIcon className='drop-shadow-glow animate-flicker text-red-500' />
```

`drop-shadow-glow` and `animate-flicker` are not defined in `globals.css`, `tailwind.config.ts`, or any other stylesheet. They silently do nothing.

**Fix:** Either define them or remove them.

---

### 1.4 Node Version Mismatch — package.json vs .nvmrc vs .npmrc

| File | Version |
|------|---------|
| `package.json` engines | `>=20.17.0` |
| `.nvmrc` | `18.x` |
| `.npmrc` line 1 | `v18.14.0` |

`engine-strict=true` in `.npmrc` means `npm install` will **refuse to run** if Node doesn't match. These three files contradict each other.

**Fix:** Align all to `20.x` (or whichever is actually used).

---

### 1.5 Footer ScrollTrigger Never Cleaned Up — Footer.tsx:9-30

```tsx
useEffect(() => {
  gsap.fromTo(getInTouchRef.current, {...}, {
    scrollTrigger: { trigger: getInTouchRef.current, ... }
  });
}, []);
// No cleanup — ScrollTrigger leaks on unmount
```

**Fix:** Use `useScrollTriggers` hook (same pattern as Experience, Technos, Portfolio).

---

### 1.6 `useMemo` Used for Side Effects — Scene.tsx:256-258

```tsx
useMemo(() => {
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}, [gl]);
```

`useMemo` is for computing return values. `setPixelRatio` is a side effect. Under React concurrent mode, this factory can be called multiple times or discarded.

**Fix:** Change to `useEffect`.

---

### 1.7 `UnderConstruction` setTimeout Never Cleaned Up — UnderConstruction.tsx:11

```tsx
const handleClose = () => {
  setIsClosing(true);
  setTimeout(() => setIsVisible(false), 300);
};
```

If the component unmounts before 300ms, `setIsVisible` fires on an unmounted component.

**Fix:** Store timeout ID in a ref and clear it in a `useEffect` cleanup.

---

## 2. Dead Code & Unused Exports

### 2.1 Unused `links` Prop — Mobile.tsx:4

`MobileProps` declares `links: LinkItem[]` but the component never destructures or uses it. The mobile nav links are rendered in `Header.tsx` directly.

**Fix:** Remove `links` from `MobileProps` and from the callsite in `Header.tsx:50`.

---

### 2.2 Unused CSS Keyframes `gradientAnimationY` — globals.css:130-162

Three vendor-prefixed versions (33 lines) defined but never referenced by any class.

**Fix:** Delete all three `@keyframes gradientAnimationY` blocks.

---

### 2.3 Unused CSS Classes `perspective-right-alt` / `perspective-left-alt` — globals.css:172-180

Defined but never used in any component.

**Fix:** Delete (8 lines).

---

### 2.4 Commented-Out Code in Resume — resume/index.tsx:357-359

```tsx
{/* <div className='mx-4 text-justify text-[12px] ...'>{languageData.rodo}</div> */}
```

Dead code left in production.

**Fix:** Delete or use a feature flag.

---

### 2.5 Empty `className` Attributes — resume/index.tsx:291,294,297

```tsx
<p className=''>{languageData.headers.languages.english}</p>
```

Three instances of `className=''` that do nothing.

**Fix:** Remove the attribute.

---

### 2.6 `isMobile` Redundancy in `useMemo` — Scene.tsx:342

```tsx
const groupScale = useMemo(() => (isMobile ? 1.15 : 1.5), [isMobile]);
```

`isMobile` from `react-device-detect` is a constant — it never changes after import. Memoizing a ternary on a constant is unnecessary.

**Fix:** `const groupScale = isMobile ? 1.15 : 1.5;`

---

## 3. Duplicate Code

### 3.1 Tech Stack Data Duplicated Across 2 Files

| File | Lines | Structure |
|------|-------|-----------|
| `Technos.tsx:123-223` | 100 lines | `techCategories` with 5 categories, 46 entries |
| `resume/index.tsx:53-84` | 31 lines | Flat `technos` array, 29 entries |

Same technologies, same icons, different sizes and grouping.

**Fix:** Single `src/data/technologies.ts` data source consumed by both.

---

### 3.2 Duplicate GSAP Pattern — About.tsx Not Using `useScrollTriggers`

`About.tsx:9-56` manually implements the exact lifecycle (`triggersRef`, setup, cleanup) that `useScrollTriggers` hook provides. Three other components (`Experience`, `Technos`, `Portfolio`) use the hook correctly.

**Fix:** Refactor to use `useScrollTriggers`.

---

### 3.3 Near-Identical Heading Animations — About.tsx:16-50

Lines 16-31 and 34-50 differ only in `x: 50` vs `x: -50`:

```tsx
gsap.set(ref.current, { x: VALUE });
const tween = gsap.to(ref.current, {
  x: 0, ease: 'none',
  scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 2 }
});
```

**Fix:** Extract helper: `createParallaxTween(element, xOffset)`.

---

### 3.4 Three Identical Footer Buttons — Footer.tsx:59-85

Three `<a>` wrappers with identical `<div>` children. The 68-char className string is repeated verbatim 3 times:

```tsx
className='text-primary-blue text-xl rounded-[2px] font-[500] tracking-wider border-2
  border-raspberry w-[200px] text-center py-4 hover:bg-raspberry hover:text-white
  duration-300 hover:rounded-xl'
```

**Fix:** Map over a data array or extract a `ContactButton` component.

---

### 3.5 `project.id % 2 === 0` Repeated 6 Times — Portfolio.tsx

Lines 56, 72, 80, 87, 97, 112 all compute the same expression.

**Fix:** `const isEven = project.id % 2 === 0` once at top of map callback.

---

### 3.6 Icon className `'sm:text-5xl text-4xl'` Repeated 46 Times — Technos.tsx

Every entry in `techCategories` has the same sizing class.

**Fix:** Apply the class once in the `TechIcon` component, remove from every data entry.

---

### 3.7 `bg-real-white` Unconditionally Repeated — Mobile.tsx

All three hamburger `<span>` elements have `bg-real-white` in both branches of the ternary:

```tsx
isMenuOpen ? 'translate-y-[7px] rotate-45 bg-real-white' : 'bg-real-white'
```

**Fix:** Move `bg-real-white` into the base className.

---

### 3.8 Duplicate Link/Button Markup — Portfolio.tsx:115-134

```tsx
<div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
  <GithubIcon className='text-2xl' />
  <a href={project.git} ...>repo</a>
</div>
<div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
  <GlobalIcon className='text-2xl' />
  <a href={project.live} ...>live demo</a>
</div>
```

Identical wrapper structure, only icon/text/href differ.

**Fix:** Map over data or extract a `ProjectLink` component.

---

### 3.9 Three Nearly-Identical GSAP Triggers — Technos.tsx:56-118

Three animation blocks (frontend, backend+database, design+tools) share 80%+ structure. Only targets, `fromTo` vs `to`, and stagger config differ.

**Fix:** Extract a factory function: `createCategoryAnimation(ref, opts)`.

---

## 4. Incorrect Hook Usage

### 4.1 Inline `useMemo` in JSX With Missing Dependencies — Scene.tsx:381-408

```tsx
{useMemo(
  () => (
    <>
      <IcospherePart partNumber={1} position={scaledPositions.part1} />
      {/* ...12 parts */}
    </>
  ),
  [scaledPositions],  // Missing: IcospherePart is also a dependency
)}
```

`IcospherePart` is a `useCallback` that depends on `nodes`, `materials`, `handleIcosphereClick`. When any of those change, this `useMemo` won't re-run.

**Fix:** Add `IcospherePart` to deps, or restructure to avoid inline `useMemo` in JSX.

---

### 4.2 `useScrollTriggers` Suppresses Exhaustive Deps — useScrollTriggers.ts:29

The `setupFn` is called inside the effect but never included in the dependency array. This is intentional API design (callers pass `[]`), but if `setupFn` closes over changing state, it will use stale values.

---

### 4.3 `handleIcosphereClick` Called 3x to Simulate State — Scene.tsx:214-216

```tsx
handleIcosphereClick();
handleIcosphereClick();
handleIcosphereClick();
```

After reset, the handler is called 3 times to re-trigger explosion (since `clickCount === 3` triggers it). If the threshold changes, this breaks silently.

**Fix:** Set state directly to desired values instead of simulating clicks.

---

## 5. Overengineering & Unnecessary Complexity

### 5.1 Scene.tsx State Management — 5 Refs + 2 States

```
clickCount (useState), hasCollapsed (useState)
hasExploded (useRef), isResetting (useRef), handleClickRef (useRef)
icosphereRefs (useRef), initialStates (useRef)
```

`handleClickRef` stores `resetPositions`, which is read by `handleIcosphereClick`, which is called by `resetPositions`. This circular ref-passing is a workaround for what should be a state machine.

**Fix:** Replace with `useReducer` or a single state enum: `'idle' | 'clicking' | 'exploded' | 'resetting'`.

---

### 5.2 12 Manual IcospherePart Enumerations — Scene.tsx:288-304 + 384-408

`scaledPositions` calls `scalePosition()` 12 times, then renders 12 individual `<IcospherePart>` elements. This is 24 lines of repetition that could be a 3-line loop:

```tsx
{Object.entries(originalPositions).map(([key, pos], i) => (
  <IcospherePart key={key} partNumber={i + 1} position={scalePosition(pos, SCALE_PERCENTAGE)} />
))}
```

---

### 5.3 `IcospherePart` as `useCallback` — Scene.tsx:306-340

Defining a component via `useCallback` is unusual. It won't benefit from React's component-level reconciliation. Should be a separate `React.memo` component.

---

### 5.4 `SeoProps` Indirection — Seo.tsx:14-17

```tsx
type SeoProps = { date?: string; templateTitle?: string } & Partial<typeof defaultMeta>;
```

Requires inspecting `defaultMeta` to know what props are accepted. An explicit interface would be clearer.

---

### 5.5 Resume Page Monolith — resume/index.tsx (486 lines)

Single-file page with inline `Project` component, `technos` data array, `ProjectData` interface, and 280 lines of deeply nested JSX. Every sidebar section (about, contact, education, languages, links, hobbies) follows the same pattern but is copy-pasted.

**Fix:** Extract sidebar sections and `Project` into sub-components.

---

## 6. Performance Issues

### 6.1 `techCategories` Object Recreated Every Render — Technos.tsx:123-223

100-line object containing 46 JSX icon elements created inside the component body with no memoization.

**Fix:** Move outside the component (icons are static).

---

### 6.2 `getTechIcon` Map Recreated Every Call — Experience.tsx:32-50

`iconMap` creates 13 JSX elements on every call.

**Fix:** Move outside the function as a module-level constant.

---

### 6.3 `TechIcon` Defined Inside Render — Technos.tsx:225-237

New function identity every render prevents memoization.

**Fix:** Move outside `Technos` component.

---

### 6.4 `Project` Component Defined Inside Render — resume/index.tsx:96-134

Same issue as TechIcon — redefined on every render of the parent.

**Fix:** Move to separate file or outside the component.

---

### 6.5 `new THREE.Color()` on Every Render — MobileScene.tsx:36-37, 51-52

```tsx
specular={new THREE.Color(0xffffff)}
emissive={new THREE.Color(0x000000)}
```

Four instances creating new objects every render.

**Fix:** Module-level constants: `const WHITE = new THREE.Color(0xffffff)`.

---

### 6.6 DOM Queries in Animation Setup — Technos.tsx:56-99

Uses `.querySelectorAll('.tech-icon')` multiple times, bypassing React's ref system.

---

### 6.7 Aggressive DPR Floor — Hero.tsx:76

```tsx
dpr={[0.25, 1]}
```

Minimum DPR of 0.25 = 1/4 resolution. Standard is `[1, 2]`.

---

## 7. Type Safety Problems

### 7.1 Weak `icosphereRefs` Typing — Scene.tsx:83

```tsx
useRef<{ [key: string]: THREE.Group | null }>({});
```

Uses `string` keys but actual keys are always `part1`-`part12`.

---

### 7.2 Unsafe GLTF Casting — Scene.tsx:77, MobileScene.tsx:16

```tsx
useLoader(GLTFLoader, '/models/diax.glb') as GLTFResult;
```

`as` assertion without runtime validation. If model changes, crashes at runtime.

---

### 7.3 Inconsistent GLTF Interfaces — Scene.tsx vs MobileScene.tsx

`GLTFResult` (nodes + materials) vs `GLTFNodes` (just nodes). Same concept, different shapes/names.

---

### 7.4 `ProjectData` Redundant Properties — resume/index.tsx:86-94

```tsx
interface ProjectData {
  repositoryLink: string;  // from JSON
  demoLink: string;        // from JSON
  repo: string;            // hardcoded label at callsite
  demo: string;            // hardcoded label at callsite
}
```

Mixing data source (JSON) with display labels (callsite) in one interface.

---

## 8. CSS / Styling Issues

### 8.1 Vendor-Prefixed Keyframes — globals.css:96-128

`-webkit-` and `-moz-` keyframes for `gradientAnimationX` manually written. `autoprefixer` (configured in `postcss.config.js`) handles this automatically.

**Fix:** Keep only `@keyframes`. Saves ~30 lines.

---

### 8.2 Hardcoded Color Mismatch — globals.css:205

```css
.orange { border-color: #8a2029 transparent transparent transparent; }
```

`#8a2029` doesn't match any CSS variable (`--color-orange: #992210`, `--color-raspberry: #801834`).

---

### 8.3 Another Hardcoded Color — globals.css:344

```css
.danger-animation { color: #ffdd44; }
```

Not in any variable or Tailwind config.

---

### 8.4 Base Typography Dead — globals.css:14-44

`@layer base` defines `h3 { @apply text-lg font-bold }` etc., but every component overrides these with `font-[400]`, `text-xl`, `tracking-[10px]`. The base styles never visibly apply.

---

### 8.5 `font-[NUMBER]` Instead of Tailwind Utilities

`font-[200]`, `font-[300]`, `font-[400]`, `font-[500]`, `font-[600]` used everywhere instead of `font-light`, `font-normal`, `font-medium`, `font-semibold`.

---

### 8.6 Hardcoded `w-[1000px]` Overflows — Footer.tsx:49

```tsx
<div className='mx-5 flex w-[1000px] flex-col ...'>
```

No `max-w-full` — overflows on viewports < 1000px. Same in resume with `w-[1421px]`.

---

### 8.7 Excessive Arbitrary Values in Resume — resume/index.tsx

39+ arbitrary pixel values: `h-[2015px]`, `w-[1421px]`, `ml-[35px]`, `mt-[23px]`, `text-[3rem]`, `gap-x-[25px]`. Bypasses Tailwind's spacing system entirely.

---

### 8.8 Theme Color Mismatch — Seo.tsx:66

```tsx
<meta name='theme-color' content='#ffffff' />
```

Site background is dark (`#001a25`). Browser chrome will flash white.

**Fix:** Use `#001a25`.

---

## 9. Inconsistency & Naming

### 9.1 GSAP Import Inconsistency — Scene.tsx:3

```tsx
import gsap from 'gsap';  // Direct import
```

Every other file uses the centralized `import { gsap } from '@/lib/gsap'` which ensures ScrollTrigger is registered.

**Fix:** Use `@/lib/gsap` consistently.

---

### 9.2 Color Naming in colors.ts

```tsx
whiteColor: 0xcab2b8,   // Actually pinkish-gray (#cab2b8)
whiterColor: 0xe4e4e4,  // Actually white-ish
orangerColor: 0x993838,  // Comparative adjective as identifier
```

`whiteColor` is misleading. The `-er` suffix convention is unclear.

---

### 9.3 Three Color Systems Out of Sync

| System | White | Raspberry | Orange |
|--------|-------|-----------|--------|
| Tailwind config | `#e4e4e4` | `#801834` | `#992210` |
| CSS variables | `#e4e4e4` | `#801834` | `#992210` |
| `colors.ts` (hex) | `0xcab2b8` / `0xe4e4e4` | `0x801834` | `0x972b1a` / `0x993838` |
| Inline CSS | `#8a2029`, `#ffdd44`, `#80183466` | — | — |

Some colors only exist in one system.

---

### 9.4 `isMobile` Naming — Hero.tsx vs Scene.tsx

- `Hero.tsx:55` creates `isClientMobile` to store `isMobile`
- `Scene.tsx:5` uses `isMobile` directly
- `resume/index.tsx:3` uses `isMobile` directly

`isClientMobile` is unnecessarily verbose.

---

### 9.5 `font-mont` for Space Grotesk — tailwind.config.ts

```tsx
mont: ['Space Grotesk'],
```

`mont` is an abbreviation of "Montserrat" — but the font is "Space Grotesk". Misleading name.

---

### 9.6 Import Style Inconsistency — 404.tsx vs others

```tsx
// 404.tsx
import * as React from 'react';
// Everyone else
import React, { useState } from 'react';
```

---

## 10. Three.js / R3F Specific

### 10.1 Mobile Model Named "desktopScene" — MobileScene.tsx:16

```tsx
useLoader(GLTFLoader, '/models/desktopScene.glb')  // Loaded in MobileScene
```

---

### 10.2 `transmission={2}` and `opacity={1.3}` — MobileScene.tsx:65,68

Both exceed valid [0, 1] range. Three.js clamps internally so values >1 have no effect.

---

### 10.3 Material Inconsistency Between Scenes

| Element | Desktop (Scene.tsx) | Mobile (MobileScene.tsx) |
|---------|-------------------|--------------------------|
| Text | `meshStandardMaterial` | `meshPhongMaterial` |
| Crystal | `MeshTransmissionMaterial` | `meshPhysicalMaterial` |

Different materials under same lighting produce different visual results.

---

### 10.4 `castShadow`/`receiveShadow` on Transmission Materials — Scene.tsx

Transmission materials don't cast/receive standard shadows in Three.js. These are no-ops.

---

### 10.5 Background Color Magic Number — Hero.tsx:81

```tsx
<color attach='background' args={[0 / 3072, 26 / 3072, 37 / 3072]} />
```

`3072` is unexplained. Just use a hex color.

---

### 10.6 Spotlights Inside Suspense — Hero.tsx:113-114

While the model loads, there's no lighting at all (only the loader text). Moving lights outside Suspense would provide ambient lighting during load.

---

### 10.7 No Error Boundary Around Canvas

If GLTF fails to load or WebGL context is lost, the page crashes with no fallback.

---

## 11. Configuration & Build

### 11.1 `next-sitemap` Points to Starter URL — next-sitemap.config.js

```js
siteUrl: 'https://tsnext-tw.thcl.dev'  // Should be mskorus.vercel.app
```

---

### 11.2 `package.json` Name Still References Starter

```json
"name": "ts-nextjs-tailwind-starter"
```

---

### 11.3 `.npmrc` Contains Stray Version String

```
v18.14.0        ← bare version string, not valid .npmrc syntax
engine-strict=true
```

Line 1 looks like it was meant for `.nvmrc`.

---

### 11.4 ESLint Max Warnings Inconsistency

```json
"lint:strict": "eslint --max-warnings=10 src"     // scripts
"eslint --max-warnings=20"                          // lint-staged
```

Different thresholds for different contexts.

---

### 11.5 Seo.tsx Hardcoded URL — Seo.tsx:8

```tsx
url: 'https://mskorus.vercel.app/'
```

Should be an environment variable for portability.

---

### 11.6 `body.style.overflow` Direct Manipulation — Header.tsx:21

```tsx
document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
```

Direct DOM manipulation can cause hydration mismatches in Next.js.

---

## 12. Accessibility

### 12.1 Empty `alt` on Portfolio Images — Portfolio.tsx:70

```tsx
alt=''
```

Portfolio project screenshots should have descriptive alt text.

---

### 12.2 Resume Photo Generic Alt — resume/index.tsx:219

```tsx
alt='Me'
```

Should be `alt='Maciej Skorus - Frontend Developer'`.

---

### 12.3 No Keyboard Handler for Mobile Menu — Header.tsx

No Escape key handler to close the mobile menu. No focus trapping inside the overlay.

---

### 12.4 Social Icons Missing `aria-label` — About.tsx:100-114

GitHub and LinkedIn icons are wrapped in `<a>` tags but have no `aria-label`. Screen readers see empty links.

---

### 12.5 `<li>` Inside `<Link>` — Desktop.tsx:22

```tsx
<Link href={href} ...>
  <li>{label}</li>
</Link>
```

`<li>` should be the parent of `<a>`/`<Link>`, not the child. Invalid HTML nesting.

---

### 12.6 No Reduced Motion Support

Animations run unconditionally. Users with `prefers-reduced-motion` get no accommodation.

---

## 13. Summary

| Severity | Category | Count |
|----------|----------|-------|
| **Critical** | Bugs & broken functionality | 7 |
| **High** | Dead code & unused exports | 6 |
| **High** | Duplicate code | 9 |
| **High** | Incorrect hook usage | 3 |
| **Medium** | Overengineering | 5 |
| **Medium** | Performance issues | 7 |
| **Medium** | Type safety | 4 |
| **Medium** | CSS / styling issues | 8 |
| **Medium** | Inconsistency & naming | 6 |
| **Medium** | Three.js / R3F specific | 7 |
| **Low** | Configuration & build | 6 |
| **Low** | Accessibility | 6 |
| | **Total** | **74** |

### Top 12 Priority Fixes

| # | Issue | File | Effort |
|---|-------|------|--------|
| 1 | `target='blank'` → `target='_blank'` | Portfolio.tsx:62 | 1 min |
| 2 | 404 page: wrap "Back to Home" in Link | 404.tsx:21 | 1 min |
| 3 | 404 page: fix undefined CSS classes | 404.tsx:19 | 2 min |
| 4 | Fix Node version mismatch | .nvmrc, .npmrc, package.json | 2 min |
| 5 | Fix `useMemo` → `useEffect` for pixel ratio | Scene.tsx:256 | 1 min |
| 6 | Footer: use `useScrollTriggers` / add cleanup | Footer.tsx | 5 min |
| 7 | Fix GSAP import to use `@/lib/gsap` | Scene.tsx:3 | 1 min |
| 8 | About.tsx: use `useScrollTriggers` hook | About.tsx | 5 min |
| 9 | Move `techCategories` outside component body | Technos.tsx | 5 min |
| 10 | Update sitemap URL | next-sitemap.config.js | 1 min |
| 11 | Fix `<li>` inside `<Link>` nesting | Desktop.tsx:22 | 2 min |
| 12 | Unify tech data between Technos + Resume | Technos.tsx, resume/index.tsx | 20 min |
