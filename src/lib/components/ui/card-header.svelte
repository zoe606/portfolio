<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();

	let headerClasses = $derived(cn('flex flex-col space-y-6px p-25px', className));
</script>

<div class={headerClasses}>
	{@render children?.()}
</div>
