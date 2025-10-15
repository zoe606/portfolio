/**
 * Scroll Preservation Hook using $effect.pre()
 * Use this in components that need scroll position preservation
 */

export function useScrollPreservation(
	getElement: () => HTMLElement | undefined,
	key: string = 'default'
) {
	let savedPosition = 0;

	// Save scroll position before updates
	$effect.pre(() => {
		const element = getElement();
		if (!element) return;

		savedPosition = element.scrollTop;

		// Restore after update
		return () => {
			if (element && savedPosition) {
				element.scrollTop = savedPosition;
			}
		};
	});

	// Also handle navigation-based restoration
	$effect(() => {
		const element = getElement();
		if (!element) return;

		// Restore from storage on mount
		const stored = sessionStorage.getItem(`scroll-${key}`);
		if (stored) {
			element.scrollTop = parseInt(stored, 10);
		}

		// Save on scroll
		const handleScroll = () => {
			sessionStorage.setItem(`scroll-${key}`, String(element.scrollTop));
		};

		element.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			element.removeEventListener('scroll', handleScroll);
		};
	});

	return {
		clear: () => sessionStorage.removeItem(`scroll-${key}`)
	};
}

// Example usage in a component:
// <script>
//   let scrollContainer: HTMLDivElement;
//
//   const scroll = useScrollPreservation(
//     () => scrollContainer,
//     'projects-list'
//   );
// </script>
//
// <div bind:this={scrollContainer}>
//   <!-- scrollable content -->
// </div>
