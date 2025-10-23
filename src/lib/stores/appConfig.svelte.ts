/**
 * Immutable application configuration using $state.frozen()
 * This ensures config values cannot be accidentally mutated
 */

interface SiteConfig {
	readonly siteName: string;
	readonly siteUrl: string;
	readonly author: {
		readonly name: string;
		readonly email: string;
	};
	readonly social: {
		readonly github: string;
		readonly linkedin: string;
	};
	readonly analytics: {
		readonly enabled: boolean;
		readonly trackingId?: string;
	};
	readonly features: {
		readonly searchEnabled: boolean;
		readonly themeToggle: boolean;
		readonly webVitals: boolean;
	};
}

const config: SiteConfig = {
	siteName: 'Portfolio',
	siteUrl: 'https://zoe606.github.io/portfolio',
	author: {
		name: 'Developer',
		email: 'dev@example.com'
	},
	social: {
		github: 'https://github.com/zoe606',
		linkedin: 'https://linkedin.com/in/zoe606'
	},
	analytics: {
		enabled: true,
		trackingId: undefined // Set in production
	},
	features: {
		searchEnabled: true,
		themeToggle: true,
		webVitals: true
	}
};

// Freeze to guard against accidental mutations in dev
export const appConfig: Readonly<SiteConfig> = Object.freeze(config);

// Type-safe getter functions
export function getFeatureFlag(feature: keyof SiteConfig['features']): boolean {
	return appConfig.features[feature];
}

export function isAnalyticsEnabled(): boolean {
	return appConfig.analytics.enabled && !!appConfig.analytics.trackingId;
}

// Example usage:
// import { appConfig } from '$lib/stores/appConfig.svelte';
// console.log(appConfig.siteName); // ✅ OK
// appConfig.siteName = 'New'; // ❌ TypeError in dev mode
