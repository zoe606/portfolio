<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		title: string;
		description?: string;
		class?: string;
		children?: Snippet;
	}

	let { label, title, description, class: className = 'pt-20', children }: Props = $props();
</script>

<header class={['flex flex-col gap-4 pb-12', className]}>
	<p class="bp-label text-bp-accent">{label}</p>
	<h1 class="m-0 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05]">
		{title}
	</h1>
	{#if description}
		<p class="max-w-160 text-lg leading-relaxed text-bp-muted">{description}</p>
	{/if}
	{@render children?.()}
</header>
