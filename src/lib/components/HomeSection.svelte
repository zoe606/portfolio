<script lang="ts">
	import { base } from '$app/paths';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		href?: string;
		children?: Snippet;
		class?: string;
	}

	let { title, href, children, class: className = '' }: Props = $props();
</script>

<section class="w-full {className}">
	<div class="row justify-between items-center m-b-20px">
		<h2 class="text-2xl font-bold text-[var(--main-text)]">
			{title}
		</h2>
		{#if href}
			<a
				href={`${base}${href}`}
				class="text-sm text-[var(--main-text)] hover:text-[var(--secondary-text)] decoration-none font-medium transition-colors"
			>
				View All →
			</a>
		{/if}
	</div>
	<div class="section-content">
		{@render children?.()}
	</div>
</section>
