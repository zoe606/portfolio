<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = HTMLInputAttributes;

	let className: string = '';
	export { className as class };
	export let value: string = '';

	$: inputClasses = cn(
		'flex h-40px w-full rounded-10px border-1px border-solid border-[var(--border)] bg-[var(--main)] px-15px py-10px text-[var(--tertiary-text)] placeholder:text-[var(--tertiary-text)] placeholder:op-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:op-50',
		className
	);
</script>

<input bind:value class={inputClasses} {...$$restProps} on:input on:change on:focus on:blur />
