import type { Education, Asset } from './types';
import Assets from './data/assets';
import educationsData from './data/educations.json';

type AssetKey = keyof typeof Assets;

type RawEducation = {
	degree: string;
	description: string;
	location: string;
	logo: AssetKey | string;
	name: string;
	organization: string;
	period: {
		from: string;
		to?: string;
	};
	shortDescription: string;
	slug: string;
	subjects: Array<string>;
};

const toDate = (value: string | undefined): Date | undefined => {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.valueOf()) ? undefined : date;
};

const toAsset = (value: RawEducation['logo']): Asset => {
	return (Assets as Record<string, Asset>)[value] ?? Assets.Unknown;
};

export const MY_EDUCATIONS: Array<Education> = (educationsData as Array<RawEducation>).map(
	(education) => ({
		degree: education.degree,
		description: education.description,
		location: education.location,
		logo: toAsset(education.logo),
		name: education.name,
		organization: education.organization,
		period: {
			from: toDate(education.period.from) ?? new Date(),
			...(education.period.to ? { to: toDate(education.period.to) } : {})
		},
		shortDescription: education.shortDescription,
		slug: education.slug,
		subjects: education.subjects
	})
);
