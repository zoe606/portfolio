import { EXPERIENCES, PROJECTS, SITE_METADATA, SKILLS } from '#lib/params.js';

export const prerender = true;

// The search page is left out because it has no content of its own.
const PAGES = ['', 'projects', 'experience', 'skills', 'education', 'resume'];

export const GET = () => {
	const paths = [
		...PAGES,
		...PROJECTS.items.map((item) => `projects/${item.slug}`),
		...EXPERIENCES.items.map((item) => `experience/${item.slug}`),
		...SKILLS.items.map((item) => `skills/${item.slug}`)
	];
	const urls = paths.map((path) => `<url><loc>${SITE_METADATA.baseUrl}/${path}</loc></url>`);

	return new Response(
		'<?xml version="1.0" encoding="UTF-8"?>\n' +
			`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
