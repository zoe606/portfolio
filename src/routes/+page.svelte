<script lang="ts">
	import Icon from '$lib/components/Icon/Icon.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import HomeSection from '$lib/components/HomeSection.svelte';
	import EnhancedStatsCard from '$lib/components/EnhancedStatsCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
	import FeaturedSkills from '$lib/components/FeaturedSkills.svelte';
	import { HOME, getPlatfromIcon, PROJECTS, EXPERIENCES } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import { capitalize, isBlank } from '$lib/utils/helpers';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import './+page.css';

	const { description, lastName, links, name, title } = HOME;

	// Get featured projects (top 3 most recent)
	const featuredProjects = PROJECTS.items
		.sort((a, b) => {
			const dateA = a.period.to || new Date();
			const dateB = b.period.to || new Date();
			return dateB.getTime() - dateA.getTime();
		})
		.slice(0, 3);

	// Get latest experiences (top 2 most recent)
	const latestExperiences = EXPERIENCES.items
		.sort((a, b) => {
			const dateA = a.period.to || new Date();
			const dateB = b.period.to || new Date();
			return dateB.getTime() - dateA.getTime();
		})
		.slice(0, 2);

	// Calculate stats
	const totalProjects = PROJECTS.items.length;
	const totalExperiences = EXPERIENCES.items.length;
	const totalSkills = MY_SKILLS.length;

	// Calculate years of experience
	const firstExperience = EXPERIENCES.items.reduce((oldest, exp) => {
		return exp.period.from < oldest.period.from ? exp : oldest;
	}, EXPERIENCES.items[0]);
	const yearsOfExperience = new Date().getFullYear() - firstExperience.period.from.getFullYear();

	const isEmail = (email: string): boolean => {
		const reg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return !isBlank(email) && reg.test(email);
	};
</script>

<TabTitle {title} {description} path="/" />

<div
	class="col self-center flex-1 w-full max-w-screen-xl m-x-auto p-x-20px p-y-40px gap-60px homepage-container"
>
	<!-- Hero Section -->
	<div class="col gap-25px items-center text-center max-w-4xl m-x-auto hero-section">
		<MainTitle classes="text-center hero-title">{name} {lastName}</MainTitle>
		<p
			class="text-[var(--secondary-text)] text-center text-[1.15em] font-light leading-relaxed max-w-3xl hero-description"
		>
			{description}
		</p>
		<div class="row justify-center p-y-10px gap-15px flex-wrap social-links">
			{#each links as link (link.platform)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a
					class="decoration-none flex items-center gap-8px p-x-20px p-y-10px rounded-lg bg-[var(--main-hover)] border-1px border-[var(--border)] hover:border-[var(--border-hover)] transition-all social-link"
					href={`${isEmail(link.link) ? 'mailto:' : ''}${link.link}`}
					target="_blank"
					rel="noreferrer"
				>
					<Icon icon={getPlatfromIcon(link.platform)} color="var(--secondary-text)" size="18px" />
					<p class="text-sm text-[var(--secondary-text)] font-medium social-link-text">
						{capitalize(link.platform)}
					</p>
				</a>
			{/each}
		</div>
	</div>

	<!-- Stats Section -->
	<HomeSection title="At a Glance">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-20px stats-grid">
			<EnhancedStatsCard
				value="{yearsOfExperience}+"
				label="Years"
				subtitle="Experience"
				href="/experience"
				color="#3b82f6"
			/>
			<EnhancedStatsCard
				value={totalProjects}
				label="Projects"
				subtitle="Built"
				href="/projects"
				color="#8b5cf6"
			/>
			<EnhancedStatsCard
				value={totalExperiences}
				label="Companies"
				subtitle="Worked With"
				href="/experience"
				color="#10b981"
			/>
			<EnhancedStatsCard
				value="{totalSkills}+"
				label="Technologies"
				subtitle="Used"
				href="/skills"
				color="#f59e0b"
			/>
		</div>
	</HomeSection>

	<!-- Featured Skills -->
	<FeaturedSkills skills={MY_SKILLS} />

	<!-- Featured Projects Section -->
	<HomeSection title="Featured Projects" href="/projects">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20px projects-grid">
			{#each featuredProjects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</HomeSection>

	<!-- Latest Experience Section -->
	<HomeSection title="Recent Experience" href="/experience">
		<div class="col gap-20px">
			{#each latestExperiences as experience (experience.slug)}
				<ExperienceCard {experience} />
			{/each}
		</div>
	</HomeSection>
</div>
