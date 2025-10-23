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

	const years = items.flatMap((education) => {
		const start = education.period.from.getFullYear();
		const end = (education.period.to ?? new Date()).getFullYear();

		return [start, end];
	});

	const minYear = Math.min(...years);
	const maxYear = Math.max(...years);
	const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index);

	let search = '';
	let startYear = minYear;
	let endYear = maxYear;
	let result: Array<Education> = items;

	const applyFilters = () => {
		const normalizedQuery = search.trim().toLowerCase();

		result = items.filter((education) => {
			const matchesQuery =
				normalizedQuery.length === 0 ||
				education.degree.toLowerCase().includes(normalizedQuery) ||
				education.description.toLowerCase().includes(normalizedQuery) ||
				education.location.toLowerCase().includes(normalizedQuery) ||
				education.name.toLowerCase().includes(normalizedQuery) ||
				education.organization.toLowerCase().includes(normalizedQuery) ||
				education.subjects.some((subject) => subject.toLowerCase().includes(normalizedQuery));

			const educationStart = education.period.from.getFullYear();
			const educationEnd = (education.period.to ?? new Date()).getFullYear();

			const matchesYear = educationStart <= endYear && educationEnd >= startYear;

			return matchesQuery && matchesYear;
		});
	};

	const onSearch = (event: CustomEvent<{ search: string }>) => {
		search = event.detail.search;
		applyFilters();
	};

	const onStartYearChange = (event: Event) => {
		const value = Number((event.target as HTMLSelectElement).value);
		startYear = Math.min(value, endYear);
		applyFilters();
	};

	const onEndYearChange = (event: Event) => {
		const value = Number((event.target as HTMLSelectElement).value);
		endYear = Math.max(value, startYear);
		applyFilters();
	};
</script>

<TabTitle {title} {description} path="/education" />
<SearchPage {title} {search} onsearch={onSearch}>
	<div class="filters col gap-3">
		<div class="filters-row">
			<p class="filters-label">Filter by year</p>
			<div class="filters-controls">
				<label class="filters-control">
					<span>From</span>
					<select bind:value={startYear} on:change={onStartYearChange}>
						{#each [...yearOptions].reverse() as year (year)}
							<option value={year}>{year}</option>
						{/each}
					</select>
				</label>
				<label class="filters-control">
					<span>To</span>
					<select bind:value={endYear} on:change={onEndYearChange}>
						{#each [...yearOptions].reverse() as year (year)}
							<option value={year}>{year}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>
	</div>

	<div class="col items-center relative mt-10 flex-1">
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
	.filters {
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.02);
	}

	.filters-row {
		display: flex;
		flex-direction: column;
		gap: 8px;

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}

	.filters-label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--accent-text);
		margin: 0;
	}

	.filters-controls {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.filters-control {
		display: flex;
		flex-direction: column;
		font-size: 0.85rem;
		color: var(--tertiary-text);
		gap: 6px;
	}

	select {
		background: var(--main);
		color: var(--main-text);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 6px 8px;
		min-width: 120px;
		font-size: 0.95rem;
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
