import { browser } from '$app/env';

export type ThemeName = 'light' | 'dark';

// app.html reads the same key before the first paint, so keep the two in sync.
const STORAGE_KEY = '@zoe606-theme';

class Theme {
	current = $state<ThemeName>('light');

	get isDark() {
		return this.current === 'dark';
	}

	/** Reads the theme that the inline script in app.html already applied. */
	init() {
		if (!browser) return;

		this.current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', (e) => {
			if (readSaved() === null) this.apply(e.matches ? 'dark' : 'light');
		});
	}

	toggle() {
		const next = this.isDark ? 'light' : 'dark';
		this.apply(next);
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Storage can be blocked. The theme still applies for this visit.
		}
	}

	private apply(name: ThemeName) {
		this.current = name;
		document.documentElement.dataset.theme = name;
	}
}

const readSaved = (): string | null => {
	try {
		return localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
};

export const theme = new Theme();
