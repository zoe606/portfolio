import Assets from './data/assets';
import Colors from './data/colors';
import { getSkills } from './skills.params';
import { ContractType, type Experience , type Link} from './types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'privy-backend',
		company: 'Privy',
		// description:
		// 	'focus on backend development to crafting high availabelty services with golang.maintaning old services with ruby to bugfixing or develop new feature. disscuss and fixing current obstacle and etc',
		description:
			'As a Backend Engineer at Privy, I spearheaded the development of high-availability services, leveraging the power of Golang to craft robust solutions. My responsibilities extended to maintaining legacy services using Ruby, addressing bugs, and seamlessly integrating new features. Engaging in collaborative discussions, I proactively tackled obstacles, ensuring smooth workflows and optimal performance. I contribute to the dynamic landscape of software development, driving innovation and excellence.',

		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Yogyakarta, Central Java',
		period: { from: new Date(2023, 0, 1) },
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
		logo: Assets.Unknown,
		shortDescription: ''
	},
	{
		slug: 'dev-team-lead',
		company: 'Citraya Nusatama (Dhealth)',
		// description:
		// 	'in this my role i learn a new a lot things becauese in this role i ploted as new team lead development some teams, the new skill not only in my programming skill but other skill wich required to my current job desc. like managing team development flow. pairing and reviewing code. review team perfomance and finding solution if the perfomnace team was bad or make strategies to make perfomance team is stable. preapre task and flow to develop new feature to my teams',
		description:
			"As a Dev Team Lead at Citraya Nusatama (Dhealth), I embarked on a transformative journey that enriched not only my technical prowess but also my leadership skills. Entrusted with the responsibility of leading dynamic development teams, I navigated challenges with a holistic approach. Beyond coding, my role extended to managing the team's development flow, fostering collaboration through pair programming, and ensuring code quality through thorough reviews. Proactively assessing team performance, I implemented strategic solutions to enhance productivity and stability. Task preparation and workflow optimization were key facets of my role, empowering my teams to efficiently tackle new features and challenges.",
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Bandung, West Java',
		period: { from: new Date(2021, 0, 1), to: new Date(2022, 12, 4) },
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
		name: 'Team Lead Development',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: ''
	},
	{
		slug: 'web-developer',
		company: 'Docotel Teknologi',
		description:
			'As a Web Developer at Docotel Teknologi, I played a pivotal role in crafting innovative solutions to meet diverse challenges. My responsibilities included developing a robust Accounting System, creating both front-end and back-end components for the cutting-edge dhealth system, and seamlessly integrating existing hospital systems with dhealth. I excelled in connecting dhealth with essential 3rd party systems such as BPJS, Eklaim, and SatuSehat Kemenkes. Additionally, I spearheaded the development of APIs tailored for mobile apps, ensuring optimal user experiences. My approach to project implementation was dynamic and efficient, employing Agile methodologies with either Scrum or Kanban.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Bandung, West Java',
		period: { from: new Date(2019, 3, 1), to: new Date(2021, 0, 4) },
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
		name: 'Web Developer',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown,
		shortDescription: ''
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
		logo: Assets.Unknown,
		shortDescription: 'Revamp website dhealth with modern framework javascript '
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
		shortDescription: 'Creating awesome applications for customers.'
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
