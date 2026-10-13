import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';

const base = '/portfolio';

const config: UserConfig = {
	plugins: [
		UnoCSS(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({
				fallback: '404.html',
				pages: 'build',
				assets: 'build'
			}),
			paths: { base: process.env.NODE_ENV === 'production' ? base : '' }
		})
	]
};

export default config;
