<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export interface Tab {
		value: string;
		label: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { setContext } from 'svelte';

	export let tabs: Tab[] = [];
	export let value: string = tabs[0]?.value || '';
	let className: string = '';
	export { className as class };

	const activeTab = writable(value);
	setContext('tabs', { activeTab });

	$: activeTab.set(value);

	function selectTab(tabValue: string, disabled?: boolean) {
		if (!disabled) {
			value = tabValue;
			activeTab.set(tabValue);
		}
	}
</script>

<div class={cn('tabs-root w-full', className)}>
	<div
		class="tabs-list inline-flex h-10 items-center justify-center rounded-md bg-[var(--secondary)] p-1 text-[var(--tertiary-text)]"
		role="tablist"
	>
		{#each tabs as tab}
			<button
				type="button"
				role="tab"
				aria-selected={value === tab.value}
				aria-controls={`panel-${tab.value}`}
				disabled={tab.disabled}
				class={cn(
					'tab-trigger inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
					value === tab.value
						? 'bg-[var(--main)] text-[var(--main-text)] shadow-sm'
						: 'text-[var(--tertiary-text)] hover:bg-[var(--main-hover)] hover:text-[var(--main-text)]'
				)}
				on:click={() => selectTab(tab.value, tab.disabled)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div class="tabs-content mt-4">
		<slot {value} />
	</div>
</div>

<style lang="scss">
	.tab-trigger {
		&:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 2px;
		}
	}
</style>
