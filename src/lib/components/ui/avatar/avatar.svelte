<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		ref?: HTMLElement | null;
		loadingStatus?: 'loading' | 'loaded';
		class?: string;
		children?: Snippet;
	}

	let {
		ref = $bindable<HTMLElement | null>(null),
		loadingStatus = $bindable<'loading' | 'loaded'>('loading'),
		class: className = '',
		children,
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	data-slot="avatar"
	data-loading-status={loadingStatus}
	class={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
	{...restProps}
>
	{@render children?.()}
</div>
