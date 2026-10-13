<script lang="ts">
	import { resolve } from '$app/paths';
	import { PROJECTS } from '#lib/params.js';
	import { getAssetURL } from '#lib/data/assets.js';
	import { getScrenshootURL } from '#lib/data/screenshoot.js';
	import { formatYears, getTimeDiff, splitSentences } from '#lib/utils/helpers.js';
	import PageHeader from '#lib/components/Blueprint/PageHeader.svelte';
	import MetricStrip from '#lib/components/Blueprint/MetricStrip.svelte';
	import WorkList from '#lib/components/Blueprint/WorkList.svelte';
	import SkillChips from '#lib/components/Blueprint/SkillChips.svelte';
	import Pager from '#lib/components/Blueprint/Pager.svelte';
	import TabTitle from '#lib/components/TabTitle.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const project = $derived(data.project);
	const href = (slug: string) => resolve('/projects/[slug]', { slug });
	const code = $derived(`PRJ-${String(project.no).padStart(2, '0')}`);
</script>

<TabTitle
	title={`${project.name} - ${PROJECTS.title}`}
	description={project.shortDescription}
	path={`/projects/${project.slug}`}
	type="article"
/>

<a href={resolve('projects')} class="back bp-label">← All projects</a>

<PageHeader
	label={`${code} · ${project.type}`}
	title={project.name}
	description={project.shortDescription}
	class="pt-8"
>
	<div class="flex flex-wrap items-center gap-3 pt-2">
		<img src={getAssetURL(project.logo)} alt="" width="40" height="40" class="logo" />
		<span class="bp-label text-bp-muted">
			{formatYears(project.period)} · {getTimeDiff(project.period.from, project.period.to)}
		</span>
		{#each project.links as link (link.to)}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={link.to} class="link-button" target="_blank" rel="noreferrer">{link.label} ↗</a>
		{/each}
	</div>
</PageHeader>

{#if project.metrics?.length}
	<section aria-label="Results">
		<MetricStrip metrics={project.metrics} />
	</section>
{/if}

<section class="flex flex-col gap-5 pt-16" aria-labelledby="work">
	<h2 id="work" class="bp-label text-bp-muted">02 / What I did</h2>
	<WorkList items={splitSentences(project.description)} />
</section>

<section class="flex flex-col gap-5 pt-16" aria-labelledby="stack">
	<h2 id="stack" class="bp-label text-bp-muted">03 / Stack</h2>
	<SkillChips skills={project.skills} />
</section>

{#if project.screenshots?.length}
	<section class="flex flex-col gap-5 pt-16" aria-labelledby="screenshots">
		<h2 id="screenshots" class="bp-label text-bp-muted">04 / Screenshots</h2>
		<div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
			{#each project.screenshots as shot, i (i)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={getScrenshootURL(shot.src)} target="_blank" rel="noreferrer" class="shot">
					<img
						src={getScrenshootURL(shot.src)}
						alt={shot.label || `${project.name} screenshot ${i + 1}`}
						loading="lazy"
						class="aspect-video w-full object-cover"
					/>
				</a>
			{/each}
		</div>
	</section>
{/if}

<Pager
	label="More projects"
	previous={data.previous && { href: href(data.previous.slug), name: data.previous.name }}
	next={data.next && { href: href(data.next.slug), name: data.next.name }}
/>

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

	.link-button {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 16px;
		border: 1px solid var(--bp-ink);
		color: var(--bp-ink);
		font-family: var(--mono-f);
		font-size: 13px;
		text-decoration: none;
	}

	.link-button:hover {
		border-color: var(--bp-accent);
		color: var(--bp-accent);
	}

	.shot {
		display: block;
		border: 2px solid var(--bp-ink);
	}

	.shot:hover {
		border-color: var(--bp-accent);
	}
</style>
