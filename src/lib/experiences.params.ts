import type { Experience, Skill, Asset, Link } from './types';
import { ContractType } from './types';
import Colors from './data/colors';
import Assets from './data/assets';
import { getSkills } from './skills.params';
import experiencesData from './data/experiences.json';

type ColorKey = keyof typeof Colors;
type AssetKey = keyof typeof Assets;
type ContractKey = keyof typeof ContractType;

type RawExperience = {
	slug: string;
	company: string;
	description: string;
	contract: ContractKey | ContractType | string;
	type: string;
	location: string;
	period: {
		from: string;
		to?: string;
	};
	skills: Array<string>;
	name: string;
	color: ColorKey | string;
	links?: Array<Link>;
	logo: AssetKey | string;
	shortDescription: string;
	no: number;
};

const toDate = (value: string | undefined): Date | undefined => {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.valueOf()) ? undefined : date;
};

const toColor = (value: RawExperience['color']): string => {
	return (
		(Colors as Record<string, string>)[value] ?? (typeof value === 'string' ? value : Colors.Blue)
	);
};

const toAsset = (value: RawExperience['logo']): Asset => {
	return (Assets as Record<string, Asset>)[value] ?? Assets.Unknown;
};

const toSkills = (skillSlugs: Array<string>): Array<Skill> => {
	if (!skillSlugs.length) return [];
	const resolved = getSkills(...skillSlugs);
	return skillSlugs
		.map((slug) => resolved.find((skill) => skill.slug === slug))
		.filter((skill): skill is Skill => Boolean(skill));
};

const toContractType = (value: RawExperience['contract']): ContractType => {
	if ((ContractType as Record<string, ContractType>)[value as ContractKey]) {
		return (ContractType as Record<string, ContractType>)[value as ContractKey];
	}

	const match = (Object.entries(ContractType) as Array<[ContractKey, ContractType]>).find(
		([, contractValue]) => contractValue === value
	);

	return match ? match[1] : ContractType.FullTime;
};

const MY_EXPERIENCES: Array<Experience> = (experiencesData as Array<RawExperience>).map(
	(experience) => ({
		slug: experience.slug,
		company: experience.company,
		description: experience.description,
		contract: toContractType(experience.contract),
		type: experience.type,
		location: experience.location,
		period: {
			from: toDate(experience.period.from) ?? new Date(),
			...(experience.period.to ? { to: toDate(experience.period.to) } : {})
		},
		skills: toSkills(experience.skills),
		name: experience.name,
		color: toColor(experience.color),
		links: experience.links ?? [],
		logo: toAsset(experience.logo),
		shortDescription: experience.shortDescription,
		no: experience.no
	})
);

export default MY_EXPERIENCES;
