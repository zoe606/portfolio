export enum Platform {
	GitHub = 'github',
	StackOverflow = 'stackoverflow',
	Twitter = 'twitter',
	Linkedin = 'linkedin',
	Email = 'email',
	Facebook = 'facebook',
	Youtube = 'youtube'
}

export enum ContractType {
	FullTime = 'Full-time',
	PartTime = 'Part-time',
	SelfEmployed = 'Self-employed',
	Freelance = 'Freelance',
	Contract = 'Contract',
	Internship = 'Internship'
}

export type Asset = string | { light: string; dark: string };

export interface Item {
	slug: string;
	name: string;
	logo: Asset;
	shortDescription: string;
	description: string;
	screenshots?: Array<{ src: Asset; label: string }>;
}

export interface Link {
	to: string;
	label: string;
	newTab?: boolean;
}

export interface IconLink extends Link {
	icon: Asset;
}

export interface Skill extends Omit<Item, 'shortDescription'> {
	color: string;
}

export interface Color {
	color: string;
}

export interface Project extends Item {
	no: number;
	links: Array<Link>;
	color: string;
	period: {
		from: Date;
		to?: Date;
	};
	type: string;
	skills: Array<Skill>;
}

export interface Experience extends Project {
	company: string;
	location: string;
	contract: ContractType;
}

export interface Education extends Item {
	organization: string;
	location: string;
	period: {
		from: Date;
		to?: Date;
	};
	subjects: Array<string>;
	degree: string;
}

export interface PageParams {
	title: string;
	description?: string;
}

export interface PageWithSearchParams<T> extends PageParams {
	items: Array<T>;
}

export interface HomeLink {
	platform: Platform;
	link: string;
}

export interface HomePageParams extends PageParams {
	name: string;
	lastName: string;
	description: string;
	links: Array<HomeLink>;
	skills?: Array<Skill>;
}

export type SearchPageParams = PageParams;

export type ProjectPageParams = PageWithSearchParams<Project>;

export type ExperiencePageParams = PageWithSearchParams<Experience>;

export type EducationPageParams = PageWithSearchParams<Education>;

export type SkillsPageParams = PageWithSearchParams<Skill>;

export interface ResumePageParams extends PageParams {
	item: string;
}

export interface SiteMetadata {
	baseUrl?: string;
	siteName?: string;
	defaultDescription?: string;
	defaultImage?: string;
	twitterHandle?: string;
}

export interface SiteSectionConfig {
	title: string;
	description?: string;
}

export interface ResumeSectionConfig extends SiteSectionConfig {
	item: string;
}

export interface HomeConfig {
	title: string;
	name: string;
	lastName: string;
	description: string;
	links: Array<{ platform: string; link: string }>;
}

export interface SiteConfig {
	titleSuffix: string;
	metadata?: SiteMetadata;
	navBar: Record<string, string>;
	home: HomeConfig;
	projects: SiteSectionConfig;
	experiences: SiteSectionConfig;
	skills: SiteSectionConfig;
	resume: ResumeSectionConfig;
	search: SiteSectionConfig;
	education: SiteSectionConfig;
}
