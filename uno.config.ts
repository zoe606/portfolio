import extractorSvelte from '@unocss/extractor-svelte';
import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
	extractors: [extractorSvelte()],
	presets: [
		presetUno(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		})
	],
	theme: {
		// The font files load from the Google Fonts <link> in src/app.html.
		fontFamily: {
			sans: "'IBM Plex Sans', system-ui, sans-serif",
			display: "'Space Grotesk', system-ui, sans-serif",
			mono: "'IBM Plex Mono', ui-monospace, monospace"
		},
		// Blueprint tokens from src/lib/index.scss, e.g. `text-bp-ink`, `border-bp-line`.
		colors: {
			bp: {
				bg: 'var(--bp-bg)',
				grid: 'var(--bp-grid)',
				surface: 'var(--bp-surface)',
				surface2: 'var(--bp-surface-2)',
				ink: 'var(--bp-ink)',
				muted: 'var(--bp-muted)',
				line: 'var(--bp-line)',
				accent: 'var(--bp-accent)',
				onaccent: 'var(--bp-on-accent)',
				inverse: 'var(--bp-inverse)',
				oninverse: 'var(--bp-on-inverse)',
				oninversemuted: 'var(--bp-on-inverse-muted)'
			}
		}
	},
	shortcuts: [
		{
			col: 'flex flex-col',
			row: 'flex flex-row',

			'col-center': 'col justify-center items-center',
			'row-center': 'row justify-center items-center',

			'bp-container': 'mx-auto w-full max-w-1120px px-6'
		}
	]
});
