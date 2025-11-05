<script lang="ts">
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import { base } from '$app/paths';

	interface Props {
		skills: Skill[];
		title?: string;
	}

	let { skills, title = 'Skills & Technologies' }: Props = $props();

	// Categorize skills based on their names
	const categorizeSkills = (skills: Skill[]) => {
		const categories: Record<string, Skill[]> = {
			'Programming Languages': [],
			Frontend: [],
			'Backend & Frameworks': [],
			Databases: [],
			'DevOps & Tools': [],
			'API & Communication': [],
			'Monitoring & Analytics': []
		};

		const langNames = ['go', 'php', 'ruby', 'javascript', 'typescript'];
		const frontendNames = [
			'html',
			'css',
			'sass',
			'bootstrap',
			'reactjs',
			'vuejs',
			'svelte',
			'nextjs',
			'jquery',
			'react native'
		];
		const backendNames = ['laravel', 'ruby on rails', 'yii 2', 'codeigniter'];
		const dbNames = ['postgresql', 'mysql', 'mongodb', 'redis'];
		const apiNames = ['graphql', 'grpc', 'pub/sub'];
		const monitoringNames = ['sentry', 'new relic'];

		skills.forEach((skill) => {
			const name = skill.name.toLowerCase();

			if (langNames.some((l) => name.includes(l))) {
				categories['Programming Languages'].push(skill);
			} else if (frontendNames.some((f) => name.includes(f))) {
				categories['Frontend'].push(skill);
			} else if (backendNames.some((b) => name.includes(b))) {
				categories['Backend & Frameworks'].push(skill);
			} else if (dbNames.some((d) => name.includes(d))) {
				categories['Databases'].push(skill);
			} else if (apiNames.some((a) => name.includes(a))) {
				categories['API & Communication'].push(skill);
			} else if (monitoringNames.some((m) => name.includes(m))) {
				categories['Monitoring & Analytics'].push(skill);
			} else {
				categories['DevOps & Tools'].push(skill);
			}
		});

		// Filter out empty categories
		return Object.entries(categories).filter(([, categorySkills]) => categorySkills.length > 0);
	};

	const categorizedSkills = categorizeSkills(skills);
</script>

<div class="skills-showcase col gap-30px">
	<h2 class="text-2xl font-bold text-[var(--primary-text)] text-center md:text-left">
		{title}
	</h2>

	<div class="col gap-25px">
		{#each categorizedSkills as [category, categorySkills] (category)}
			<div class="category-section">
				<h3
					class="text-sm font-semibold text-[var(--accent-text)] m-b-12px uppercase tracking-wide"
				>
					{category}
				</h3>
				<div class="flex flex-wrap gap-10px">
					{#each categorySkills as skill (skill.slug)}
						<a
							href={`${base}/skills/${skill.slug}`}
							class="skill-badge decoration-none flex items-center gap-8px p-x-12px p-y-8px rounded-lg bg-[var(--main-hover)] border-1px border-[var(--border)] transition-all hover:border-[var(--accent-text)] hover:shadow-md hover:-translate-y-1px"
						>
							<img
								src={getAssetURL(skill.logo)}
								alt={skill.name}
								class="w-20px h-20px object-contain"
								loading="lazy"
							/>
							<span class="text-sm text-[var(--secondary-text)] font-medium">{skill.name}</span>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.skill-badge {
		cursor: pointer;
	}

	.skill-badge:hover {
		transform: translateY(-2px);
	}

	.category-section {
		padding-bottom: 5px;
	}
</style>
