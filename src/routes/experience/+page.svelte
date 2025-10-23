<script lang="ts">
	import { Badge } from '$lib/components/ui';
	import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { EXPERIENCES } from '$lib/params';
	import type { Experience, Skill } from '$lib/types';
	import { isBlank } from '$lib/utils/helpers';
	import TabTitle from '$lib/components/TabTitle.svelte';

	const { items, title, description } = EXPERIENCES;

	const uniqueSkills = Array.from(
		new Map<string, Skill>(
			items.flatMap((experience) => experience.skills).map((skill) => [skill.slug, skill])
		).values()
	).sort((a, b) => a.name.localeCompare(b.name));

	const years = items.flatMap((experience) => {
		const start = experience.period.from.getFullYear();
		const end = (experience.period.to ?? new Date()).getFullYear();

		return [start, end];
	});

	const minYear = Math.min(...years);
	const maxYear = Math.max(...years);

	const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index);

	let selectedSkills: Array<string> = [];
	let startYear = minYear;
	let endYear = maxYear;
	let query = '';

	let result: Array<Experience> = [...items];

	const applyFilters = () => {
		const normalizedQuery = query.trim().toLowerCase();

		result = items.filter((experience) => {
			const matchesQuery =
				isBlank(normalizedQuery) ||
				experience.name.toLowerCase().includes(normalizedQuery) ||
				experience.company.toLowerCase().includes(normalizedQuery) ||
				experience.description.toLowerCase().includes(normalizedQuery);

			const matchesSkills =
				selectedSkills.length === 0 ||
				experience.skills.some((skill) => selectedSkills.includes(skill.slug));

			const experienceStart = experience.period.from.getFullYear();
			const experienceEnd = (experience.period.to ?? new Date()).getFullYear();

			const matchesYear = experienceStart <= endYear && experienceEnd >= startYear;

			return matchesQuery && matchesSkills && matchesYear;
		});
	};

	const toggleSkill = (slug: string) => {
		if (selectedSkills.includes(slug)) {
			selectedSkills = selectedSkills.filter((item) => item !== slug);
		} else {
			selectedSkills = [...selectedSkills, slug];
		}
		applyFilters();
	};

	const onSearch = (event: CustomEvent<{ search: string }>) => {
		query = event.detail.search;
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

<TabTitle {title} {description} path="/experience" />
<SearchPage {title} onsearch={onSearch}>
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

		{#if uniqueSkills.length > 0}
			<div class="filters-row col gap-2">
				<p class="filters-label">Filter by skill</p>
				<div class="filters-tags">
					{#each uniqueSkills as skill (skill.slug)}
						<Badge
							variant={selectedSkills.includes(skill.slug) ? 'default' : 'outline'}
							class="text-0.8em"
							onclick={() => toggleSkill(skill.slug)}
						>
							{skill.name}
						</Badge>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="col items-center relative mt-10 flex-1">
		{#if result.length === 0}
			<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
				<UIcon icon="i-carbon-development" classes="text-3.5em" />
				<p class="font-300">Could not find anything...</p>
			</div>
		{:else}
			<div class="timeline-track hidden lg:flex"></div>
			{#each result as experience, index (experience.slug)}
				<div class={`timeline-entry ${index % 2 ? 'flex-row' : 'flex-row-reverse'}`}>
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

	.filters-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
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
