import type { AssetPath } from '$app/types';
import { MY_EDUCATIONS } from './educations.params';
import MY_EXPERIENCES from './experiences.params';
import MY_PROJECTS from './projects.params';
import MY_SKILLS from './skills.params';
import {
	Platform,
	type HomePageParams,
	type ProjectPageParams,
	type ExperiencePageParams,
	type SkillsPageParams,
	type ResumePageParams,
	type SearchPageParams,
	type EducationPageParams,
	type SiteConfig,
	type SiteMetadata
} from './types';
import rawSiteConfig from './data/site.json';

type RawHomeLink = {
	platform: string;
	link: string;
};

const siteConfig = rawSiteConfig as SiteConfig;

const toPlatform = (platform: string): Platform => {
	switch (platform.toLowerCase()) {
		case Platform.GitHub:
			return Platform.GitHub;
		case Platform.Linkedin:
			return Platform.Linkedin;
		case Platform.StackOverflow:
			return Platform.StackOverflow;
		case Platform.Facebook:
			return Platform.Facebook;
		case Platform.Email:
			return Platform.Email;
		case Platform.Twitter:
			return Platform.Twitter;
		case Platform.Youtube:
			return Platform.Youtube;
		default:
			return Platform.Email;
	}
};

export const SITE_METADATA: SiteMetadata = siteConfig.metadata ?? {};

export const TITLE_SUFFIX = siteConfig.titleSuffix;

export const NavBar = siteConfig.navBar;

export const HOME: HomePageParams = {
	title: siteConfig.home.title,
	name: siteConfig.home.name,
	lastName: siteConfig.home.lastName,
	role: siteConfig.home.role,
	location: siteConfig.home.location,
	headline: siteConfig.home.headline,
	intro: siteConfig.home.intro,
	description: siteConfig.home.description,
	links: (siteConfig.home.links as Array<RawHomeLink>).map((link) => ({
		platform: toPlatform(link.platform),
		link: link.link
	})),
	spotlight: siteConfig.home.spotlight,
	highlights: siteConfig.home.highlights,
	principles: siteConfig.home.principles,
	sideProject: siteConfig.home.sideProject
};

export const PROJECTS: ProjectPageParams = {
	title: siteConfig.projects.title,
	description: siteConfig.projects.description,
	items: MY_PROJECTS
};

export const EXPERIENCES: ExperiencePageParams = {
	title: siteConfig.experiences.title,
	description: siteConfig.experiences.description,
	items: MY_EXPERIENCES
};

export const SKILLS: SkillsPageParams = {
	title: siteConfig.skills.title,
	description: siteConfig.skills.description,
	items: MY_SKILLS
};

export const RESUME: ResumePageParams = {
	title: siteConfig.resume.title,
	description: siteConfig.resume.description,
	// site.json stores the file name as a plain string. It names a file in static/.
	item: siteConfig.resume.item as AssetPath
};

export const SEARCH: SearchPageParams = {
	title: siteConfig.search.title,
	description: siteConfig.search.description
};

export const EDUCATION: EducationPageParams = {
	items: MY_EDUCATIONS,
	title: siteConfig.education.title,
	description: siteConfig.education.description
};
