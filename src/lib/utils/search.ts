import Fuse from 'fuse.js';
import type { Project, Experience, Skill } from '$lib/types';

export interface SearchResultItem<T = unknown> {
	icon: string;
	name: string;
	data: T;
	to: string;
	score?: number;
	type: 'project' | 'skill' | 'experience';
}

/**
 * Enhanced search utility using Fuse.js for fuzzy searching
 * across projects, experiences, and skills
 */
export class PortfolioSearch {
	private projectsFuse: Fuse<Project>;
	private experiencesFuse: Fuse<Experience>;
	private skillsFuse: Fuse<Skill>;

	constructor(projects: Project[], experiences: Experience[], skills: Skill[]) {
		// Configure Fuse.js for projects
		this.projectsFuse = new Fuse(projects, {
			keys: [
				{ name: 'name', weight: 2 },
				{ name: 'shortDescription', weight: 1.5 },
				{ name: 'description', weight: 1 },
				{ name: 'type', weight: 1 },
				{ name: 'skills.name', weight: 0.8 }
			],
			threshold: 0.4, // Lower = more strict, Higher = more fuzzy
			includeScore: true,
			minMatchCharLength: 2,
			shouldSort: true
		});

		// Configure Fuse.js for experiences
		this.experiencesFuse = new Fuse(experiences, {
			keys: [
				{ name: 'name', weight: 2 },
				{ name: 'company', weight: 2 },
				{ name: 'shortDescription', weight: 1.5 },
				{ name: 'description', weight: 1 },
				{ name: 'type', weight: 1 },
				{ name: 'location', weight: 0.8 },
				{ name: 'skills.name', weight: 0.8 }
			],
			threshold: 0.4,
			includeScore: true,
			minMatchCharLength: 2,
			shouldSort: true
		});

		// Configure Fuse.js for skills
		this.skillsFuse = new Fuse(skills, {
			keys: [
				{ name: 'name', weight: 2 },
				{ name: 'description', weight: 1 }
			],
			threshold: 0.3, // Skills should be more strict
			includeScore: true,
			minMatchCharLength: 2,
			shouldSort: true
		});
	}

	/**
	 * Perform a search across all content types
	 * @param query - The search query string
	 * @param maxResults - Maximum number of results to return (default: 50)
	 * @returns Array of search results sorted by relevance
	 */
	search(query: string, maxResults: number = 50): SearchResultItem[] {
		if (!query || query.trim().length < 2) {
			return [];
		}

		const results: SearchResultItem[] = [];

		// Search projects
		const projectResults = this.projectsFuse.search(query);
		results.push(
			...projectResults.map((result) => ({
				data: result.item,
				icon: 'i-carbon-cube',
				name: result.item.name,
				to: `projects/${result.item.slug}`,
				score: result.score,
				type: 'project' as const
			}))
		);

		// Search experiences
		const experienceResults = this.experiencesFuse.search(query);
		results.push(
			...experienceResults.map((result) => ({
				data: result.item,
				icon: 'i-carbon-development',
				name: `${result.item.name} @ ${result.item.company}`,
				to: `experience/${result.item.slug}`,
				score: result.score,
				type: 'experience' as const
			}))
		);

		// Search skills
		const skillResults = this.skillsFuse.search(query);
		results.push(
			...skillResults.map((result) => ({
				data: result.item,
				icon: 'i-carbon-software-resource-cluster',
				name: result.item.name,
				to: `skills/${result.item.slug}`,
				score: result.score,
				type: 'skill' as const
			}))
		);

		// Sort by score (lower score = better match) and limit results
		return results.sort((a, b) => (a.score ?? 1) - (b.score ?? 1)).slice(0, maxResults);
	}

	/**
	 * Search only in projects
	 */
	searchProjects(query: string, maxResults: number = 20): SearchResultItem<Project>[] {
		if (!query || query.trim().length < 2) {
			return [];
		}

		return this.projectsFuse.search(query, { limit: maxResults }).map((result) => ({
			data: result.item,
			icon: 'i-carbon-cube',
			name: result.item.name,
			to: `projects/${result.item.slug}`,
			score: result.score,
			type: 'project' as const
		}));
	}

	/**
	 * Search only in experiences
	 */
	searchExperiences(query: string, maxResults: number = 20): SearchResultItem<Experience>[] {
		if (!query || query.trim().length < 2) {
			return [];
		}

		return this.experiencesFuse.search(query, { limit: maxResults }).map((result) => ({
			data: result.item,
			icon: 'i-carbon-development',
			name: `${result.item.name} @ ${result.item.company}`,
			to: `experience/${result.item.slug}`,
			score: result.score,
			type: 'experience' as const
		}));
	}

	/**
	 * Search only in skills
	 */
	searchSkills(query: string, maxResults: number = 20): SearchResultItem<Skill>[] {
		if (!query || query.trim().length < 2) {
			return [];
		}

		return this.skillsFuse.search(query, { limit: maxResults }).map((result) => ({
			data: result.item,
			icon: 'i-carbon-software-resource-cluster',
			name: result.item.name,
			to: `skills/${result.item.slug}`,
			score: result.score,
			type: 'skill' as const
		}));
	}
}
