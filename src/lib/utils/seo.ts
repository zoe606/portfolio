import { EXPERIENCES, HOME, SITE_METADATA, TITLE_SUFFIX } from '#lib/params.js';
import { ContractType, Platform } from '#lib/types.js';
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

/**
 * A script tag with schema.org Person data for the home page, so search engines can show who
 * the site is about. "<" is escaped so the data cannot end the script tag early.
 */
export const buildPersonJsonLd = (): string => {
	const currentJob = EXPERIENCES.items.find(
		(item) => item.contract === ContractType.FullTime && !item.period.to
	);
	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: `${HOME.name} ${HOME.lastName}`,
		jobTitle: HOME.role,
		description: SITE_METADATA.defaultDescription,
		url: createAbsoluteUrl('/'),
		homeLocation: { '@type': 'Place', name: HOME.location },
		...(currentJob && { worksFor: { '@type': 'Organization', name: currentJob.company } }),
		sameAs: HOME.links.filter((link) => link.platform !== Platform.Email).map((link) => link.link)
	};
	const json = JSON.stringify(person).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
};
