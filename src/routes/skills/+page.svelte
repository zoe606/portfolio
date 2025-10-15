<script lang="ts">
	import { CardEnhanced } from '$lib/components/ui';
	import { base } from '$app/paths';
	import { SKILLS } from '$lib/params';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import type { Skill } from '$lib/types';
	import { isBlank } from '$lib/utils/helpers';
	import { getAssetURL } from '$lib/data/assets';
	import UIcon from '$lib/components/Icon/UIcon.svelte';

	const { items, title } = SKILLS;

	let result: Array<Skill> = items;

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		const query = e.detail.search;

		if (isBlank(query)) {
			result = items;
		}

		result = items.filter((it) => it.name.toLowerCase().includes(query));
	};
</script>

<SearchPage {title} onsearch={onSearch}>
	{#if result.length === 0}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not find anything...</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 mt-10">
			{#each result as skill (skill.slug)}
				<CardEnhanced
					color={skill.color}
					class="cursor-pointer decoration-none"
					tiltDegree={1}
					href={`${base}/skills/${skill.slug}`}
					bgImg={getAssetURL(skill.logo)}
				>
					<p class="text-[var(--tertiary-text)]">{skill.name}</p>
				</CardEnhanced>
			{/each}
		</div>
	{/if}
</SearchPage>
