<script lang="ts">
	import 'uno.css';
	import '#lib/index.scss';
	import SiteHeader from '#lib/components/Site/SiteHeader.svelte';
	import SiteFooter from '#lib/components/Site/SiteFooter.svelte';
	import SearchModal from '#lib/components/SearchModal.svelte';
	import GridCurrent from '#lib/components/Site/GridCurrent.svelte';
	import { theme } from '#lib/stores/theme.svelte.js';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { pageIn, pageOut } from '#lib/animations/transitions.js';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let searchModalOpen = $state(false);

	// Power switch effect: the page flickers briefly when the reader changes the theme.
	// onMount sets previousTheme after theme.init(), so loading a saved dark theme does not flicker.
	let previousTheme: string | undefined;
	$effect(() => {
		const current = theme.current;
		const html = document.documentElement;
		if (previousTheme && previousTheme !== current) {
			html.removeAttribute('data-fx-switching');
			// Reading offsetWidth forces a reflow, so the animation restarts on a quick second click.
			void html.offsetWidth;
			html.setAttribute('data-fx-switching', '');
			setTimeout(() => html.removeAttribute('data-fx-switching'), 600);
		}
		previousTheme = current;
	});

	onMount(() => {
		theme.init();
		previousTheme = theme.current;

		// Global keyboard shortcut for search (Cmd+K / Ctrl+K)
		const handleGlobalKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				searchModalOpen = true;
			}
		};

		document.addEventListener('keydown', handleGlobalKeydown);

		// Web Vitals are only logged in development. The dynamic import keeps
		// web-vitals out of the production bundle.
		if (import.meta.env.DEV) {
			import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
				for (const report of [onCLS, onINP, onLCP, onFCP, onTTFB]) {
					report((metric) => console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric));
				}
			});
		}

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});
</script>

<div class="site">
	<GridCurrent />
	<div class="fx-progress" aria-hidden="true"></div>
	<SiteHeader onsearchclick={() => (searchModalOpen = true)} />
	<main class="bp-container page-stack">
		<!-- The leaving and entering pages share one grid cell, so the new page does not jump below the old one. -->
		{#key page.url.pathname}
			<div class="page" in:pageIn out:pageOut>
				{@render children()}
			</div>
		{/key}
	</main>
	<SiteFooter />
	<SearchModal bind:open={searchModalOpen} />
</div>

<style>
	.site {
		position: relative;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--bp-bg);
		background-image:
			linear-gradient(var(--bp-grid) 1px, transparent 1px),
			linear-gradient(90deg, var(--bp-grid) 1px, transparent 1px);
		background-size: 32px 32px;
		color: var(--bp-ink);
		font-family: var(--text-f);
	}

	.fx-progress {
		display: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.site {
			animation: fx-power 550ms linear;
		}

		@supports (animation-timeline: scroll()) {
			/* Scroll current: a line at the top grows with the scroll position. */
			.fx-progress {
				display: block;
				position: fixed;
				top: 0;
				left: 0;
				z-index: 60;
				width: 100%;
				height: 2px;
				background: var(--bp-accent);
				box-shadow: 0 0 10px var(--bp-accent);
				transform-origin: left;
				animation: fx-progress linear both;
				animation-timeline: scroll(root);
			}
		}
	}

	@keyframes fx-power {
		0%,
		100% {
			filter: none;
		}
		12% {
			filter: brightness(0.35);
		}
		24% {
			filter: brightness(1.25);
		}
		38% {
			filter: brightness(0.55);
		}
		52% {
			filter: brightness(1.1);
		}
	}

	@keyframes fx-progress {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	.page-stack {
		display: grid;
		flex: 1;
	}

	.page {
		grid-area: 1 / 1;
		min-width: 0;
	}

	:global(p) {
		margin: 0px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 5px 0px;
	}
</style>
