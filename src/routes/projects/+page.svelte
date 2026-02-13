<script lang="ts">
	/* eslint-disable svelte/prefer-writable-derived */
	import { Badge } from '$lib/components/ui';
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { PROJECTS } from '$lib/params';
	import type { Project, Skill } from '$lib/types';
	import { onMount } from 'svelte';
	import MY_SKILLS from '$lib/skills.params';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { scrollReveal } from '$lib/animations/actions';
	import { REVEAL } from '$lib/animations/presets';

	interface SkillFilter extends Skill {
		isSelected?: boolean;
	}

	const { items, title, description } = PROJECTS;

	// Use $state for reactive filters
	let filters = $state<Array<SkillFilter>>(
		MY_SKILLS.filter((it) => {
			return items.some((project) => project.skills.some((skill) => skill.slug === it.slug));
		})
	);

	let search = $state('');
	let displayed = $state<Array<Project>>([]);

	const isSelected = (slug: string): boolean => {
		return filters.some((item) => item.slug === slug && item.isSelected);
	};

	const onSelected = (slug: string) => {
		filters = filters.map((tech) => {
			if (tech.slug === slug) {
				tech.isSelected = !isSelected(slug);
			}
			return tech;
		});
	};

	const orderedItems = items.slice().sort((a, b) => a.no - b.no);

	// Use $derived for computed displayed projects
	$effect(() => {
		displayed = orderedItems.filter((project) => {
			const isFiltered =
				filters.every((item) => !item.isSelected) ||
				project.skills.some((tech) =>
					filters.some((filter) => filter.isSelected && filter.slug === tech.slug)
				);

			const isSearched =
				search.trim().length === 0 ||
				project.name.trim().toLowerCase().includes(search.trim().toLowerCase());

			return isFiltered && isSearched;
		});
	});

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		search = e.detail.search;
	};

	onMount(() => {
		const query = location.search;

		if (query) {
			const queryParams = new URLSearchParams(location.search);
			const item = queryParams.get('item');
			if (item) {
				search = item;
			}
		}
	});
</script>

<TabTitle {title} {description} path="/projects" />
<SearchPage {title} onsearch={onSearch}>
	<div class="projects-filters">
		{#each filters as tech (tech.slug)}
			<Badge
				variant={tech.isSelected ? 'default' : 'outline'}
				class="text-0.8em"
				onclick={() => onSelected(tech.slug)}
			>
				{tech.name}
			</Badge>
		{/each}
	</div>
	{#if displayed.length === 0}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not find anything...</p>
		</div>
	{:else}
		<div class="projects-list mt-5">
			{#each displayed as project, i (project.slug)}
				<div use:scrollReveal={{ delay: i * REVEAL.stagger }}>
					<ProjectCard {project} />
				</div>
			{/each}
		</div>
	{/if}
</SearchPage>

<style lang="scss">
	.projects-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;

		@media (max-width: 1350px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (max-width: 850px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
