<script lang="ts">
	import 'uno.css';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import '$lib/index.scss';
	import { onHydrated, theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let searchModalOpen = $state(false);

	function handleSearchOpen() {
		searchModalOpen = true;
	}

	onMount(() => {
		onHydrated();

		// Global keyboard shortcut for search (Cmd+K / Ctrl+K)
		const handleGlobalKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				searchModalOpen = true;
			}
		};

		document.addEventListener('keydown', handleGlobalKeydown);

		// Performance monitoring with Web Vitals
		const logVital = (metric: Metric) => {
			// Log to console in development
			if (import.meta.env.DEV) {
				console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
			}
			// In production, you could send to analytics service:
			// sendToAnalytics(metric);
		};

		// Track Core Web Vitals
		onCLS(logVital); // Cumulative Layout Shift
		onINP(logVital); // Interaction to Next Paint (replaces FID in v3+)
		onLCP(logVital); // Largest Contentful Paint
		onFCP(logVital); // First Contentful Paint
		onTTFB(logVital); // Time to First Byte

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});
</script>

<div class={`body contents ${$theme ? 'theme-dark' : 'theme-light'}`}>
	<NavMenu onsearchclick={handleSearchOpen} />
	<div class="content container">
		{@render children()}
	</div>
	<SearchModal bind:open={searchModalOpen} />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0px 0px;
	}

	.body {
		margin: 0px;
		background-color: var(--main);
		color: var(--main-text);
		font-family: var(--text-f);
		display: flex;
		flex-direction: column;
		transition-duration: 200ms;

		letter-spacing: 1px;

		min-height: 100vh;
	}

	:global(p) {
		margin: 0px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 5px 0px;
	}
</style>
