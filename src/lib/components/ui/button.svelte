<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
	type Size = 'default' | 'sm' | 'lg' | 'icon';

	interface Props {
		variant?: Variant;
		size?: Size;
		href?: string;
		disabled?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}

	let {
		variant = 'default',
		size = 'default',
		href = undefined,
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const variants: Record<Variant, string> = {
		default:
			'bg-[var(--accent)] text-[var(--main-text)] hover:bg-[var(--accent-hover)] border-transparent',
		secondary:
			'bg-[var(--secondary)] text-[var(--main-text)] hover:bg-[var(--secondary-hover)] border-transparent',
		destructive: 'bg-red-500 text-white hover:bg-red-600 border-transparent',
		outline:
			'border-[var(--border)] bg-transparent hover:bg-[var(--main-hover)] hover:border-[var(--border-hover)]',
		ghost: 'bg-transparent hover:bg-[var(--main-hover)] border-transparent',
		link: 'text-[var(--link)] underline-offset-4 hover:underline bg-transparent border-transparent'
	};

	const sizes: Record<Size, string> = {
		default: 'h-10 px-4 py-2 text-base',
		sm: 'h-9 px-3 text-sm',
		lg: 'h-11 px-8 text-lg',
		icon: 'h-10 w-10 p-0'
	};

	let baseClasses = $derived(
		'inline-flex items-center justify-center row-center rounded-8px border-1px border-solid font-medium transition-all duration-150ms cursor-pointer decoration-none disabled:pointer-events-none disabled:opacity-50'
	);
	let variantClasses = $derived(variants[variant]);
	let sizeClasses = $derived(sizes[size]);
	let combinedClasses = $derived(cn(baseClasses, variantClasses, sizeClasses, className));
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{disabled}
	class={combinedClasses}
	{onclick}
	tabindex={disabled ? -1 : 0}
	role={href ? undefined : 'button'}
	aria-disabled={disabled}
>
	{@render children?.()}
</svelte:element>
