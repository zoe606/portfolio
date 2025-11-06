import type { Asset } from '$lib/types';
import { currentTheme } from '$lib/stores/theme';
import { base } from '$app/paths';

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
	iate1: a('iate-1.webp'),
	iate2: a('iate-2.jpg'),
	iate3: a('iate-3.jpg'),
	iate4: a('iate-4.jpg'),
	iate5: a('iate-5.jpg'),
	mp1: a('mp1.png'),
	mp2: a('mp2.png'),
	mp3: a('mp3.png'),
	mp4: a('mp4.png'),
	mp5: a('mp5.png')
};

export default Screenshoot;

let theme: string = 'light';

currentTheme.subscribe((v) => (theme = v));

export const getScrenshootURL = (asset: Asset): string => {
	const isDark = theme === 'dark' || theme === 'synthwave' || theme === 'terminal';
	return typeof asset === 'string' ? asset : isDark ? asset.dark : asset.light;
};
