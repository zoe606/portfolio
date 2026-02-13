<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { EXPERIENCES } from '$lib/params';
	import type { Experience } from '$lib/types';
	import { isBlank } from '$lib/utils/helpers';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { scrollReveal } from '$lib/animations/actions';
	import { REVEAL } from '$lib/animations/presets';

	const { items, title, description } = EXPERIENCES;

	let result: Array<Experience> = [...items];

	const onSearch = (event: CustomEvent<{ search: string }>) => {
		const query = event.detail.search.trim().toLowerCase();

		if (isBlank(query)) {
			result = items;
			return;
		}

		result = items.filter((experience) => {
			return (
				experience.name.toLowerCase().includes(query) ||
				experience.company.toLowerCase().includes(query) ||
				experience.description.toLowerCase().includes(query)
			);
		});
	};
</script>

<TabTitle {title} {description} path="/experience" />
<SearchPage {title} onsearch={onSearch}>
	<div class="timeline col items-center relative mt-10 flex-1">
		{#if result.length === 0}
			<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
				<UIcon icon="i-carbon-development" classes="text-3.5em" />
				<p class="font-300">Could not find anything...</p>
			</div>
		{:else}
			<div class="timeline-track hidden lg:flex"></div>
			{#each result as experience, index (experience.slug)}
				<div
					use:scrollReveal={{ direction: 'left', delay: index * REVEAL.stagger }}
					class={`timeline-entry ${index % 2 ? 'flex-row' : 'flex-row-reverse'}`}
				>
					<div class="flex-1 hidden lg:flex"></div>
					<div class="hidden lg:inline timeline-dot">
						<UIcon icon="i-carbon-condition-point" />
					</div>
					<div class="flex-1 col items-stretch">
						<ExperienceCard {experience} />
					</div>
				</div>
			{/each}
		{/if}
	</div>
</SearchPage>

<style lang="scss">
	.timeline {
		min-height: 60vh;
	}

	.timeline-track {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		left: calc(50% - 1px);
		background: var(--border);
		border-radius: 4px;
	}

	.timeline-entry {
		display: flex;
		position: relative;
		align-items: center;
		width: 100%;
		margin: 10px 0;
	}

	.timeline-dot {
		padding: 12px;
		background: var(--main);
		border-radius: 999px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
