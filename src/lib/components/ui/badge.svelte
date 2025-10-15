<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'default' | 'secondary' | 'destructive' | 'outline';

	interface Props {
		variant?: Variant;
		class?: string;
		href?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}

	let {
		variant = 'default',
		class: className = '',
		href = undefined,
		onclick,
		children
	}: Props = $props();

	const variants: Record<Variant, string> = {
		default: 'border bg-[var(--light)] text-[var(--dark-1)] hover:bg-[var(--light-2)]',
		secondary:
			'border bg-[var(--tertiary)] text-[var(--secondary-text)] hover:bg-[var(--tertiary-hover)]',
		destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
		outline: 'text-[var(--tertiary-text)] border-[var(--border)] hover:bg-[var(--main-hover)]'
	};

	let baseClasses = $derived(
		'inline-flex items-center row-center rounded-20px border-1px border-solid px-15px py-5px text-0.9em font-light tracking-wider duration-150ms cursor-pointer decoration-none'
	);
	let variantClasses = $derived(variants[variant]);
	let combinedClasses = $derived(cn(baseClasses, variantClasses, className));
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={combinedClasses}
	{onclick}
	role={href ? undefined : 'button'}
	tabindex={href ? undefined : 0}
>
	{@render children?.()}
</svelte:element>
