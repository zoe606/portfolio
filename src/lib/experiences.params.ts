import Assets from './data/assets';
import Colors from './data/colors';
import { getSkills } from './skills.params';
import { ContractType, type Experience, type Link } from './types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'luce-fullstack',
		company: 'Luce Maintenance Group Pte Ltd',
		description:
			'Led backend scalability, security, and refactoring initiatives across a large monolithic system composed of multiple components. Authored and standardized technical documentation for all core components, improving developer onboarding and maintainability. Boosted test coverage from 26% (Jan) to 77% (Jul) through systematic testing with RSpec & VCR. Upgraded Rails 7.0 → 7.2 safely by addressing transaction rollback, encryption, and dependency issues. Improved dependency freshness: Backend 26% → 83%, Frontend 25% → 78%. Reduced operational errors and improved performance metrics across key systems. Proactively monitored application health using Sentry and New Relic. Contributed frontend and mobile features using React and React Native.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Hybrid, Singapore-based',
		period: { from: new Date(2025, 0, 1) },
		skills: getSkills('ruby', 'ruby-on-rails', 'reactjs', 'pgsql', 'redis', 'docker', 'git'),
		name: 'Full-stack Engineer',
		color: Colors.Blue,
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Leading backend scalability and security initiatives',
		no: 1
	},
	{
		slug: 'privy-backend',
		company: 'PrivyID',
		description:
			'Designed and deployed a high-throughput wallet ID generator in Go, cutting generation time from 2 hours to 5 minutes using goroutines and distributed workers. Maintained wallet service handling heavy production load, ensuring reliability and fault tolerance. Improved legacy Ruby codebases for performance and maintainability. Monitored Datadog dashboards and alerts for real-time observability. Collaborated with cross-functional teams to align engineering deliverables with product goals.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Onsite, Indonesia-based',
		period: { from: new Date(2023, 0, 1), to: new Date(2024, 10, 1) },
		skills: getSkills(
			'go',
			'ruby',
			'ruby-on-rails',
			'kafka',
			'mongo-db',
			'mysql',
			'pgsql',
			'grpc',
			'redis'
		),
		name: 'Backend Engineer',
		color: Colors.Red,
		links: [],
		logo: Assets.Privy,
		shortDescription: 'High-throughput wallet ID generator and service maintenance',
		no: 2
	},
	{
		slug: 'dev-team-lead',
		company: "Citraraya Nusatama (D'Health)",
		description:
			'Led a team of 5 engineers to build and maintain a hospital information system used by 10+ hospitals. Conducted regular code reviews, mentorship, and technical planning sessions. Standardized engineering practices, reducing delivery delays and improving code quality. Collaborated with QA and product teams to meet feature delivery targets.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Hybrid, Indonesia',
		period: { from: new Date(2021, 0, 1), to: new Date(2022, 11, 31) },
		skills: getSkills(
			'js',
			'html',
			'css',
			'jquery',
			'php',
			'yii2',
			'docker',
			'redis',
			'mysql',
			'pgsql'
		),
		name: 'Development Team Lead',
		color: '#ffffff',
		links: [],
		logo: Assets.Dhealth,
		shortDescription: 'Led team of 5 engineers building hospital information system',
		no: 3
	},
	{
		slug: 'web-developer',
		company: 'Docotel Teknologi',
		description:
			'Developed HIS modules using GatsbyJS (React) and Vue. Integrated national healthcare systems — BPJS, eKlaim, SatuSehat — into hospital platforms. Built internal mobile apps and accounting modules. Contributed to SATPAS (SIM Administration System) under agile workflows.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Onsite, Indonesia',
		period: { from: new Date(2019, 3, 1), to: new Date(2021, 0, 1) },
		skills: getSkills(
			'js',
			'html',
			'css',
			'jquery',
			'php',
			'yii2',
			'reactjs',
			'vuejs',
			'docker',
			'redis',
			'mysql',
			'pgsql'
		),
		name: 'Web Developer',
		color: '#ffffff',
		links: [],
		logo: Assets.Docotel,
		shortDescription: 'Developed HIS modules and integrated national healthcare systems',
		no: 4
	},
	{
		slug: 'internship',
		company: 'Docotel Teknologi',
		description:
			'Revamp website dhealth with modern framework javascript, integration accouting system with dhealth',
		contract: ContractType.Internship,
		type: 'Software Development',
		location: 'Bandung, West Java',
		period: { from: new Date(2019, 0, 1), to: new Date(2019, 3, 4) },
		skills: getSkills('reactjs', 'js', 'laravel', 'html', 'css'),
		name: 'Internship',
		color: '#ffffff',
		links: [{ to: 'https://www.dhealth.co.id/', label: 'Dhealth', newTab: true }],
		logo: Assets.Docotel,
		shortDescription: 'Revamp website dhealth with modern framework javascript ',
		no: 5
	},
	{
		slug: 'software-freelance',
		company: 'Self-employed',
		description:
			"As a Freelancer, I am passionate about creating exceptional custom applications that cater to the unique needs of my clients. With a focus on innovation and user-centric design, I specialize in crafting cutting-edge solutions. I've been delivering outstanding software development services since January 2019. As a dedicated professional, I take pride in transforming ideas into functional and visually stunning applications that exceed client expectations.",
		contract: ContractType.Freelance,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2019, 0, 1) },
		skills: getSkills(
			'svelte',
			'ts',
			'sass',
			'css',
			'html',
			'js',
			'vuejs',
			'reactjs',
			'php',
			'laravel'
		),
		name: 'Freelancer',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Creating awesome applications for customers.',
		no: 6
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
