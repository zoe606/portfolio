import { SITE_METADATA, TITLE_SUFFIX } from '$lib/params';
import { useTitle } from './helpers';

type SEOType = 'website' | 'article';

export interface PageSEO {
	title: string;
	description: string;
	canonical?: string;
	og: {
		title: string;
		description: string;
		type: SEOType;
		url?: string;
		siteName?: string;
		image?: string;
	};
	twitter: {
		card: 'summary' | 'summary_large_image';
		title: string;
		description: string;
		image?: string;
		site?: string;
		creator?: string;
	};
}

const trimTrailingSlash = (value: string): string => {
	if (value.endsWith('/')) {
		return value.slice(0, -1);
	}
	return value;
};

const normalisePath = (path?: string): string => {
	if (!path) return '/';
	return path.startsWith('/') ? path : `/${path}`;
};

const createAbsoluteUrl = (path?: string): string | undefined => {
	if (!SITE_METADATA.baseUrl) return undefined;
	const base = trimTrailingSlash(SITE_METADATA.baseUrl);
	const normalised = normalisePath(path);
	return `${base}${normalised === '/' ? '/' : normalised}`;
};

const createAbsoluteImage = (image?: string): string | undefined => {
	const candidate = image ?? SITE_METADATA.defaultImage;
	if (!candidate) return undefined;
	if (/^https?:\/\//i.test(candidate)) return candidate;
	return createAbsoluteUrl(candidate) ?? candidate;
};

interface BuildPageSEOOptions {
	title: string;
	description?: string;
	path?: string;
	type?: SEOType;
	image?: string;
}

export const buildPageSEO = ({
	title,
	description,
	path,
	type = 'website',
	image
}: BuildPageSEOOptions): PageSEO => {
	const resolvedDescription = description ?? SITE_METADATA.defaultDescription ?? '';

	const canonical = createAbsoluteUrl(path);
	const absoluteImage = createAbsoluteImage(image);
	const metaTitle = useTitle(title, TITLE_SUFFIX);

	return {
		title: metaTitle,
		description: resolvedDescription,
		canonical,
		og: {
			title: metaTitle,
			description: resolvedDescription,
			type,
			url: canonical,
			siteName: SITE_METADATA.siteName ?? TITLE_SUFFIX,
			image: absoluteImage
		},
		twitter: {
			card: absoluteImage ? 'summary_large_image' : 'summary',
			title: metaTitle,
			description: resolvedDescription,
			image: absoluteImage,
			site: SITE_METADATA.twitterHandle,
			creator: SITE_METADATA.twitterHandle
		}
	};
};
