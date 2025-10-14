<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let checked = false;
	export let disabled = false;
	let className: string = '';
	export { className as class };

	function toggle() {
		if (!disabled) {
			checked = !checked;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			toggle();
		}
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={checked}
	{disabled}
	class={cn(
		'switch-root peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
		checked ? 'bg-[var(--accent)]' : 'bg-[var(--border)]',
		className
	)}
	on:click={toggle}
	on:keydown={handleKeydown}
	tabindex={disabled ? -1 : 0}
>
	<span
		class={cn(
			'switch-thumb pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200',
			checked ? 'translate-x-5' : 'translate-x-0'
		)}
	/>
</button>

<style lang="scss">
	.switch-root {
		position: relative;
		background-color: var(--border);

		&:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 2px;
		}
	}

	.switch-thumb {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
</style>
