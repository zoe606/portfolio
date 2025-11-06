import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';

export type ThemeName = 'light' | 'dark' | 'synthwave' | 'terminal' | 'paper';

export interface ThemeConfig {
	id: ThemeName;
	name: string;
	description: string;
	icon: string;
	gradient?: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
	light: {
		id: 'light',
		name: 'Light',
		description: 'Clean and bright',
		icon: 'i-carbon-sun',
		gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
	},
	dark: {
		id: 'dark',
		name: 'Dark',
		description: 'Easy on the eyes',
		icon: 'i-carbon-moon',
		gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)'
	},
	synthwave: {
		id: 'synthwave',
		name: 'Synthwave',
		description: 'Retro neon vibes',
		icon: 'i-carbon-music',
		gradient: 'linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #0070f3 100%)'
	},
	terminal: {
		id: 'terminal',
		name: 'Terminal',
		description: 'Hacker aesthetic',
		icon: 'i-carbon-terminal',
		gradient: 'linear-gradient(135deg, #00ff00 0%, #003300 100%)'
	},
	paper: {
		id: 'paper',
		name: 'Paper',
		description: 'Warm and cozy',
		icon: 'i-carbon-document',
		gradient: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 100%)'
	}
};

const STORAGE_KEY = '@zoe606-theme';
const AUTO_THEME_KEY = '@zoe606-auto-theme';

// Store for current theme
export const currentTheme = writable<ThemeName>('light');

// Store for auto-theme feature
export const autoThemeEnabled = writable<boolean>(false);

// Derived store for theme config
export const themeConfig = derived(currentTheme, ($theme) => THEMES[$theme]);

/**
 * Update localStorage with current theme
 */
const updateLocalStorage = (theme: ThemeName) => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, theme);
	}
};

/**
 * Update localStorage with auto-theme preference
 */
const updateAutoThemeStorage = (enabled: boolean) => {
	if (browser) {
		localStorage.setItem(AUTO_THEME_KEY, JSON.stringify(enabled));
	}
};

/**
 * Apply theme to DOM
 */
const applyThemeToDOM = (theme: ThemeName) => {
	if (browser) {
		const root = document.querySelector(':root');
		if (root) {
			root.setAttribute('data-theme', theme);
		}
	}
};

/**
 * Set theme and persist to storage
 */
export const setTheme = (theme: ThemeName) => {
	currentTheme.set(theme);
	updateLocalStorage(theme);
	applyThemeToDOM(theme);
};

/**
 * Toggle between light and dark themes (legacy support)
 */
export const toggleTheme = (value?: boolean) => {
	const newTheme = typeof value === 'boolean' ? (value ? 'dark' : 'light') : undefined;

	if (newTheme) {
		setTheme(newTheme);
	} else {
		// Toggle between light and dark
		currentTheme.update((current) => {
			const nextTheme = current === 'dark' ? 'light' : 'dark';
			setTheme(nextTheme);
			return nextTheme;
		});
	}
};

/**
 * Cycle through all available themes
 */
export const cycleTheme = () => {
	const themeOrder: ThemeName[] = ['light', 'dark', 'synthwave', 'terminal', 'paper'];
	currentTheme.update((current) => {
		const currentIndex = themeOrder.indexOf(current);
		const nextIndex = (currentIndex + 1) % themeOrder.length;
		const nextTheme = themeOrder[nextIndex];
		setTheme(nextTheme);
		return nextTheme;
	});
};

/**
 * Get theme based on current time of day
 * Morning (6-11): Light
 * Afternoon (12-17): Paper
 * Evening (18-21): Synthwave
 * Night (22-5): Dark/Terminal
 */
export const getThemeByTime = (): ThemeName => {
	const hour = new Date().getHours();

	if (hour >= 6 && hour < 12) {
		return 'light'; // Morning
	} else if (hour >= 12 && hour < 18) {
		return 'paper'; // Afternoon
	} else if (hour >= 18 && hour < 22) {
		return 'synthwave'; // Evening
	} else {
		// Night - alternate between dark and terminal
		return hour % 2 === 0 ? 'dark' : 'terminal';
	}
};

/**
 * Enable or disable auto-theme switching
 */
export const toggleAutoTheme = (enabled?: boolean) => {
	const newValue = enabled ?? !autoThemeEnabled;

	autoThemeEnabled.update(() => {
		updateAutoThemeStorage(newValue);

		if (newValue) {
			// Apply time-based theme immediately
			const timeBasedTheme = getThemeByTime();
			setTheme(timeBasedTheme);

			// Set up interval to check every hour
			if (browser) {
				const intervalId = setInterval(
					() => {
						let isAutoEnabled = false;
						autoThemeEnabled.subscribe((val) => {
							isAutoEnabled = val;
						})();

						if (isAutoEnabled) {
							const theme = getThemeByTime();
							setTheme(theme);
						} else {
							clearInterval(intervalId);
						}
					},
					60 * 60 * 1000
				); // Check every hour
			}
		}

		return newValue;
	});
};

/**
 * Get system color scheme preference
 */
const getSystemTheme = (): ThemeName => {
	if (browser && window.matchMedia) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
};

/**
 * Initialize theme on app hydration
 */
export const onHydrated = () => {
	if (!browser) return;

	// Check if auto-theme is enabled
	const autoThemeStored = localStorage.getItem(AUTO_THEME_KEY);
	const isAutoEnabled = autoThemeStored ? JSON.parse(autoThemeStored) : false;

	if (isAutoEnabled) {
		autoThemeEnabled.set(true);
		const timeBasedTheme = getThemeByTime();
		setTheme(timeBasedTheme);
		toggleAutoTheme(true); // Set up the interval
		return;
	}

	// Load saved theme or use system preference
	const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeName | null;

	if (savedTheme && savedTheme in THEMES) {
		setTheme(savedTheme);
	} else {
		// Use system preference
		const systemTheme = getSystemTheme();
		setTheme(systemTheme);
	}

	// Listen for system theme changes
	if (window.matchMedia) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			// Only apply if auto-theme is not enabled and no saved preference
			const savedTheme = localStorage.getItem(STORAGE_KEY);
			let isAutoEnabled = false;
			autoThemeEnabled.subscribe((val) => {
				isAutoEnabled = val;
			})();

			if (!savedTheme && !isAutoEnabled) {
				const newTheme = e.matches ? 'dark' : 'light';
				setTheme(newTheme);
			}
		});
	}
};
