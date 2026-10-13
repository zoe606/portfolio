<script lang="ts">
	import { resolve } from '$app/paths';
	import { SKILLS } from '$lib/params';
	import { getAssetURL } from '$lib/data/assets';
	import { formatYears } from '$lib/utils/helpers';
	import PageHeader from '$lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const skill = $derived(data.skill);
</script>

<TabTitle
	title={`${skill.name} - ${SKILLS.title}`}
	description={skill.description}
	path={`/skills/${skill.slug}`}
	type="article"
/>

<a href={resolve('/skills')} class="back bp-label">← All skills</a>

<PageHeader label="Skill" title={skill.name} description={skill.description} class="pt-8">
	<img src={getAssetURL(skill.logo)} alt="" width="56" height="56" class="logo order-first" />
</PageHeader>

{#snippet usedIn(
	id: string,
	heading: string,
	items: Array<{ href: string; name: string; meta: string; years: string }>
)}
	<section class="flex flex-col gap-5" aria-labelledby={id}>
		<h2 {id} class="bp-label text-bp-muted">{heading}</h2>
		<ul class="bp-panel m-0 list-none p-0">
			{#each items as item (item.href)}
				<li class="border-t border-bp-line first:border-t-0">
					<a href={item.href} class="row-link">
						<span class="flex min-w-0 flex-col gap-1">
							<span class="font-display text-lg font-semibold">{item.name}</span>
							<span class="text-sm text-bp-muted">{item.meta}</span>
						</span>
						<span class="bp-label shrink-0 text-bp-muted">{item.years}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/snippet}

<div class="flex flex-col gap-12">
	{#if data.projects.length}
		{@render usedIn(
			'projects',
			'02 / Used in projects',
			data.projects.map((project) => ({
				href: resolve('/projects/[slug]', { slug: project.slug }),
				name: project.name,
				meta: project.type,
				years: formatYears(project.period)
			}))
		)}
	{/if}

	{#if data.experiences.length}
		{@render usedIn(
			'experience',
			`${data.projects.length ? '03' : '02'} / Used in roles`,
			data.experiences.map((job) => ({
				href: resolve('/experience/[slug]', { slug: job.slug }),
				name: job.company,
				meta: job.name,
				years: formatYears(job.period)
			}))
		)}
	{/if}
</div>

{#if !data.projects.length && !data.experiences.length}
	<p class="bp-panel p-10 text-center text-bp-muted">
		No listed project or role uses {skill.name} yet.
	</p>
{/if}

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
		padding: 6px;
		background: #ffffff;
		border: 1px solid var(--bp-line);
		object-fit: contain;
	}

	.row-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 18px 28px;
		color: var(--bp-ink);
		text-decoration: none;
	}

	.row-link:hover {
		color: var(--bp-accent);
	}

	.row-link:focus-visible {
		outline: 2px solid var(--bp-accent);
		outline-offset: -2px;
	}
</style>
