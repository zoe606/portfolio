import Assets from './data/assets';
import { getSkills } from './skills.params';
import { ContractType, type Experience , type Link} from './types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'privy-backend',
		company: 'Privy',
		description: 'Creating awesome tools for developers.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Yogyakarta, Central Java',
		period: { from: new Date(2023, 0, 1) },
		skills: getSkills('go', 'ruby', 'ruby-on-rails', 'kafka', 'mongo-db', 'mysql', 'postgresql'),
		name: 'Backend Engineer',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: ''
	},
	{
		slug: 'dev-team-lead',
		company: 'Citraya Nusatama (Dhealth)',
		description: 'Creating awesome tools for developers.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Bandung, West Java',
		period: { from: new Date(2021, 0, 1), to: new Date(2022, 12, 4) },
		skills: getSkills('ts', 'js'),
		name: 'Team Lead Development',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: ''
	},
	{
		slug: 'web-developer',
		company: 'Docotel Teknologi',
		description: 'Creating awesome tools for developers.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Bandung, West Java',
		period: { from: new Date(2019, 3, 1), to: new Date(2021, 0, 4) },
		skills: getSkills('ts', 'js'),
		name: 'Web Developer',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: ''
	},
	{
		slug: 'internship',
		company: 'Docotel Teknologi',
		description: 'Revamp website dhealth with modern framework javascript, integration accouting system with dhealth',
		contract: ContractType.Internship,
		type: 'Software Development',
		location: 'Bandung, West Java',
		period: { from: new Date(2019, 0, 1), to: new Date(2019, 3, 4) },
		skills: getSkills('reactjs', 'js', 'laravel'),
		name: 'Internship',
		color: '#ffffff',
		links: [{ to: 'https://www.dhealth.co.id/', label: 'Dhealth', newTab: true }],
		logo: Assets.Unknown,
		shortDescription: 'Revamp website dhealth with modern framework javascript '
	},
	{
		slug: 'software-freelance',
		company: 'Self-employed',
		description: 'Creating awesome applications for customers.',
		contract: ContractType.Freelance,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2019, 0, 1) },
		skills: getSkills('svelte', 'ts', 'sass', 'css', 'html', 'js'),
		name: 'Freelancer',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: ''
	}
	// {
	// 	slug: 'software-freelance-junior',
	// 	company: 'Self-employed',
	// 	description: 'Creating awesome applications for customers.',
	// 	contract: ContractType.Freelance,
	// 	type: 'Software Development',
	// 	location: 'Home',
	// 	period: { from: new Date(2022, 0, 1), to: new Date() },
	// 	skills: getSkills('css', 'html', 'js'),
	// 	name: 'Junior Freelancer',
	// 	color: '#ffffff',
	// 	links: [],
	// 	logo: Assets.Unknown,
	// 	shortDescription: ''
	// }
];

export default MY_EXPERIENCES;
