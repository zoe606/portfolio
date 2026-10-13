<script lang="ts">
	import { base } from '$app/paths';
	import { RESUME } from '$lib/params';
	import PageHeader from '$lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';

	const { item, title, description } = RESUME;
	const src = item ? `${base}${item}` : undefined;
</script>

<TabTitle {title} {description} path="/resume" />

<PageHeader label="Document · CV" {title} {description}>
	{#if src}
		<div class="flex flex-wrap gap-3 pt-2">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={src} download class="button button-primary">Download PDF ↓</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={src} target="_blank" rel="noreferrer" class="button">Open in new tab ↗</a>
		</div>
	{/if}
</PageHeader>

{#if src}
	<div class="bp-panel overflow-hidden">
		<iframe src={`${src}#view=FitH`} title="Resume preview" class="frame" loading="lazy"></iframe>
	</div>
{:else}
	<p class="bp-panel p-10 text-center text-bp-muted">No resume is available right now.</p>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 18px;
		border: 2px solid var(--bp-ink);
		color: var(--bp-ink);
		font-family: var(--mono-f);
		font-size: 14px;
		text-decoration: none;
	}

	.button:hover {
		border-color: var(--bp-accent);
		color: var(--bp-accent);
	}

	.button-primary {
		border-color: var(--bp-accent);
		background: var(--bp-accent);
		color: var(--bp-on-accent);
	}

	.button-primary:hover {
		color: var(--bp-on-accent);
		filter: brightness(1.1);
	}

	.frame {
		display: block;
		width: 100%;
		height: 80vh;
		background: #ffffff;
	}

	@media (max-width: 640px) {
		.frame {
			height: 65vh;
		}
	}
</style>
