# Animation System Design

## Summary

Add a cohesive, smooth animation system to the portfolio covering page transitions, scroll-triggered reveals, and card hover interactions. The feel is subtle and professional — nothing flashy.

## Approach

**Motion One** (~2.5KB) for spring-based animations and timeline sequences, **svelte-inview** (~1KB) for scroll viewport detection, and **Svelte built-in transitions** for page navigation.

## Architecture

```
src/lib/
├── animations/
│   ├── transitions.ts     — Reusable Svelte transition functions (page-level)
│   ├── actions.ts         — Svelte actions for scroll-reveal & hover effects
│   └── presets.ts         — Shared timing/easing/spring configs
```

All animations integrate via Svelte actions (`use:` directive) — SSR-safe, composable, no component wrappers needed. A centralized presets file keeps timing consistent across the site.

### Preset Configuration

```typescript
export const PRESETS = {
	fade: { duration: 0.4, easing: 'ease-out' },
	slideUp: { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
	spring: { stiffness: 300, damping: 20 },
	stagger: 0.08 // delay between sibling elements
};
```

## Page Transitions

Crossfade with subtle vertical shift when navigating between pages.

- Outgoing page fades out + slides up slightly
- Incoming page fades in + slides up from below
- Duration: ~300ms
- Implementation: `{#key}` block in `+layout.svelte` keyed on `$page.url.pathname`, using Svelte `fly` + `fade` transitions
- Falls back to instant swap when `prefers-reduced-motion` is active

## Scroll Reveals

Elements animate in when entering the viewport.

- Trigger: `svelte-inview` with ~20% visibility threshold
- Default: fade in + slide up 20px over 400-500ms, ease-out
- Stagger: 80ms between siblings in card grids
- One-shot: elements only animate in once

### Per-Element Reveals

| Element            | Animation                              |
| ------------------ | -------------------------------------- |
| Section headings   | Fade in + slide up                     |
| Project cards      | Fade in + slide up, staggered          |
| Experience cards   | Fade in + slide from left              |
| Skill badges/cards | Fade in + scale up slightly, staggered |
| Education entries  | Fade in + slide up                     |
| Stats cards (home) | Fade in + slide up, staggered          |

Implementation: `use:scrollReveal` Svelte action combining svelte-inview detection with Motion One `animate()`. Initial hidden state applied via the action on mount (not CSS), preventing flash-of-hidden-content during SSR.

## Card Interactions

Spring-based hover and press effects.

- **Hover lift:** 4-6px lift + shadow expansion using spring physics (stiffness: 300, damping: 20)
- **Color glow:** Subtle border glow using each card's accent color
- **Press feedback:** Scale to 0.98 on mousedown, spring back on release
- **Focus states:** Keyboard focus triggers the same lift effect

### Per-Card Effects

| Card type          | Hover effect                          |
| ------------------ | ------------------------------------- |
| Project cards      | Lift + color glow + press feedback    |
| Experience cards   | Lift + subtle shadow + press feedback |
| Skill cards/badges | Lift + color glow                     |
| Stats cards        | Lift + shadow                         |

Implementation: `use:cardHover` Svelte action with options `{ color?: string, lift?: number }`. Hover effects disabled on touch devices via `@media (hover: hover)`. Press feedback works on tap.

## Performance

- Only `transform` and `opacity` animations — GPU-composited, no layout reflows
- Motion One uses Web Animations API — runs off main thread where supported
- `IntersectionObserver` for scroll detection — no scroll event listeners
- Lazy: nothing runs until elements enter the viewport

## Accessibility

- `prefers-reduced-motion: reduce` disables all animations at the preset level — elements appear instantly
- Keyboard focus gets the same visual feedback as hover
- No essential information conveyed through animation alone

## SSR Safety

- Svelte actions only execute in the browser
- Initial hidden states for scroll reveals applied on mount via actions, not CSS — content visible if JS fails
- Page transitions use Svelte's built-in system, SSR-compatible

## Dependencies

| Package         | Size (gzip) | Purpose                               |
| --------------- | ----------- | ------------------------------------- |
| `motion`        | ~2.5KB      | Spring animations, timeline sequences |
| `svelte-inview` | ~1KB        | Viewport intersection detection       |

Total bundle increase: ~3.5KB gzipped.
