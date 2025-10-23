<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLImageElement> {
		ref?: HTMLImageElement | null;
		class?: string;
	}

	let {
		ref = $bindable<HTMLImageElement | null>(null),
		class: className = '',
		...restProps
	}: Props = $props();
</script>

<img
	bind:this={ref}
	data-slot="avatar-image"
	class={cn('aspect-square size-full', className)}
	{...restProps}
/>
