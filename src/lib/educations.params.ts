import Assets from './data/assets';
import type { Education } from './types';

export const MY_EDUCATIONS: Array<Education> = [
	{
		degree: 'Bachelor of Applied Science in Computer Science/Informatics',
		description:
			'Comprehensive computer science education covering software engineering, algorithms, data structures, and modern programming paradigms. Developed strong foundation in web and mobile application development, database management, and system architecture.',
		location: 'Bandung, Indonesia',
		logo: Assets.Unknown,
		name: '',
		organization: 'Indonesia POS Polytechnic',
		period: { from: new Date(2015, 0, 1), to: new Date(2019, 5, 1) },
		shortDescription: 'Bachelor of Applied Science in Computer Science/Informatics',
		slug: 'bachelor-degree',
		subjects: [
			'Algorithms and Data Structures',
			'Computer Architecture',
			'Web & Mobile Programming',
			'Database Management',
			'Machine Learning',
			'Python',
			'Java',
			'C#',
			'Assembly',
			'Software Engineering'
		]
	}
	// {
	// 	degree: 'PhD of Computer Science',
	// 	description: '',
	// 	location: 'USA',
	// 	logo: Assets.Unknown,
	// 	name: '',
	// 	organization: 'MIT',
	// 	period: { from: new Date(2023, 0, 1) },
	// 	shortDescription: '',
	// 	slug: 'dummy-education-item-2',
	// 	subjects: ['Assembly', 'Rust', 'Computer Architecture', 'Algorithms and Data structures']
	// }
];
