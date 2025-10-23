import type { Skill, Asset } from './types';
import Colors from './data/colors';
import Assets from './data/assets';
import skillsData from './data/skills.json';

type ColorKey = keyof typeof Colors;
type AssetKey = keyof typeof Assets;

type RawSkill = {
	slug: string;
	color: ColorKey | string;
	description: string;
	logo: AssetKey | string;
	name: string;
};

const toColor = (value: RawSkill['color']): string => {
	return (
		(Colors as Record<string, string>)[value] ?? (typeof value === 'string' ? value : Colors.Blue)
	);
};

const toAsset = (value: RawSkill['logo']): Asset => {
	return (Assets as Record<string, Asset>)[value] ?? Assets.Unknown;
};

const MY_SKILLS: Array<Skill> = (skillsData as Array<RawSkill>).map((skill) => ({
	slug: skill.slug,
	color: toColor(skill.color),
	description: skill.description,
	logo: toAsset(skill.logo),
	name: skill.name
}));

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));
