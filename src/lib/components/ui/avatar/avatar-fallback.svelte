<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		ref?: HTMLDivElement | null;
		class?: string;
		children?: Snippet;
	}

	let {
		ref = $bindable<HTMLDivElement | null>(null),
		class: className = '',
		children,
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	data-slot="avatar-fallback"
	class={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
	{...restProps}
>
	{@render children?.()}
</div>
