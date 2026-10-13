<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { SEARCH } from '#lib/params.js';
	import MY_EXPERIENCES from '#lib/experiences.params.js';
	import MY_PROJECTS from '#lib/projects.params.js';
	import MY_SKILLS from '#lib/skills.params.js';
	import { plural } from '#lib/utils/helpers.js';
	import { PortfolioSearch, type SearchResultItem } from '#lib/utils/search.js';
	import PageHeader from '#lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '#lib/components/TabTitle.svelte';

	const { title, description } = SEARCH;

	const searchEngine = new PortfolioSearch(MY_PROJECTS, MY_EXPERIENCES, MY_SKILLS);

	const groups: Array<{ type: SearchResultItem['type']; heading: string }> = [
		{ type: 'project', heading: 'Projects' },
		{ type: 'experience', heading: 'Experience' },
		{ type: 'skill', heading: 'Skills' }
	];

	let query = $state('');

	const results = $derived(searchEngine.search(query, 50));
	const trimmed = $derived(query.trim());

	// The header search and older links open this page with ?q=.
	onMount(() => {
		query = new URLSearchParams(location.search).get('q') ?? '';
	});
</script>

<TabTitle {title} {description} path="/search" />

<PageHeader label="Index · Search" {title} {description} />

<div class="flex flex-col gap-4 pb-10">
	<label class="flex flex-col gap-2">
		<span class="bp-label text-bp-muted">Search</span>
		<input
			type="search"
			bind:value={query}
			placeholder="Project, company, or skill"
			class="search bp-panel"
		/>
	</label>
	<p class="bp-label text-bp-muted" aria-live="polite">
		{#if trimmed.length < 2}
			Type at least 2 characters
		{:else}
			{plural(results.length, 'result')}
		{/if}
	</p>
</div>

{#if trimmed.length >= 2}
	{#if results.length === 0}
		<p class="bp-panel p-10 text-center text-bp-muted">Nothing matches "{trimmed}".</p>
	{:else}
		<div class="flex flex-col gap-10">
			{#each groups as group (group.type)}
				{@const matches = results.filter((result) => result.type === group.type)}
				{#if matches.length}
					<section class="flex flex-col gap-4" aria-labelledby={`results-${group.type}`}>
						<h2 id={`results-${group.type}`} class="bp-label text-bp-muted">
							{group.heading} · {matches.length}
						</h2>
						<ul class="bp-panel m-0 list-none p-0">
							{#each matches as result (result.to)}
								<li class="border-t border-bp-line first:border-t-0">
									<a href={resolve(result.to)} class="row-link">
										<span class="font-display text-lg font-semibold">{result.name}</span>
										<span aria-hidden="true">→</span>
									</a>
								</li>
							{/each}
						</ul>
					</section>
				{/if}
			{/each}
		</div>
	{/if}
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

	.row-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 24px;
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
