import type { Asset } from '$lib/types';
import { theme } from '$lib/stores/theme';
import { base } from '$app/paths';

const gh = (file: string) => `${base}/logos/${file}`;
const ss = (file: string) => `${base}/ss/${file}`;

const a = (light: string, dark?: string): Asset =>
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
};

export default Screenshoot;

let currentTheme: boolean;

theme.subscribe((v) => (currentTheme = v));

export const getScrenshootURL = (asset: Asset): string => {
	return typeof asset === 'string' ? asset : currentTheme ? asset.dark : asset.light;
};