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
</script>

<!-- Single click handler on parent instead of N handlers on children -->
<ul class="optimized-list {className}" onclick={handleClick}>
	{#each items as item (item.id)}
		<li data-item-id={item.id} class="list-item">
			{@html renderItem(item)}
		</li>
	{/each}
</ul>

<style>
	.optimized-list {
		list-style: none;
		padding: 0;
		margin: 0;
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
