import Assets from './data/assets';
import type { Education } from './types';

export const MY_EDUCATIONS: Array<Education> = [
	{
		degree: 'Bachelor of Applied Science - BASc, Computer Science/Informatics',
		description: '',
		location: 'Bandung',
		logo: Assets.Unknown,
		name: '',
		organization: 'Politeknik Pos Indonesia',
		period: { from: new Date(2015, 0, 1), to: new Date(2019, 5, 1) },
		shortDescription: '',
		slug: 'last-education',
		subjects: [
			'Assembly',
			'Algorithms and Data structures',
			'Algebra',
			'Python',
			'Computer Architecture',
			'Java',
			'English',
			'C#',
			'Web & Mobile Programming',
			'Database',
			'Machine Learning'
		]
	},
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
