import MY_EXPERIENCES from '$lib/experiences.params';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	if (params.slug) {
		const experience = MY_EXPERIENCES.find((item) => {
			return item.slug === params.slug;
		});

		return { experience };
	}

	return { experience: undefined };
};
