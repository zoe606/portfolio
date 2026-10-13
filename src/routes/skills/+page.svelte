<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { SKILLS } from '$lib/params';
	import MY_PROJECTS from '$lib/projects.params';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import { getAssetURL } from '$lib/data/assets';
	import { plural } from '$lib/utils/helpers';
	import PageHeader from '$lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { scrollReveal } from '$lib/animations/actions';
	import { REVEAL } from '$lib/animations/presets';

	const { items, title, description } = SKILLS;

	const countUses = (slug: string, list: Array<{ skills: Array<{ slug: string }> }>) =>
		list.filter((item) => item.skills.some((skill) => skill.slug === slug)).length;

	const skills = items.map((skill) => ({
		...skill,
		projects: countUses(skill.slug, MY_PROJECTS),
		roles: countUses(skill.slug, MY_EXPERIENCES)
	}));

	let search = $state('');

	const query = $derived(search.trim().toLowerCase());
	const shown = $derived(skills.filter((skill) => skill.name.toLowerCase().includes(query)));

	// Older links use ?q=.
	onMount(() => {
		search = new URLSearchParams(location.search).get('q') ?? '';
	});
</script>

<TabTitle {title} {description} path="/skills" />

<PageHeader label="Index · Skills" {title} {description} />

<div class="flex flex-col gap-4 pb-10">
	<label class="flex flex-col gap-2">
		<span class="bp-label text-bp-muted">Search</span>
		<input type="search" bind:value={search} placeholder="Skill name" class="search bp-panel" />
	</label>
	<p class="bp-label text-bp-muted" aria-live="polite">{shown.length} of {skills.length} skills</p>
</div>

{#if shown.length === 0}
	<p class="bp-panel p-10 text-center text-bp-muted">No skill matches "{search}".</p>
{:else}
	<ul class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 p-0">
		{#each shown as skill, i (skill.slug)}
			<li
				class="bp-panel tile relative flex items-center gap-4 p-5"
				use:scrollReveal={{ direction: 'scale', delay: (i % 4) * REVEAL.stagger }}
			>
				<!-- A white tile keeps dark logos visible on the dark theme. -->
				<img src={getAssetURL(skill.logo)} alt="" width="40" height="40" class="logo" />
				<div class="flex min-w-0 flex-col gap-0.5">
					<a href={resolve('/skills/[slug]', { slug: skill.slug })} class="stretched">
						{skill.name}
					</a>
					{#if skill.projects}
						<span class="bp-label text-bp-muted">{plural(skill.projects, 'project')}</span>
					{/if}
					{#if skill.roles}
						<span class="bp-label text-bp-muted">{plural(skill.roles, 'role')}</span>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
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

	.tile:hover {
		border-color: var(--bp-accent);
	}

	.tile:has(.stretched:focus-visible) {
		outline: 2px solid var(--bp-accent);
		outline-offset: 2px;
	}

	.stretched {
		color: var(--bp-ink);
		font-family: var(--title-f);
		font-size: 1.125rem;
		font-weight: 600;
		text-decoration: none;
	}

	/* Makes the whole tile clickable while the link stays the only focus stop. */
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
		padding: 4px;
		background: #ffffff;
		object-fit: contain;
	}
</style>
