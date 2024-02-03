import Assets from './data/assets';
import Screenshoot from './data/screenshoot';
import { getSkills } from './skills.params';
import type { Project } from './types';
import Colors from './data/colors';
import { addDaysToDate } from './utils';

const MY_PROJECTS: Array<Project> = [
	{
		no: 3,
		slug: 'privy-ocsaver',
		color: Colors.Orange,
		description:
			"As a new member of the Privy team, I played a pivotal role in CIMB Octo Saver's backend development, marking my first project with Privy. Assigned to design and implement the website's API using Ruby and Ruby on Rails, I successfully navigated the challenge within a tight 14-day timeframe. Despite being my debut at Privy, I leveraged my skills and collaborative spirit to contribute significantly to the project's success. The backend solution seamlessly integrates with CIMB Octo Saver, showcasing the effectiveness of our rapid and cohesive development approach.",
		shortDescription:
			'Embarked on my inaugural project at Privy as a backend engineer for CIMB Octo Saver. Designed and implemented the API within a challenging 14-day timeframe, showcasing my adaptability and collaborative skills as a new member of the team.',
		links: [],
		logo: Assets.Ocsaver,
		name: 'CIMB Octo Saver',
		period: {
			from: new Date(2023, 1, 1), // February 1, 2023
			to: addDaysToDate(new Date(2023, 1, 1), 14) // February 15, 2023 (14 days later)
		},
		skills: getSkills('ruby', 'ruby-on-rails', 'pgsql'),
		type: 'Landing Website'
	},
	{
		no: 1,
		slug: 'privy-core-middleware',
		color: Colors.Red,
		description:
			'As a Backend Engineer in the Privy Core Middleware team, I actively contributed to the development of new features, bug fixing, and enhancement of existing modules. Working on this core project presented unique challenges with its extensive set of modules and features, requiring a meticulous approach to ensure the integrity of the entire system. My role demanded a balance of innovation and precision to navigate the complexities and deliver high-quality solutions.',
		shortDescription:
			'Crafting innovative solutions for Privy Core Middleware, balancing precision in a complex landscape.',
		links: [],
		logo: Assets.Ruby,
		name: 'Glacier Middleware',
		period: {
			from: new Date(2023, 2, 1), // February 1, 2023
			to: new Date(2023, 8, 1) // February 15, 2023 (14 days later)
		},
		skills: getSkills('ruby', 'ruby-on-rails', 'pgsql', 'mongodb', 'kafka', 'redis', 'docker'),
		type: 'Middleware',
		screenshots: []
	},
	{
		no: 2,
		slug: 'privy-pgp-x-pgpf',
		color: Colors.Blue,
		description:
			'Leading the evolution of the Golf Scoring System, "PGPxPGPF," across four vital domains: CMS, Mobile Player, Mobile Caddy, and Livescore. Navigating complexities arising from non-standard code origins, a challenge gracefully embraced for seamless advancements.',
		shortDescription:
			'Guiding the Golf Scoring System "PGPxPGPF" through progressive enhancements, overcoming intricacies in non-standard code origins.',
		links: [],
		logo: Assets.Go,
		name: 'PGPxPGPF',
		period: {
			from: new Date(2023, 9, 1)
			// to:
		},
		skills: getSkills('go', 'mysql', 'docker', 'mongodb', 'kafka'),
		type: 'Golf Scoring System',
		screenshots: [
			{ label: '', src: Screenshoot.pgp1 },
			{ label: '', src: Screenshoot.pgp2 },
			{ label: '', src: Screenshoot.pgp3 },
			{ label: '', src: Screenshoot.pgp4 },
			{ label: '', src: Screenshoot.pgp5 }
		]
	},
	{
		no: 4,
		slug: 'privy-acceleration',
		color: Colors.Black,
		description:
			'Thrived in a transformative 3-month bootcamp at Privy—an intensive internal initiative. Delved deep into Golang, honed skills in microservices using the SAGA pattern, embraced technologies like gRPC, message brokers, and championed SOLID design principles. This journey, conducted bi-weekly after work hours, was a rich blend of insights and hands-on practices.',
		shortDescription:
			'Excelled in a 3-month intense bootcamp at Privy, where I mastered advanced Golang, microservices, and cutting-edge backend technologies, ensuring a solid foundation for professional growth.',
		links: [],
		logo: Assets.Go,
		name: 'Privy Acceleration',
		period: {
			from: new Date(2023, 3, 0), // February 1, 2023
			to: new Date(2023, 6, 1) // February 15, 2023 (14 days later)
		},
		skills: getSkills('go', 'docker', 'redis', 'kafka', 'grpc', 'pub/sub', 'rabbit-mq'),
		type: 'Skill Acceleration',
		screenshots: []
	},
	{
		no: 5,
		slug: 'privy-hirio-ats',
		color: Colors.Purple,
		description:
			"Championed the swift development of Hirio, an innovative Applicant Tracking System (ATS) uniquely designed for Privy. Within an ambitious one-month timeline, successfully integrated features such as digital signatures, email invitations, and real-time synchronization with Privy apps. Hirio not only serves Privy's internal needs but stands out with its multi-merchant functionality. This feature allows seamless onboarding of new companies, creating distinct user dashboards and landing pages automatically upon sale to another organization.",
		shortDescription:
			'Pioneered the creation of Hirio, a robust Applicant Tracking System (ATS), seamlessly integrated with Privy. Developed within a one-month timeframe, Hirio facilitates job posting, analytics, applicant tracking, and more. Its standout feature includes automatic dashboard and landing page creation for multiple merchants.',
		links: [],
		logo: Assets.Go,
		name: 'Hirio',
		period: {
			from: new Date(2023, 6, 1), // February 1, 2023
			to: new Date(2023, 7, 1) // February 15, 2023 (14 days later)
		},
		skills: getSkills('go', 'docker', 'redis', 'aws-s3', 'pub/sub'),
		type: 'ATS (Internal Tools)',
		screenshots: [
			{ label: '', src: Screenshoot.ats1 },
			{ label: '', src: Screenshoot.ats2 },
			{ label: '', src: Screenshoot.ats3 },
			{ label: '', src: Screenshoot.ats4 },
			{ label: '', src: Screenshoot.ats5 }
		]
	},
	{
		no: 6,
		slug: 'dhealth-hospital-information-system',
		color: Colors.Green,
		description:
			"Embarking on a fulfilling journey as a full-stack web developer for nearly four years, I've been an integral part of the hospital information system, particularly contributing to the Dhealth HIS project. My responsibilities spanned the entire spectrum, from crafting seamless patient registration experiences and efficient queuing systems to managing medical records, insurance claims, BPJS integration, and orchestrating smooth 3rd-party service collaborations. Starting as a junior developer and evolving into a team lead, I not only refined my programming skills but also cultivated leadership abilities, steering the development team towards excellence.",
		shortDescription:
			'Transforming healthcare experiences through Dhealth HIS as a full-stack developer and team lead.',
		links: [],
		logo: Assets.Yii2,
		name: 'Dhealth',
		period: {
			from: new Date(2019, 2, 1), // March 2019
			to: new Date(2023, 0, 1) // January 2023
		},
		skills: getSkills('php', 'docker', 'redis', 'yii2', 'jquery', 'pgsql'),
		type: 'Hospital Information System Product',
		screenshots: []
	},
	{
		no: 8,
		slug: 'stickermotorindo',
		color: Colors.Orange,
		description:
			'A Laravel 7 and jQuery-Powered Platform With a user-friendly landing page for sticker orders, Stickermotorindo is a website powered by Laravel 7 and jQuery. The platform is designed to simplify sticker management, order approval, and invoice generation for administrators through an easy-to-use dashboard. Additionally, the platform offers insightful sales graphs and comprehensive balance sheet reports for superadmin users, showcasing its versatility and efficiency.',
		shortDescription: 'Empowering sticker management with Laravel 7 and jQuery.',
		links: [],
		logo: Assets.Stdkreatif,
		name: 'Stickermotorindo',
		period: {
			from: new Date(2020, 6, 1), // March 2019
			to: new Date(2020, 7, 1) // January 2023
		},
		skills: getSkills('php', 'laravel', 'jquery', 'mysql'),
		type: 'E-commerce Platform',
		screenshots: [{ label: '', src: Screenshoot.std1 }]
	},
	{
		no: 7,
		slug: 'ulasid',
		color: Colors.Yellow,
		description:
			'As a pivotal contributor to the development of Ulas.id, a cutting-edge platform dedicated to the assessment and discussion of Indonesian films, I played a significant role as a back-end engineer. Leveraging the power of React and Ruby on Rails, Ulas.id stands as a testament to our commitment to fostering cultural appreciation and building a vibrant community centered around Indonesian cinema. My efforts in crafting the platform aimed at providing users with a seamless and insightful experience, reinforcing Ulas.id as a go-to destination for movie enthusiasts.',
		shortDescription: 'Empowering Indonesian movie enthusiasts with React and Ruby on Rails.',
		links: [],
		logo: Assets.UlasId,
		name: 'UlasId',
		period: {
			from: new Date(2020, 10, 0), // March 2019
			to: new Date(2021, 12, 0) // January 2023
		},
		skills: getSkills('ruby', 'ruby-on-rails', 'pgsql', 'react'),
		type: 'Movie Rating and Review Platform',
		screenshots: [{ label: '', src: Screenshoot.uls1 }]
	},
	{
		no: 9,
		slug: 'boboho',
		color: Colors.Purple,
		description:
			'Boboho, a dynamic Point of Sale (POS) platform, is built on the robust foundations of Laravel 8 and jQuery. Offering an intuitive inventory management, invoicing, and financial recording system, this platform is a testament to my expertise in crafting secure and responsive solutions. The user-friendly dashboard not only enhances business efficiency but also showcases my commitment to delivering high-quality POS experiences.',
		shortDescription: 'Crafting efficient and secure POS solutions with Laravel 8 and jQuery.',
		links: [],
		logo: Assets.Laravel,
		name: 'Boboho',
		period: {
			from: new Date(2022, 0, 1), // March 2019
			to: new Date(2022, 4, 0) // January 2023
		},
		skills: getSkills('php', 'laravel', 'jquery', 'mysql'),
		type: 'Point Of Sale Platform',
		screenshots: [{ label: '', src: Screenshoot.bbh1 }]
	},
	{
		no: 10,
		slug: 'antawijaya',
		color: Colors.Purple,
		description:
			'Antawijaya, my debut portfolio project, is a robust content management system built on Laravel and jQuery. Developed single-handedly, this CMS is tailored for creating impactful landing pages. Empowering administrators with easy content management across sections, Antawijaya showcases my proficiency in both front-end and back-end development. This project serves as a testament to my ability to create comprehensive web solutions independently.',
		shortDescription: 'Crafting impactful landing pages with a Laravel and jQuery-based CMS.',
		links: [],
		logo: Assets.Laravel,
		name: 'Antawijaya',
		period: {
			from: new Date(2019, 0, 1), // March 2019
			to: new Date(2019, 4, 0) // January 2023
		},
		skills: getSkills('php', 'laravel', 'jquery', 'mysql'),
		type: 'CMS & Landing Page',
		screenshots: []
	}
];

export default MY_PROJECTS;
