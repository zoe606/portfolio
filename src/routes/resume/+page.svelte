<script lang="ts">
	import { asset } from '$app/paths';
	import { RESUME } from '#lib/params.js';
	import PageHeader from '#lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '#lib/components/TabTitle.svelte';

	const { item, title, description } = RESUME;
	const src = item ? asset(item) : undefined;
</script>

<TabTitle {title} {description} path="/resume" />

<PageHeader label="Document · CV" {title} {description}>
	{#if src}
		<div class="flex flex-wrap gap-3 pt-2">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={src} download class="bp-button bp-button-primary">Download PDF ↓</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={src} target="_blank" rel="noreferrer" class="bp-button">Open in new tab ↗</a>
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
