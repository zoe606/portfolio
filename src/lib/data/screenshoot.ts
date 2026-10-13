import type { Asset } from '#lib/types.js';
import { theme } from '#lib/stores/theme.svelte.js';
import { asset } from '$app/paths';
import type { AssetPath } from '$app/types';

/**
 * File names in static/ss/. A missing file fails the type check.
 * `infer P` makes TypeScript check each path in the AssetPath union separately.
 */
type File = AssetPath extends infer P ? (P extends `ss/${infer Name}` ? Name : never) : never;

const ss = (file: File) => asset(`ss/${file}`);
const a = (light: File, dark?: File): Asset =>
	dark ? { dark: ss(dark), light: ss(light) } : ss(light);

const Screenshoot = {
	pgp1: a('pgp-1.webp'),
	pgp2: a('pgp-2.webp'),
	pgp3: a('pgp-3.webp'),
	pgp4: a('pgp-4.webp'),
	pgp5: a('pgp-5.webp'),
	ats1: a('aksel-1.webp'),
	ats2: a('aksel-2.webp'),
	ats3: a('aksel-3.webp'),
	ats4: a('aksel-4.webp'),
	ats5: a('aksel-5.webp'),
	std1: a('std-1.png'),
	uls1: a('uls-1.jpg'),
	bbh1: a('bbh-1.png'),
	iate1: a('iate-1.webp'),
	iate2: a('iate-2.jpg'),
	iate3: a('iate-3.jpg'),
	iate4: a('iate-4.jpg'),
	iate5: a('iate-5.jpg'),
	mp1: a('mp-1.webp'),
	mp2: a('mp-2.webp'),
	mp3: a('mp-3.webp'),
	mp4: a('mp-4.webp'),
	mp5: a('mp-5.webp')
};

export default Screenshoot;

// Reading theme.isDark here makes every template that calls this update when the theme changes.
export const getScrenshootURL = (asset: Asset): string =>
	typeof asset === 'string' ? asset : theme.isDark ? asset.dark : asset.light;
