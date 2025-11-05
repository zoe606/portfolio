<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { SEARCH } from '$lib/params';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import MY_PROJECTS from '$lib/projects.params';
	import MY_SKILLS from '$lib/skills.params';
	import { Badge } from '$lib/components/ui';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { PortfolioSearch, type SearchResultItem } from '$lib/utils/search';

	const { title, description } = SEARCH;

	// Initialize the search engine with all data
	const searchEngine = new PortfolioSearch(MY_PROJECTS, MY_EXPERIENCES, MY_SKILLS);

	let query = '';
	let result: Array<SearchResultItem> = [];
	let resultCount = { projects: 0, experiences: 0, skills: 0 };

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		query = searchParams.get('q') ?? '';
	});

	$: {
		// Use fuzzy search with Fuse.js
		result = searchEngine.search(query, 50);

		// Count results by type for display
		resultCount = {
			projects: result.filter((r) => r.type === 'project').length,
			experiences: result.filter((r) => r.type === 'experience').length,
			skills: result.filter((r) => r.type === 'skill').length
		};
	}
</script>

<TabTitle {title} {description} path="/search" />
<SearchPage {title} onsearch={(e) => (query = e.detail.search)}>
	<div class="flex flex-col items-stretch gap-10 p-2"></div>
	{#if !query}
		<div class="flex-1 self-center col-center m-t-10 gap-5 font-300 text-[var(--accent-text)]">
			<UIcon icon="i-carbon-search-locate-mirror" classes="text-2em" />
			<span> Try typing something... </span>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#if result.length === 0}
				<div class="flex-1 self-center col-center m-t-10 gap-5 font-300 text-[var(--accent-text)]">
					<UIcon icon="i-carbon-cube" classes="text-2em" />
					<span> Oops! Nothing found for "{query}" </span>
				</div>
			{:else}
				<!-- Result count summary -->
				<div class="flex flex-row flex-wrap gap-2 text-sm text-[var(--accent-text)]">
					<span class="font-semibold"
						>{result.length} result{result.length !== 1 ? 's' : ''} found:</span
					>
					{#if resultCount.projects > 0}
						<span>{resultCount.projects} project{resultCount.projects !== 1 ? 's' : ''}</span>
					{/if}
					{#if resultCount.experiences > 0}
						<span
							>• {resultCount.experiences} experience{resultCount.experiences !== 1
								? 's'
								: ''}</span
						>
					{/if}
					{#if resultCount.skills > 0}
						<span>• {resultCount.skills} skill{resultCount.skills !== 1 ? 's' : ''}</span>
					{/if}
				</div>

				<!-- Results -->
				<div class="flex flex-row flex-wrap gap-1">
					{#each result as item (item.to)}
						<Badge href={`${base}/${item.to}`} class="flex flex-row items-center gap-2">
							<UIcon icon={item.icon} />
							<span>{item.name}</span>
						</Badge>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</SearchPage>
