<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher();

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (open && !event.defaultPrevented) {
			close();
		}
	}
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="dropdown-menu-root relative inline-block text-left">
	<slot name="trigger" {toggle} {open} />

	{#if open}
		<div
			class={cn(
				'dropdown-menu-content absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-[var(--main)] border-1px border-solid border-[var(--border)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50',
				className
			)}
			role="menu"
			aria-orientation="vertical"
			tabindex="-1"
		>
			<div class="py-1">
				<slot {close} />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown-menu-content {
		animation: slideDown 150ms ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
