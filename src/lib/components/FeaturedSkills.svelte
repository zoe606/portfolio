<script lang="ts">
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import { base } from '$app/paths';
	import { changeColorOpacity } from '$lib/utils/color';
	import { onMount } from 'svelte';

	interface Props {
		skills: Skill[];
		title?: string;
	}

	let { skills, title = 'Core Technologies' }: Props = $props();

	// Filter to show only featured skills (exactly 6)
	const featuredSlugs = ['go', 'php', 'ruby', 'reactjs', 'pgsql', 'ruby on rails'];
	const featuredSkills = featuredSlugs
		.map((slug) => skills.find((skill) => skill.slug === slug || skill.name.toLowerCase().includes(slug)))
		.filter((skill): skill is Skill => skill !== undefined)
		.slice(0, 6);

	let skillElements: HTMLElement[] = [];

	onMount(() => {
		featuredSkills.forEach((skill, index) => {
			const el = skillElements[index];
			if (el) {
				const borderColor = changeColorOpacity(skill.color, 0.5);
				const dropColor = changeColorOpacity(skill.color, 0.15);
				const bgColor = changeColorOpacity(skill.color, 0.01);

				el.style.setProperty('--border-color', borderColor);
				el.style.setProperty('--drop-color', dropColor);
				el.style.setProperty('--bg-color', bgColor);
			}
		});
	});

	const onHover = (ev: MouseEvent, index: number) => {
		const target = ev.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = ev.clientX - rect.left;
		const y = ev.clientY - rect.top;

		const el = skillElements[index];
		if (el) {
			el.style.setProperty('--drop-x', `${x}px`);
			el.style.setProperty('--drop-y', `${y}px`);
		}
	};
</script>

<div class="featured-skills col gap-30px">
	<div class="row justify-between items-center m-b-20px">
		<h2 class="text-2xl font-bold text-[var(--main-text)]">
			{title}
		</h2>
		<a
			href={`${base}/skills`}
			class="text-sm text-[var(--main-text)] hover:text-[var(--secondary-text)] decoration-none font-medium whitespace-nowrap transition-colors"
		>
			View All →
		</a>
	</div>

	<div class="grid grid-cols-3 md:grid-cols-6 gap-20px">
		{#each featuredSkills as skill, index (skill.slug)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<a
				href={`${base}/skills/${skill.slug}`}
				bind:this={skillElements[index]}
				onmousemove={(ev) => onHover(ev, index)}
				class="featured-skill-card decoration-none border-1px border-solid border-[var(--border)] rounded-15px relative duration transition-all hover:border-[var(--border-hover)]"
			>
				<div class="card-bg col-center gap-15px p-25px rounded-15px">
					<div
						class="skill-icon-wrapper flex items-center justify-center w-70px h-70px rounded-full bg-[var(--main)] border-1px border-[var(--border)] transition-all"
					>
						<img
							src={getAssetURL(skill.logo)}
							alt={skill.name}
							class="w-45px h-45px object-contain"
							loading="eager"
						/>
					</div>
					<span class="text-sm text-[var(--main-text)] font-semibold text-center">
						{skill.name}
					</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.featured-skill-card {
		--border-color: transparent;
		--bg-color: transparent;
		--drop-color: transparent;
		--drop-x: 0;
		--drop-y: 0;

		background: linear-gradient(90deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%);
		cursor: pointer;
	}

	.card-bg {
		&:hover {
			background-color: var(--bg-color);
			background-image: radial-gradient(
				circle at var(--drop-x) var(--drop-y),
				var(--drop-color),
				transparent
			);
		}
	}

	.skill-icon-wrapper {
		transition: all 0.3s ease;
	}
</style>
