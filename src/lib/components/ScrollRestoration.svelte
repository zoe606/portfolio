<script lang="ts">
	/**
	 * Scroll Restoration Component using $effect.pre()
	 * Preserves scroll position when content updates
	 */

	interface Props {
		key?: string; // Unique key to identify scroll position
		enabled?: boolean;
	}

	let { key = 'default', enabled = true }: Props = $props();

	let container: HTMLDivElement;
	let savedScrollTop = 0;

	// Use $effect.pre() to run BEFORE DOM updates
	$effect.pre(() => {
		if (!enabled || !container) return;

		// Save scroll position before re-render
		savedScrollTop = container.scrollTop;

		// Return cleanup/restore function
		return () => {
			// This runs AFTER the DOM update but before paint
			// Restore scroll position
			if (container && savedScrollTop) {
				container.scrollTop = savedScrollTop;
			}
		};
	});

	// Also save to sessionStorage for navigation
	$effect(() => {
		if (!enabled || !container) return;

		const handleScroll = () => {
			sessionStorage.setItem(`scroll-${key}`, String(container.scrollTop));
		};

		container.addEventListener('scroll', handleScroll, { passive: true });

		// Restore from sessionStorage on mount
		const saved = sessionStorage.getItem(`scroll-${key}`);
		if (saved) {
			container.scrollTop = parseInt(saved, 10);
		}

		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div bind:this={container} class="scroll-container">
	<slot />
</div>

<style>
	.scroll-container {
		overflow-y: auto;
		height: 100%;
	}
</style>
