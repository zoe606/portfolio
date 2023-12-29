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
	type EducationPageParams
} from './types';
import { Icons } from './utils';

export const TITLE_SUFFIX = 'Slick template with Svelte';

export const NavBar = {
	home: 'Home',
	personal: 'Projects',
	career: 'Experiences',
	resume: 'Resume',
	skills: 'Skills',
	Education: 'Education'
};

export const getPlatfromIcon = (platform: Platform): Icons => {
	switch (platform) {
		case Platform.GitHub:
			return Icons.GitHub;
		case Platform.Linkedin:
			return Icons.LinkedIn;
		case Platform.StackOverflow:
			return Icons.StackOverflow;
		case Platform.Facebook:
			return Icons.Facebook;
		case Platform.Email:
			return Icons.Email;
		case Platform.Twitter:
			return Icons.Twitter;
		case Platform.Youtube:
			return Icons.Youtube;
	}
};

export const HOME: HomePageParams = {
	title: 'Home',
	name: 'Librantara',
	lastName: 'Erlangga',
	description: getDescription(2019), // Pass the start year of your experience
	// description:
	// 	'Innovative full-stack developer with 4+ years of experience, excelling in PHP, Golang, Ruby, and seamless third-party integrations. Proven track record with 10+ healthcare institutions adopting my solutions. Current role involves crafting and maintaining high-quality services, while my expertise continues to grow.',
	links: [
		{ platform: Platform.GitHub, link: 'https://github.com/zoe606'},
		{
			platform: Platform.Linkedin,
			link: 'https://www.linkedin.com/in/librantara-erlangga/'
		},
		{
			platform: Platform.Email,
			link: 'rive99erlangga@gmail.com'
		}
	]
};

function getDescription(startYear: number): string {
	const currentYear = new Date().getFullYear();
	const yearsOfExperience = currentYear - startYear;

	// Adjust the text based on the number of years
	const yearsText = yearsOfExperience === 1 ? '1 year' : `${yearsOfExperience} years`;

	return `Innovative full-stack developer with ${yearsText} of experience, excelling in PHP, Golang, Ruby, and seamless third-party integrations. Proven track record with 10+ healthcare institutions adopting my solutions. Current role involves crafting and maintaining high-quality services, while my expertise continues to grow.`;
}

export const PROJECTS: ProjectPageParams = {
	title: 'Projects',
	items: MY_PROJECTS
};

export const EXPERIENCES: ExperiencePageParams = {
	title: 'Experiences',
	items: MY_EXPERIENCES
};

export const SKILLS: SkillsPageParams = {
	title: 'Skills',
	items: MY_SKILLS
};

export const RESUME: ResumePageParams = {
	title: 'Resumé',
	item: ''
};

export const SEARCH: SearchPageParams = {
	title: 'Search'
};

export const EDUCATION: EducationPageParams = {
	items: MY_EDUCATIONS,
	title: 'Education'
};
