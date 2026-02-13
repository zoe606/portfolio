/**
 * Shared animation presets for consistent timing across the site.
 * All durations in seconds, all distances in pixels.
 */

export const DURATION = {
	fast: 0.3,
	normal: 0.4,
	slow: 0.5
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
	/** Duration for page fly transition (ms -- Svelte transitions use ms) */
	duration: 300,
	/** Vertical offset for fly transition (px) */
	y: 10
} as const;
