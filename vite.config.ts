import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { imagetools } from 'vite-imagetools';

const config: UserConfig = {
	plugins: [
		UnoCSS(),
		imagetools({
			// Default directives applied to all images
			defaultDirectives: (url) => {
				// Only apply to images in the static folder
				if (url.searchParams.has('imagetools')) {
					return new URLSearchParams({
						format: 'webp;avif;jpg', // Generate multiple formats
						quality: '80', // Good balance of quality/size
						w: '400;800;1200' // Generate responsive sizes
					});
				}
				return new URLSearchParams();
			}
		}),
		sveltekit()
	]
};

export default config;
