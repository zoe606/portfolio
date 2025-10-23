<script lang="ts" generics="T extends { id: string | number }">
	/**
	 * Optimized List with Event Delegation
	 * Uses a single event listener for better performance with large lists
	 */

	interface Props<T> {
		items: T[];
		onItemClick?: (item: T) => void;
		renderItem: (item: T) => string; // Simple render function
		class?: string;
	}

	let { items, onItemClick, renderItem, class: className = '' }: Props<T> = $props();

	// Single delegated click handler
	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const listItem = target.closest('[data-item-id]') as HTMLElement;

		if (!listItem) return;

		const itemId = listItem.dataset.itemId;
		const item = items.find((i) => String(i.id) === itemId);

		if (item && onItemClick) {
			onItemClick(item);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		const target = (event.target as HTMLElement).closest('[data-item-id]') as HTMLElement | null;

		if (!target) return;

		event.preventDefault();
		const itemId = target.dataset.itemId;
		const item = items.find((i) => String(i.id) === itemId);

		if (item && onItemClick) {
			onItemClick(item);
		}
	}
</script>

<!-- Single event handler on parent instead of individual listeners -->
<div
	class={`optimized-list ${className}`}
	role="listbox"
	tabindex="0"
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	{#each items as item (item.id)}
		<div data-item-id={item.id} class="list-item" role="option" aria-selected="false" tabindex="-1">
			{@html renderItem(item)}
		</div>
	{/each}
</div>

<style>
	.optimized-list {
		outline: none;
	}

	.list-item {
		cursor: pointer;
		padding: 0.5rem;
		transition: background-color 150ms;
	}

	.list-item:hover {
		background-color: var(--main-hover);
	}
</style>
