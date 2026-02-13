# Animation System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a cohesive, smooth animation system (page transitions, scroll reveals, card hovers) to the portfolio using Motion One + svelte-inview.

**Architecture:** Three files in `src/lib/animations/` — presets (shared timing config), actions (scroll-reveal and card-hover Svelte actions), and transitions (page-level Svelte transitions). All integrate via Svelte's `use:` directive for SSR safety.

**Tech Stack:** Motion One (`motion`), `svelte-inview`, Svelte 5 built-in transitions (`svelte/transition`)

**Important context:**

- No test framework is configured. Verification uses `yarn check` (type-check) + `yarn lint` + dev server visual testing.
- `CardEnhanced` already has tilt/perspective hover effects via CSS — the `cardHover` action adds spring lift on top of existing behavior, it does NOT replace the tilt system.
- Components use a mix of Svelte 4 (`export let`) and Svelte 5 (`$props()`) syntax. Match each component's existing style when modifying.

---

### Task 1: Install Dependencies

**Files:**

- Modify: `package.json`

**Step 1: Install motion and svelte-inview**

Run:

```bash
yarn add motion svelte-inview
```

**Step 2: Verify installation**

Run: `yarn check`
Expected: No new errors

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: add motion and svelte-inview dependencies"
```

---

### Task 2: Create Animation Presets

**Files:**

- Create: `src/lib/animations/presets.ts`

**Step 1: Create the presets file**

```typescript
/**
 * Shared animation presets for consistent timing across the site.
 * All durations in seconds, all distances in pixels.
 */

const prefersReducedMotion =
	typeof window !== 'undefined'
		? window.matchMedia('(prefers-reduced-motion: reduce)').matches
		: false;

export const DURATION = {
	fast: prefersReducedMotion ? 0 : 0.3,
	normal: prefersReducedMotion ? 0 : 0.4,
	slow: prefersReducedMotion ? 0 : 0.5
} as const;

export const EASING = {
	/** Standard ease-out for fades and reveals */
	easeOut: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
	/** Slightly snappier for interactive elements */
	easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number]
} as const;

export const SPRING = {
	/** Natural spring for card hover lift */
	hover: { stiffness: 300, damping: 20 },
	/** Snappy spring for press feedback */
	press: { stiffness: 400, damping: 25 }
} as const;

export const REVEAL = {
	/** Distance to slide up for scroll reveals (px) */
	slideDistance: 20,
	/** Distance to slide from left for experience cards (px) */
	slideLeftDistance: 30,
	/** Scale start for skill cards */
	scaleFrom: 0.95,
	/** Stagger delay between siblings (seconds) */
	stagger: 0.08,
	/** IntersectionObserver threshold (0-1) */
	threshold: 0.2
} as const;

export const CARD = {
	/** Hover lift distance (px) */
	lift: 5,
	/** Press scale factor */
	pressScale: 0.98,
	/** Shadow on hover */
	shadowHover: '0 8px 25px rgba(0, 0, 0, 0.15)',
	/** Shadow at rest */
	shadowRest: '0 0px 0px rgba(0, 0, 0, 0)'
} as const;

export const PAGE_TRANSITION = {
	/** Duration for page fly transition (ms — Svelte transitions use ms) */
	duration: 300,
	/** Vertical offset for fly transition (px) */
	y: 10
} as const;
```

**Step 2: Verify types**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/animations/presets.ts
git commit -m "feat: add animation preset configuration"
```

---

### Task 3: Create Scroll Reveal Action

**Files:**

- Create: `src/lib/animations/actions.ts`

**Step 1: Create the actions file with scrollReveal**

```typescript
import type { Action } from 'svelte/action';
import { animate } from 'motion';
import { DURATION, EASING, REVEAL } from './presets';

export interface ScrollRevealOptions {
	/** Animation direction: 'up' (default), 'left', 'scale' */
	direction?: 'up' | 'left' | 'scale';
	/** Delay in seconds (use for stagger: index * REVEAL.stagger) */
	delay?: number;
	/** Custom duration override */
	duration?: number;
}

export const scrollReveal: Action<HTMLElement, ScrollRevealOptions | undefined> = (
	node,
	options = {}
) => {
	const { direction = 'up', delay = 0, duration = DURATION.slow } = options;

	// If reduced motion or SSR, do nothing — content stays visible
	if (typeof window === 'undefined') return;
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion || duration === 0) return;

	// Set initial hidden state via JS (not CSS — so content is visible if JS fails)
	node.style.opacity = '0';

	if (direction === 'up') {
		node.style.transform = `translateY(${REVEAL.slideDistance}px)`;
	} else if (direction === 'left') {
		node.style.transform = `translateX(-${REVEAL.slideLeftDistance}px)`;
	} else if (direction === 'scale') {
		node.style.transform = `scale(${REVEAL.scaleFrom})`;
	}

	let hasAnimated = false;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated) {
					hasAnimated = true;
					observer.unobserve(node);

					animate(
						node,
						{
							opacity: [0, 1],
							transform: ['', 'translateY(0) translateX(0) scale(1)']
						},
						{
							duration,
							delay,
							easing: EASING.easeOut
						}
					);
				}
			});
		},
		{ threshold: REVEAL.threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
			observer.disconnect();
		}
	};
};
```

**Step 2: Verify types**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/animations/actions.ts
git commit -m "feat: add scrollReveal Svelte action"
```

---

### Task 4: Create Card Hover Action

**Files:**

- Modify: `src/lib/animations/actions.ts`

**Step 1: Add cardHover action to the existing actions file**

Append to `src/lib/animations/actions.ts`:

```typescript
import { CARD } from './presets';

export interface CardHoverOptions {
	/** Accent color for border glow (hex string) */
	color?: string;
	/** Custom lift distance in px */
	lift?: number;
}

export const cardHover: Action<HTMLElement, CardHoverOptions | undefined> = (
	node,
	options = {}
) => {
	if (typeof window === 'undefined') return;

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return;

	// Only apply on devices with hover capability
	const hasHover = window.matchMedia('(hover: hover)').matches;
	if (!hasHover) return;

	const { color, lift = CARD.lift } = options;

	const onPointerEnter = () => {
		animate(
			node,
			{
				transform: `translateY(-${lift}px)`,
				boxShadow: CARD.shadowHover
			},
			{ duration: 0.3, easing: EASING.easeOut }
		);

		if (color) {
			animate(node, { borderColor: color }, { duration: 0.3, easing: EASING.easeOut });
		}
	};

	const onPointerLeave = () => {
		animate(
			node,
			{
				transform: 'translateY(0px)',
				boxShadow: CARD.shadowRest
			},
			{ duration: 0.3, easing: EASING.easeOut }
		);

		if (color) {
			animate(node, { borderColor: '' }, { duration: 0.3, easing: EASING.easeOut });
		}
	};

	const onPointerDown = () => {
		animate(node, { transform: `scale(${CARD.pressScale})` }, { duration: 0.1 });
	};

	const onPointerUp = () => {
		animate(
			node,
			{ transform: `translateY(-${lift}px)` },
			{ duration: 0.2, easing: EASING.easeOut }
		);
	};

	const onFocus = () => {
		animate(
			node,
			{
				transform: `translateY(-${lift}px)`,
				boxShadow: CARD.shadowHover
			},
			{ duration: 0.3, easing: EASING.easeOut }
		);
	};

	const onBlur = () => {
		animate(
			node,
			{
				transform: 'translateY(0px)',
				boxShadow: CARD.shadowRest
			},
			{ duration: 0.3, easing: EASING.easeOut }
		);
	};

	node.addEventListener('pointerenter', onPointerEnter);
	node.addEventListener('pointerleave', onPointerLeave);
	node.addEventListener('pointerdown', onPointerDown);
	node.addEventListener('pointerup', onPointerUp);
	node.addEventListener('focus', onFocus);
	node.addEventListener('blur', onBlur);

	return {
		destroy() {
			node.removeEventListener('pointerenter', onPointerEnter);
			node.removeEventListener('pointerleave', onPointerLeave);
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('pointerup', onPointerUp);
			node.removeEventListener('focus', onFocus);
			node.removeEventListener('blur', onBlur);
		}
	};
};
```

**Step 2: Verify types**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/animations/actions.ts
git commit -m "feat: add cardHover Svelte action with spring lift and press feedback"
```

---

### Task 5: Create Page Transition

**Files:**

- Create: `src/lib/animations/transitions.ts`

**Step 1: Create the transitions file**

```typescript
import { fly, fade } from 'svelte/transition';
import { PAGE_TRANSITION } from './presets';
import type { TransitionConfig } from 'svelte/transition';

/**
 * Page enter transition: fade in + slide up from below.
 */
export function pageIn(node: Element): TransitionConfig {
	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	if (prefersReducedMotion) {
		return fade(node, { duration: 0 });
	}

	return fly(node, {
		y: PAGE_TRANSITION.y,
		duration: PAGE_TRANSITION.duration,
		delay: PAGE_TRANSITION.duration / 2
	});
}

/**
 * Page exit transition: fade out + slide up slightly.
 */
export function pageOut(node: Element): TransitionConfig {
	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	if (prefersReducedMotion) {
		return fade(node, { duration: 0 });
	}

	return fly(node, {
		y: -PAGE_TRANSITION.y,
		duration: PAGE_TRANSITION.duration / 2
	});
}
```

**Step 2: Verify types**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/animations/transitions.ts
git commit -m "feat: add page transition functions"
```

---

### Task 6: Add Page Transitions to Layout

**Files:**

- Modify: `src/routes/+layout.svelte`

**Step 1: Add page transitions**

Modify `+layout.svelte` to wrap `{@render children()}` in a `{#key}` block with in/out transitions:

1. Add import at top of `<script>`:

```typescript
import { page } from '$app/stores';
import { pageIn, pageOut } from '$lib/animations/transitions';
```

2. Replace `{@render children()}` with:

```svelte
{#key $page.url.pathname}
	<div in:pageIn out:pageOut>
		{@render children()}
	</div>
{/key}
```

**Step 2: Verify it builds**

Run: `yarn check`
Expected: No errors

**Step 3: Verify visually**

Run: `yarn dev`
Expected: Navigate between pages — should see a subtle fade + slide transition (~300ms)

**Step 4: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat: add page transitions to layout"
```

---

### Task 7: Add Scroll Reveals to Home Page

**Files:**

- Modify: `src/routes/+page.svelte`

**Step 1: Add scroll reveals to the home page sections**

1. Add import at top of `<script>`:

```typescript
import { scrollReveal } from '$lib/animations/actions';
import { REVEAL } from '$lib/animations/presets';
```

2. Add `use:scrollReveal` to the hero section:

```svelte
<div use:scrollReveal class="col gap-25px items-center text-center max-w-4xl m-x-auto hero-section">
```

3. Add `use:scrollReveal` to each `EnhancedStatsCard` with stagger:

```svelte
{#each [{ value: `${yearsOfExperience}+`, label: 'Years', subtitle: 'Experience', href: '/experience', color: '#3b82f6' }] as stat, i}
	// ... etc
	<div use:scrollReveal={{ delay: i * REVEAL.stagger }}>
		<EnhancedStatsCard {...stat} />
	</div>
{/each}
```

Or simpler — wrap each `EnhancedStatsCard` individually:

```svelte
<div use:scrollReveal={{ delay: 0 }}>
	<EnhancedStatsCard ... />
</div>
<div use:scrollReveal={{ delay: REVEAL.stagger }}>
	<EnhancedStatsCard ... />
</div>
```

(Use whichever approach keeps the existing structure cleaner. The key is adding stagger delays.)

4. Add `use:scrollReveal` to the FeaturedSkills wrapper:

```svelte
<div use:scrollReveal>
	<FeaturedSkills skills={MY_SKILLS} />
</div>
```

5. Add `use:scrollReveal` to each `ProjectCard` in the featured projects grid with stagger:

```svelte
{#each featuredProjects as project, i (project.slug)}
	<div use:scrollReveal={{ delay: i * REVEAL.stagger }}>
		<ProjectCard {project} />
	</div>
{/each}
```

6. Add `use:scrollReveal={{ direction: 'left' }}` to each `ExperienceCard`:

```svelte
{#each latestExperiences as experience, i (experience.slug)}
	<div use:scrollReveal={{ direction: 'left', delay: i * REVEAL.stagger }}>
		<ExperienceCard {experience} />
	</div>
{/each}
```

**Step 2: Verify types and build**

Run: `yarn check`
Expected: No errors

**Step 3: Verify visually**

Run: `yarn dev`, scroll down the home page
Expected: Sections fade/slide in as they enter the viewport. Stats stagger in. Cards cascade.

**Step 4: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: add scroll reveal animations to home page"
```

---

### Task 8: Add Scroll Reveals to Projects Page

**Files:**

- Modify: `src/routes/projects/+page.svelte`

**Step 1: Add scroll reveals to project cards**

1. Add import:

```typescript
import { scrollReveal } from '$lib/animations/actions';
import { REVEAL } from '$lib/animations/presets';
```

2. Wrap each `ProjectCard` in the grid with stagger:

```svelte
{#each displayed as project, i (project.slug)}
	<div use:scrollReveal={{ delay: i * REVEAL.stagger }}>
		<ProjectCard {project} />
	</div>
{/each}
```

**Step 2: Verify**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/routes/projects/+page.svelte
git commit -m "feat: add scroll reveals to projects page"
```

---

### Task 9: Add Scroll Reveals to Experience Page

**Files:**

- Modify: `src/routes/experience/+page.svelte`

**Step 1: Add scroll reveals to experience cards**

1. Add import:

```typescript
import { scrollReveal } from '$lib/animations/actions';
import { REVEAL } from '$lib/animations/presets';
```

2. Wrap each `ExperienceCard` in the timeline:

```svelte
{#each result as experience, index (experience.slug)}
	<div
		use:scrollReveal={{ direction: 'left', delay: index * REVEAL.stagger }}
		class={`timeline-entry ${index % 2 ? 'flex-row' : 'flex-row-reverse'}`}
	>
		<!-- existing children -->
	</div>
{/each}
```

Note: Since the `timeline-entry` div already exists and wraps each card, add the `use:scrollReveal` directly to it rather than wrapping in a new div.

**Step 2: Verify**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/routes/experience/+page.svelte
git commit -m "feat: add scroll reveals to experience page"
```

---

### Task 10: Add Scroll Reveals to Skills Page

**Files:**

- Modify: `src/routes/skills/+page.svelte`

**Step 1: Add scroll reveals to skill cards**

1. Add import:

```typescript
import { scrollReveal } from '$lib/animations/actions';
import { REVEAL } from '$lib/animations/presets';
```

2. Wrap each `CardEnhanced` in the grid:

```svelte
{#each result as skill, i (skill.slug)}
	<div use:scrollReveal={{ direction: 'scale', delay: i * REVEAL.stagger }}>
		<CardEnhanced ...>
			<p class="text-[var(--tertiary-text)]">{skill.name}</p>
		</CardEnhanced>
	</div>
{/each}
```

**Step 2: Verify**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/routes/skills/+page.svelte
git commit -m "feat: add scroll reveals to skills page"
```

---

### Task 11: Add Scroll Reveals to Education Page

**Files:**

- Modify: `src/routes/education/+page.svelte`

**Step 1: Read the education page first to understand its structure**

Read `src/routes/education/+page.svelte` and apply `use:scrollReveal` to the education entry elements, same pattern as projects.

**Step 2: Verify**

Run: `yarn check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/routes/education/+page.svelte
git commit -m "feat: add scroll reveals to education page"
```

---

### Task 12: Add Card Hover Action to CardEnhanced

**Files:**

- Modify: `src/lib/components/ui/card-enhanced.svelte`

**Step 1: Layer cardHover action onto existing CardEnhanced**

The existing `CardEnhanced` already has CSS tilt/perspective hover effects. The `cardHover` action adds spring-based lift and shadow on top.

1. Add import:

```typescript
import { cardHover } from '$lib/animations/actions';
```

2. Add the action to the root `<svelte:element>`:

```svelte
<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	bind:this={el}
	onmousemove={onHover}
	use:cardHover={{ color: borderColor, lift: 5 }}
	role={href ? undefined : 'group'}
	class={cardClasses}
>
```

**Important:** The existing CSS `:hover` transform (`perspective + rotateX + rotateY + scale(1.01)`) may conflict with the action's `translateY`. Test carefully — may need to remove the CSS `:hover` transform and let the action handle all hover transforms, or keep only the CSS tilt and let the action add lift via margin-top instead.

**Step 2: Test for transform conflicts**

Run: `yarn dev`, hover over project/skill cards
Expected: Cards lift up slightly with shadow. Existing tilt effect should still work.

If transforms conflict:

- Option A: Remove CSS `&:hover { transform: ... }` from `.card-enhanced` and let the action handle the lift.
- Option B: Change the cardHover action to use `margin-top` instead of `translateY` for the lift.

Pick whichever produces the smoothest result.

**Step 3: Verify**

Run: `yarn check`
Expected: No errors

**Step 4: Commit**

```bash
git add src/lib/components/ui/card-enhanced.svelte
git commit -m "feat: add spring hover action to CardEnhanced"
```

---

### Task 13: Add Card Hover to EnhancedStatsCard

**Files:**

- Modify: `src/lib/components/EnhancedStatsCard.svelte`

**Step 1: Add cardHover action**

1. Add import:

```typescript
import { cardHover } from '$lib/animations/actions';
```

2. Add action to root element:

```svelte
<svelte:element
	this={href ? 'a' : 'div'}
	href={href ? `${base}${href}` : undefined}
	bind:this={el}
	onmousemove={onHover}
	use:cardHover={{ lift: 4 }}
	...
>
```

**Step 2: Verify**

Run: `yarn dev`, hover stats cards
Expected: Cards lift with shadow

**Step 3: Commit**

```bash
git add src/lib/components/EnhancedStatsCard.svelte
git commit -m "feat: add spring hover to stats cards"
```

---

### Task 14: Add Card Hover to FeaturedSkills

**Files:**

- Modify: `src/lib/components/FeaturedSkills.svelte`

**Step 1: Add cardHover action to skill cards**

1. Add import:

```typescript
import { cardHover } from '$lib/animations/actions';
```

2. Add action to each `.featured-skill-card` anchor:

```svelte
<a
	href={`${base}/skills/${skill.slug}`}
	bind:this={skillElements[index]}
	onmousemove={(ev) => onHover(ev, index)}
	use:cardHover={{ color: skill.color, lift: 4 }}
	class="featured-skill-card ..."
>
```

**Step 2: Verify**

Run: `yarn dev`, hover featured skills on home page
Expected: Skill cards lift with color glow on hover

**Step 3: Commit**

```bash
git add src/lib/components/FeaturedSkills.svelte
git commit -m "feat: add spring hover to featured skill cards"
```

---

### Task 15: Create Index Export and Final Verification

**Files:**

- Create: `src/lib/animations/index.ts`

**Step 1: Create barrel export**

```typescript
export { scrollReveal, cardHover } from './actions';
export type { ScrollRevealOptions, CardHoverOptions } from './actions';
export { pageIn, pageOut } from './transitions';
export { DURATION, EASING, SPRING, REVEAL, CARD, PAGE_TRANSITION } from './presets';
```

**Step 2: Update imports in all files to use barrel export**

Replace `from '$lib/animations/actions'` and `from '$lib/animations/presets'` with `from '$lib/animations'` in all modified files. This is optional but cleaner.

**Step 3: Full verification**

Run:

```bash
yarn check && yarn lint
```

Expected: No errors

**Step 4: Build verification**

Run:

```bash
yarn build
```

Expected: Build succeeds with no errors. All pages statically prerendered.

**Step 5: Visual smoke test**

Run: `yarn preview`
Expected:

- Navigate between pages: smooth crossfade transitions
- Scroll down home page: sections cascade in
- Hover project cards: spring lift with shadow
- Hover skill cards: lift with color glow
- Test on mobile viewport (dev tools): hover effects disabled, scroll reveals still work

**Step 6: Commit**

```bash
git add src/lib/animations/index.ts
git commit -m "feat: add animation barrel export and finalize animation system"
```
