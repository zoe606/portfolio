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
