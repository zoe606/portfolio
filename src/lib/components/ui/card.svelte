<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();

	let cardClasses = $derived(
		cn(
			'rounded-15px border-1px border-solid border-[var(--border)] bg-[var(--main)] text-[var(--tertiary-text)]',
			className
		)
	);
</script>

<div class={cardClasses}>
	{@render children?.()}
</div>
