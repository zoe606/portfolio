import type { Action } from 'svelte/action';
import { animateMini as animate } from 'motion';
import { DURATION, EASING, REVEAL, CARD } from './presets';

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

	// If reduced motion or SSR, do nothing -- content stays visible
	if (typeof window === 'undefined') return { destroy() {} };
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion || duration === 0) return { destroy() {} };

	// Set initial hidden state via JS (not CSS -- so content is visible if JS fails)
	let transformStart = '';
	let transformEnd = '';

	if (direction === 'up') {
		transformStart = `translateY(${REVEAL.slideDistance}px)`;
		transformEnd = 'translateY(0)';
	} else if (direction === 'left') {
		transformStart = `translateX(-${REVEAL.slideLeftDistance}px)`;
		transformEnd = 'translateX(0)';
	} else if (direction === 'scale') {
		transformStart = `scale(${REVEAL.scaleFrom})`;
		transformEnd = 'scale(1)';
	}

	node.style.opacity = '0';
	node.style.transform = transformStart;

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
							transform: [transformStart, transformEnd]
						},
						{
							duration,
							delay,
							ease: EASING.easeOut
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
	if (typeof window === 'undefined') return { destroy() {} };

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return { destroy() {} };

	// Only apply on devices with hover capability
	const hasHover = window.matchMedia('(hover: hover)').matches;
	if (!hasHover) return { destroy() {} };

	const { color, lift = CARD.lift } = options;
	const originalBorderColor = getComputedStyle(node).borderColor;

	const onPointerEnter = () => {
		animate(
			node,
			{
				transform: `translateY(-${lift}px)`,
				boxShadow: CARD.shadowHover
			},
			{ duration: 0.3, ease: EASING.easeOut }
		);

		if (color) {
			animate(node, { borderColor: color }, { duration: 0.3, ease: EASING.easeOut });
		}
	};

	const onPointerLeave = () => {
		animate(
			node,
			{
				transform: 'translateY(0px)',
				boxShadow: CARD.shadowRest
			},
			{ duration: 0.3, ease: EASING.easeOut }
		);

		if (color) {
			animate(node, { borderColor: originalBorderColor }, { duration: 0.3, ease: EASING.easeOut });
		}
	};

	const onPointerDown = () => {
		animate(
			node,
			{ transform: `translateY(-${lift}px) scale(${CARD.pressScale})` },
			{ duration: 0.1 }
		);
	};

	const onPointerUp = () => {
		animate(
			node,
			{ transform: `translateY(-${lift}px) scale(1)` },
			{ duration: 0.2, ease: EASING.easeOut }
		);
	};

	const onFocus = () => {
		animate(
			node,
			{
				transform: `translateY(-${lift}px)`,
				boxShadow: CARD.shadowHover
			},
			{ duration: 0.3, ease: EASING.easeOut }
		);
	};

	const onBlur = () => {
		animate(
			node,
			{
				transform: 'translateY(0px)',
				boxShadow: CARD.shadowRest
			},
			{ duration: 0.3, ease: EASING.easeOut }
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
