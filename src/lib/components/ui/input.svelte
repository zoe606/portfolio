<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		class?: string;
		value?: string;
		oninput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
		onchange?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
		onfocus?: (event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) => void;
		onblur?: (event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) => void;
	}

	let {
		class: className = '',
		value = $bindable(''),
		oninput,
		onchange,
		onfocus,
		onblur,
		...restProps
	}: Props = $props();

	let inputClasses = $derived(
		cn(
			'flex h-40px w-full rounded-10px border-1px border-solid border-[var(--border)] bg-[var(--main)] px-15px py-10px text-[var(--tertiary-text)] placeholder:text-[var(--tertiary-text)] placeholder:op-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:op-50',
			className
		)
	);
</script>

<input
	bind:value
	class={inputClasses}
	{oninput}
	{onchange}
	{onfocus}
	{onblur}
	{...restProps}
/>
