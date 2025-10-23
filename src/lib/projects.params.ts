import type { Project, Skill, Asset } from './types';
import Colors from './data/colors';
import Assets from './data/assets';
import Screenshoot from './data/screenshoot';
import { getSkills } from './skills.params';
import projectsData from './data/projects.json';

type ColorKey = keyof typeof Colors;
type AssetKey = keyof typeof Assets;
type ScreenshotKey = keyof typeof Screenshoot;

type RawProject = {
	no: number;
	slug: string;
	color: ColorKey | string;
	description: string;
	shortDescription: string;
	links: Array<{
		label: string;
		to: string;
		newTab?: boolean;
	}>;
	logo: AssetKey | string;
	name: string;
	period: {
		from: string;
		to?: string;
	};
	skills: Array<string>;
	type: string;
	screenshots?: Array<{
		label?: string;
		src: ScreenshotKey | string;
	}>;
};

const toDate = (value: string | undefined): Date | undefined => {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.valueOf()) ? undefined : date;
};

const toAsset = (key: AssetKey | string): Asset => {
	return (Assets as Record<string, Asset>)[key] ?? Assets.Unknown;
};

const toColor = (key: ColorKey | string): string => {
	return (Colors as Record<string, string>)[key] ?? (typeof key === 'string' ? key : Colors.Blue);
};

const toSkills = (skillSlugs: Array<string>): Array<Skill> => {
	if (!skillSlugs.length) return [];
	const resolved = getSkills(...skillSlugs);
	// Preserve ordering provided in JSON and fall back to placeholder skills when missing.
	return skillSlugs
		.map((slug) => resolved.find((skill) => skill.slug === slug))
		.filter((skill): skill is Skill => Boolean(skill));
};

const toScreenshots = (items: RawProject['screenshots']): Project['screenshots'] => {
	if (!items?.length) return [];
	return items.map((item) => {
		const src = (Screenshoot as Record<string, Asset>)[item.src] ?? (item.src as unknown as Asset);
		return {
			label: item.label ?? '',
			src
		};
	});
};

const MY_PROJECTS: Array<Project> = (projectsData as Array<RawProject>).map((project) => ({
	no: project.no,
	slug: project.slug,
	color: toColor(project.color),
	description: project.description,
	shortDescription: project.shortDescription,
	links: project.links ?? [],
	logo: toAsset(project.logo),
	name: project.name,
	period: {
		from: toDate(project.period.from) ?? new Date(),
		...(project.period.to ? { to: toDate(project.period.to) } : {})
	},
	skills: toSkills(project.skills),
	type: project.type,
	screenshots: toScreenshots(project.screenshots)
}));

export default MY_PROJECTS;
