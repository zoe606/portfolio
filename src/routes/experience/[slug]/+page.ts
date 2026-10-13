import { error } from '@sveltejs/kit';
import MY_EXPERIENCES from '#lib/experiences.params.js';
import type { PageLoad } from './$types';

export const prerender = true;

const ordered = MY_EXPERIENCES.toSorted((a, b) => a.no - b.no);

export const load: PageLoad = ({ params }) => {
	const index = ordered.findIndex((item) => item.slug === params.slug);
	if (index === -1) error(404, 'Experience not found');

	return {
		experience: ordered[index],
		previous: ordered[index - 1],
		next: ordered[index + 1]
	};
};
