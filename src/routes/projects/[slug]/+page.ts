import MY_PROJECTS from '$lib/projects.params';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	if (params.slug) {
		const project = MY_PROJECTS.find((item) => {
			return item.slug === params.slug;
		});

		return { project };
	}

	return { project: undefined };
};
