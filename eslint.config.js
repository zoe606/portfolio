import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		},
		rules: {
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-dom-manipulating': 'off',
			'svelte/no-at-html-tags': 'off'
		}
	},
	{
		files: ['**/*.svelte.ts'],
		languageOptions: {
			parser: tseslint.parser
		}
	},
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'dist/',
			'*.cjs',
			'.DS_Store',
			'node_modules',
			'/package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	}
];
