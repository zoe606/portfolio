<script lang="ts">
	interface PagerLink {
		href: string;
		name: string;
	}

	interface Props {
		label: string;
		previous?: PagerLink;
		next?: PagerLink;
	}

	let { label, previous, next }: Props = $props();
</script>

<nav aria-label={label} class="grid gap-4 pt-16 sm:grid-cols-2">
	{#if previous}
		<a href={previous.href} class="bp-panel pager">
			<span class="bp-label text-bp-muted">← Previous</span>
			<span class="font-display text-lg font-semibold">{previous.name}</span>
		</a>
	{:else}
		<span></span>
	{/if}
	{#if next}
		<a href={next.href} class="bp-panel pager items-end text-right">
			<span class="bp-label text-bp-muted">Next →</span>
			<span class="font-display text-lg font-semibold">{next.name}</span>
		</a>
	{/if}
</nav>

<style>
	.pager {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 20px 24px;
		color: var(--bp-ink);
		text-decoration: none;
	}

	.pager:hover {
		border-color: var(--bp-accent);
		color: var(--bp-accent);
	}
</style>
