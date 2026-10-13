<script lang="ts">
	import { resolve } from '$app/paths';
	import { EXPERIENCES } from '$lib/params';
	import { getAssetURL } from '$lib/data/assets';
	import { formatYears, getTimeDiff, splitSentences } from '$lib/utils/helpers';
	import PageHeader from '$lib/components/Blueprint/PageHeader.svelte';
	import WorkList from '$lib/components/Blueprint/WorkList.svelte';
	import SkillChips from '$lib/components/Blueprint/SkillChips.svelte';
	import Pager from '$lib/components/Blueprint/Pager.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const job = $derived(data.experience);
	const href = (slug: string) => resolve('/experience/[slug]', { slug });
	const neighbor = (item?: { slug: string; company: string }) =>
		item && { href: href(item.slug), name: item.company };
</script>

<TabTitle
	title={`${job.name} at ${job.company} - ${EXPERIENCES.title}`}
	description={job.shortDescription}
	path={`/experience/${job.slug}`}
	type="article"
/>

<a href={resolve('/experience')} class="back bp-label">← All experience</a>

<PageHeader label={`${job.contract} · ${job.location}`} title={job.company} class="pt-8">
	<div class="flex flex-wrap items-center gap-3">
		<img src={getAssetURL(job.logo)} alt="" width="40" height="40" class="logo" />
		<span class="font-display text-xl font-semibold">{job.name}</span>
		<span class="bp-label text-bp-muted">
			{formatYears(job.period)} · {getTimeDiff(job.period.from, job.period.to)}
		</span>
	</div>
	<p class="max-w-160 text-lg leading-relaxed text-bp-muted">{job.shortDescription}</p>
</PageHeader>

<section class="flex flex-col gap-5" aria-labelledby="work">
	<h2 id="work" class="bp-label text-bp-muted">02 / What I did</h2>
	<WorkList items={splitSentences(job.description)} />
</section>

{#if job.skills.length}
	<section class="flex flex-col gap-5 pt-16" aria-labelledby="stack">
		<h2 id="stack" class="bp-label text-bp-muted">03 / Stack</h2>
		<SkillChips skills={job.skills} />
	</section>
{/if}

<Pager label="More experience" previous={neighbor(data.previous)} next={neighbor(data.next)} />

<style>
	.back {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		margin-top: 32px;
		color: var(--bp-muted);
		text-decoration: none;
	}

	.back:hover {
		color: var(--bp-accent);
	}

	.logo {
		padding: 4px;
		background: #ffffff;
		border: 1px solid var(--bp-line);
		object-fit: contain;
	}
</style>
