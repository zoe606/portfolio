/**
 * Event Delegation Utilities for Svelte 5
 * Reduce memory usage and improve performance for lists
 */

type DelegatedEventHandler<T = Element> = (target: T, event: Event) => void;

/**
 * Create a delegated event handler
 * @param selector - CSS selector to match target elements
 * @param handler - Handler function called with matched element
 */
export function delegateEvent<T extends HTMLElement = HTMLElement>(
	selector: string,
	handler: DelegatedEventHandler<T>
) {
	return (event: Event) => {
		const target = event.target as HTMLElement;
		const matchedElement = target.closest(selector) as T | null;

		if (matchedElement) {
			handler(matchedElement, event);
		}
	};
}

/**
 * Extract data attributes from delegated target
 */
export function getDataAttributes(element: HTMLElement): Record<string, string> {
	const data: Record<string, string> = {};

	for (const key in element.dataset) {
		data[key] = element.dataset[key] || '';
	}

	return data;
}

/**
 * Example: Optimized list click handler
 */
export function createListClickHandler<T extends { id: string | number }>(
	items: T[],
	onItemClick: (item: T) => void
) {
	return delegateEvent('[data-item-id]', (target) => {
		const itemId = target.dataset.itemId;
		const item = items.find((i) => String(i.id) === itemId);

		if (item) {
			onItemClick(item);
		}
	});
}

// Example usage in a component:
// <script>
//   import { delegateEvent } from '$lib/utils/eventDelegation.svelte';
//
//   const handleClick = delegateEvent('.project-card', (target) => {
//     const projectId = target.dataset.projectId;
//     // Handle click
//   });
// </script>
//
// <div onclick={handleClick}>
//   {#each projects as project}
//     <div class="project-card" data-project-id={project.id}>
//       {project.name}
//     </div>
//   {/each}
// </div>
