import { error } from '@sveltejs/kit';
import MY_PROJECTS from '#lib/projects.params.js';
import type { PageLoad } from './$types';

export const prerender = true;

const ordered = MY_PROJECTS.toSorted((a, b) => a.no - b.no);

export const load: PageLoad = ({ params }) => {
	const index = ordered.findIndex((item) => item.slug === params.slug);
	if (index === -1) error(404, 'Project not found');

	return {
		project: ordered[index],
		previous: ordered[index - 1],
		next: ordered[index + 1]
	};
};
