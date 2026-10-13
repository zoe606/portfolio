<script lang="ts">
	import 'uno.css';
	import '#lib/index.scss';
	import SiteHeader from '#lib/components/Site/SiteHeader.svelte';
	import SiteFooter from '#lib/components/Site/SiteFooter.svelte';
	import SearchModal from '#lib/components/SearchModal.svelte';
	import { theme } from '#lib/stores/theme.svelte.js';
	import { onMount } from 'svelte';
	import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { pageIn, pageOut } from '#lib/animations/transitions.js';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let searchModalOpen = $state(false);

	onMount(() => {
		theme.init();

		// Global keyboard shortcut for search (Cmd+K / Ctrl+K)
		const handleGlobalKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				searchModalOpen = true;
			}
		};

		document.addEventListener('keydown', handleGlobalKeydown);

		const logVital = (metric: Metric) => {
			if (import.meta.env.DEV) {
				console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
			}
		};

		onCLS(logVital);
		onINP(logVital);
		onLCP(logVital);
		onFCP(logVital);
		onTTFB(logVital);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});
</script>

<div class="site">
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
