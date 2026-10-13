import { error } from '@sveltejs/kit';
import MY_SKILLS from '#lib/skills.params.js';
import MY_PROJECTS from '#lib/projects.params.js';
import MY_EXPERIENCES from '#lib/experiences.params.js';
import type { PageLoad } from './$types';

export const prerender = true;

const uses = (slug: string) => (item: { skills: Array<{ slug: string }> }) =>
	item.skills.some((skill) => skill.slug === slug);

export const load: PageLoad = ({ params }) => {
	const skill = MY_SKILLS.find((item) => item.slug === params.slug);
	if (!skill) error(404, 'Skill not found');

	return {
		skill,
		projects: MY_PROJECTS.filter(uses(skill.slug)).toSorted((a, b) => a.no - b.no),
		experiences: MY_EXPERIENCES.filter(uses(skill.slug)).toSorted((a, b) => a.no - b.no)
	};
};
