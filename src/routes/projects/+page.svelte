<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { PROJECTS } from '#lib/params.js';
	import MY_SKILLS from '#lib/skills.params.js';
	import { getAssetURL } from '#lib/data/assets.js';
	import { formatYears } from '#lib/utils/helpers.js';
	import PageHeader from '#lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '#lib/components/TabTitle.svelte';
	import { scrollReveal } from '#lib/animations/actions.js';
	import { REVEAL } from '#lib/animations/presets.js';

	const { items, title, description } = PROJECTS;

	const projects = items.toSorted((a, b) => a.no - b.no);
	const skills = MY_SKILLS.filter((skill) =>
		projects.some((project) => project.skills.some((used) => used.slug === skill.slug))
	);

	let search = $state('');
	const selected = new SvelteSet<string>();

	const query = $derived(search.trim().toLowerCase());
	const shown = $derived(
		projects.filter((project) => {
			const matchesSkill =
				selected.size === 0 || project.skills.some((skill) => selected.has(skill.slug));
			const matchesQuery =
				query === '' ||
				[project.name, project.type, project.shortDescription].some((text) =>
					text.toLowerCase().includes(query)
				);
			return matchesSkill && matchesQuery;
		})
	);

	const toggle = (slug: string) => {
		if (selected.has(slug)) selected.delete(slug);
		else selected.add(slug);
	};

	const code = (no: number) => `PRJ-${String(no).padStart(2, '0')}`;

	// The search modal links here with ?item=<name>, and older links use ?q=.
	onMount(() => {
		const params = new URLSearchParams(location.search);
		search = params.get('item') ?? params.get('q') ?? '';
	});
</script>

<TabTitle {title} {description} path="/projects" />

<PageHeader label="Index · Projects" {title} {description} />

<div class="flex flex-col gap-4 pb-10">
	<label class="flex flex-col gap-2">
		<span class="bp-label text-bp-muted">Search</span>
		<input
			type="search"
			bind:value={search}
			placeholder="Name, type, or keyword"
			class="search bp-panel"
		/>
	</label>
	<div role="group" aria-label="Filter by skill" class="flex flex-wrap gap-2">
		{#each skills as skill (skill.slug)}
			<button
				type="button"
				class="filter"
				aria-pressed={selected.has(skill.slug)}
				onclick={() => toggle(skill.slug)}>{skill.name}</button
			>
		{/each}
		{#if selected.size > 0}
			<button type="button" class="filter filter-clear" onclick={() => selected.clear()}>
				Clear filters
			</button>
		{/if}
	</div>
	<p class="bp-label text-bp-muted" aria-live="polite">
		{shown.length} of {projects.length} projects
	</p>
</div>

{#if shown.length === 0}
	<p class="bp-panel p-10 text-center text-bp-muted">No project matches these filters.</p>
{:else}
	<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
		{#each shown as project, i (project.slug)}
			<article
				class="bp-panel card relative flex flex-col gap-4 p-6"
				use:scrollReveal={{ delay: (i % 3) * REVEAL.stagger }}
			>
				<div class="flex items-start justify-between gap-4">
					<p class="bp-label text-bp-muted">{code(project.no)} · {project.type}</p>
					<img src={getAssetURL(project.logo)} alt="" width="32" height="32" class="logo" />
				</div>
				<h2 class="m-0 font-display text-xl font-semibold leading-snug">
					<a href={resolve('/projects/[slug]', { slug: project.slug })} class="stretched">
						{project.name}
					</a>
				</h2>
				<p class="leading-relaxed text-bp-muted">{project.shortDescription}</p>
				{#if project.metrics?.[0]}
					<p class="flex flex-wrap items-baseline gap-x-2">
						<span class="font-display text-3xl font-bold text-bp-accent">
							{project.metrics[0].value}
						</span>
						<span class="text-sm text-bp-muted">{project.metrics[0].label}</span>
					</p>
				{/if}
				<p class="bp-label mt-auto border-t border-bp-line pt-4 text-bp-muted">
					{formatYears(project.period)} · {project.skills
						.slice(0, 3)
						.map((skill) => skill.name)
						.join(' · ')}
				</p>
			</article>
		{/each}
	</div>
{/if}

<style>
	.search {
		min-height: 48px;
		padding: 0 16px;
		color: var(--bp-ink);
		font: inherit;
	}

	.search:focus-visible {
		outline: 2px solid var(--bp-accent);
		outline-offset: 2px;
	}

	.filter {
		min-height: 36px;
		padding: 0 12px;
		border: 1px solid var(--bp-line);
		background: var(--bp-surface);
		color: var(--bp-ink);
		font-family: var(--mono-f);
		font-size: 13px;
		cursor: pointer;
	}

	.filter:hover {
		border-color: var(--bp-ink);
	}

	.filter[aria-pressed='true'] {
		border-color: var(--bp-inverse);
		background: var(--bp-inverse);
		color: var(--bp-on-inverse);
	}

	.filter-clear {
		border-color: var(--bp-accent);
		color: var(--bp-accent);
	}

	.card:hover {
		border-color: var(--bp-accent);
	}

	.card:has(.stretched:focus-visible) {
		outline: 2px solid var(--bp-accent);
		outline-offset: 2px;
	}

	.stretched {
		color: var(--bp-ink);
		text-decoration: none;
	}

	/* Makes the whole card clickable while the link stays the only focus stop. */
	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.stretched:focus-visible {
		outline: none;
	}

	.logo {
		flex-shrink: 0;
		padding: 3px;
		background: #ffffff;
		object-fit: contain;
	}
</style>
