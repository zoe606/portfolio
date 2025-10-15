/**
 * Analytics Manager with $state.snapshot() and $effect.root()
 * Demonstrates advanced Svelte 5 patterns for external API integration
 */

interface AnalyticsEvent {
	name: string;
	properties: Record<string, unknown>;
	timestamp: Date;
}

interface PageView {
	path: string;
	title: string;
	referrer: string;
	timestamp: Date;
}

class AnalyticsManager {
	// Reactive state for tracking
	private events = $state<AnalyticsEvent[]>([]);
	private pageViews = $state<PageView[]>([]);
	private isEnabled = $state(false);
	private cleanupFn: (() => void) | null = null;

	// Initialize with $effect.root() for manual lifecycle control
	initialize(enabled: boolean): void {
		this.isEnabled = enabled;

		if (!enabled) return;

		// Use $effect.root() to create a managed effect scope
		this.cleanupFn = $effect.root(() => {
			// Track page views automatically
			$effect(() => {
				if (typeof window !== 'undefined') {
					this.trackPageView({
						path: window.location.pathname,
						title: document.title,
						referrer: document.referrer,
						timestamp: new Date()
					});
				}
			});

			// Batch send events every 5 seconds
			const interval = setInterval(() => {
				this.flush();
			}, 5000);

			// Return cleanup function
			return () => {
				clearInterval(interval);
				this.flush(); // Send remaining events
			};
		});
	}

	// Track custom event
	track(name: string, properties: Record<string, unknown> = {}): void {
		if (!this.isEnabled) return;

		this.events.push({
			name,
			properties,
			timestamp: new Date()
		});
	}

	// Track page view
	private trackPageView(view: PageView): void {
		if (!this.isEnabled) return;

		this.pageViews.push(view);

		// Also track as event
		this.track('page_view', {
			path: view.path,
			title: view.title,
			referrer: view.referrer
		});
	}

	// Flush events to API using $state.snapshot()
	private async flush(): Promise<void> {
		if (this.events.length === 0) return;

		// Use $state.snapshot() to get plain objects without reactivity
		// This is important for sending to external APIs
		const eventsToSend = $state.snapshot(this.events);
		const pageViewsToSend = $state.snapshot(this.pageViews);

		// Clear reactive arrays
		this.events = [];
		this.pageViews = [];

		try {
			// Send to analytics API (example)
			await this.sendToAPI({
				events: eventsToSend,
				pageViews: pageViewsToSend,
				sessionId: this.getSessionId(),
				userAgent: navigator.userAgent,
				timestamp: new Date().toISOString()
			});

			console.log('📊 Analytics sent:', {
				events: eventsToSend.length,
				pageViews: pageViewsToSend.length
			});
		} catch (error) {
			console.error('Analytics error:', error);
			// Re-add events on failure
			this.events.push(...eventsToSend);
			this.pageViews.push(...pageViewsToSend);
		}
	}

	private async sendToAPI(data: unknown): Promise<void> {
		// Mock API call - replace with real endpoint
		if (import.meta.env.DEV) {
			// In development, just log
			return Promise.resolve();
		}

		// In production, send to real API
		return fetch('/api/analytics', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then((res) => {
			if (!res.ok) throw new Error('Analytics failed');
		});
	}

	private getSessionId(): string {
		// Get or create session ID
		let sessionId = sessionStorage.getItem('analytics_session');
		if (!sessionId) {
			sessionId = `${Date.now()}-${Math.random().toString(36)}`;
			sessionStorage.setItem('analytics_session', sessionId);
		}
		return sessionId;
	}

	// Cleanup
	destroy(): void {
		this.flush();
		this.cleanupFn?.();
	}

	// Get stats (reactive)
	getStats() {
		return {
			eventCount: this.events.length,
			pageViewCount: this.pageViews.length,
			isEnabled: this.isEnabled
		};
	}
}

// Singleton instance
export const analytics = new AnalyticsManager();

// Helper functions
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
	analytics.track(name, properties);
}

export function trackClick(element: string, metadata?: Record<string, unknown>): void {
	analytics.track('click', { element, ...metadata });
}

export function trackNavigation(to: string, from?: string): void {
	analytics.track('navigation', { to, from });
}

// Example usage in components:
// import { analytics, trackEvent } from '$lib/utils/analytics.svelte';
//
// onMount(() => {
//   analytics.initialize(true);
// });
//
// function handleClick() {
//   trackEvent('button_click', { buttonId: 'submit' });
// }
