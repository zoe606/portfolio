import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const base = '/portfolio';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html',
			pages: 'build',
			assets: 'build',
			minify: true
		}),

		paths: {
			base: process.env.NODE_ENV === 'production' ? base : ''
		},
	}
};

export default config;