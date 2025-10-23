<script lang="ts">
	import { base } from '$app/paths';
	import { Badge } from '$lib/components/ui';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { RESUME } from '$lib/params';

	const { item, title, description } = RESUME;
	const resolvedSrc = item ? `${base}${item}` : undefined;
</script>

<TabTitle {title} {description} path="/resume" />
<CommonPage {title}>
	{#if resolvedSrc}
		<div class="resume-actions">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resolvedSrc} download title="Download resume">
				<Badge class="text-1em">Download PDF</Badge>
			</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resolvedSrc} target="_blank" rel="noreferrer" title="Open in new tab">
				<Badge variant="outline" class="text-1em">Open in new tab</Badge>
			</a>
		</div>

		<div class="resume-viewer">
			<iframe
				src={`${resolvedSrc}#view=FitH`}
				title="Resume preview"
				class="resume-frame"
				loading="lazy"
			></iframe>
		</div>
	{:else}
		<div class="resume-empty">
			<p>No resume available at the moment.</p>
		</div>
	{/if}
</CommonPage>

<style lang="scss">
	.resume-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
		margin: 16px 0 24px;

		a {
			text-decoration: none;
		}

		@media (max-width: 640px) {
			flex-direction: column;

			a {
				width: 100%;
				display: flex;
				justify-content: center;
			}
		}
	}

	.resume-viewer {
		border: 1px solid var(--border);
		border-radius: 12px;
		overflow: hidden;
		background: var(--main);
	}

	.resume-frame {
		width: 100%;
		height: 75vh;
		border: none;
		background: #fff;

		@media (max-width: 640px) {
			height: 60vh;
		}
	}

	.resume-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		color: var(--accent-text);
		font-weight: 300;
		text-align: center;
	}
</style>
