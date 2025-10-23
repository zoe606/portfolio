<script lang="ts">
	import { CardEnhanced, Badge } from '$lib/components/ui';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { EDUCATION } from '$lib/params';
	import type { Education } from '$lib/types';
	import { getTimeDiff } from '$lib/utils';
	import TabTitle from '$lib/components/TabTitle.svelte';

	const { items, title, description } = EDUCATION;

	let search = '';
	let result: Array<Education> = items;

	const onSearch = (event: CustomEvent<{ search: string }>) => {
		search = event.detail.search.trim().toLowerCase();

		if (search.length === 0) {
			result = items;
			return;
		}

		result = items.filter((education) => {
			return (
				education.degree.toLowerCase().includes(search) ||
				education.description.toLowerCase().includes(search) ||
				education.location.toLowerCase().includes(search) ||
				education.name.toLowerCase().includes(search) ||
				education.organization.toLowerCase().includes(search) ||
				education.subjects.some((subject) => subject.toLowerCase().includes(search))
			);
		});
	};
</script>

<TabTitle {title} {description} path="/education" />
<SearchPage {title} {search} onsearch={onSearch}>
	<div class="timeline col items-center relative mt-10 flex-1">
		{#if result.length === 0}
			<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
				<UIcon icon="i-carbon-education" classes="text-3.5em" />
				<p class="font-300">Could not find anything...</p>
			</div>
		{:else}
			<div class="timeline-track hidden lg:flex"></div>
			{#each result as education, index (education.slug)}
				<div class={`timeline-entry ${index % 2 ? 'flex-row' : 'flex-row-reverse'}`}>
					<div class="flex-1 hidden lg:flex"></div>
					<div class="hidden lg:inline timeline-dot">
						<UIcon icon="i-carbon-condition-point" />
					</div>
					<div class="col flex-1 items-stretch">
						<CardEnhanced>
							<div class="flex-1 col gap-2 items-stretch">
								<img
									src={getAssetURL(education.logo)}
									alt={education.organization}
									height="50"
									width="50"
									class="mb-5"
								/>
								<div class="text-[1.3em]">{education.degree}</div>
								<div>{education.organization}</div>
								<div class="text-[var(--accent-text)] text-[0.9em] font-200 mb-2">
									{education.location} · {getTimeDiff(education.period.from, education.period.to)}
								</div>
								<div class="row flex-wrap gap-1">
									{#each education.subjects as subject (subject)}
										<Badge>{subject}</Badge>
									{/each}
								</div>
							</div>
						</CardEnhanced>
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
