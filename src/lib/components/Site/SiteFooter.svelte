<script lang="ts">
	import { resolve } from '$app/paths';
	import { HOME } from '$lib/params';
	import { Platform } from '$lib/types';
	import { capitalize } from '$lib/utils/helpers';

	const LABELS: Partial<Record<Platform, string>> = {
		[Platform.GitHub]: 'GitHub',
		[Platform.Linkedin]: 'LinkedIn'
	};

	const email = HOME.links.find((link) => link.platform === Platform.Email)?.link;
	const profiles = HOME.links.filter((link) => link.platform !== Platform.Email);
</script>

<footer class="mt-24 border-t-2 border-bp-ink">
	<div
		class="bp-container flex flex-wrap items-center justify-between gap-4 py-10 font-mono text-sm"
	>
		{#if email}
			<a href={`mailto:${email}`} class="footer-link">{email}</a>
		{/if}
		<div class="flex flex-wrap gap-2">
			{#each profiles as profile (profile.platform)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={profile.link} class="footer-link" target="_blank" rel="noreferrer"
					>{LABELS[profile.platform] ?? capitalize(profile.platform)}</a
				>
			{/each}
			<a href={resolve('/resume')} class="footer-link">CV</a>
		</div>
	</div>
</footer>

<style>
	.footer-link {
		padding: 12px 14px;
		color: var(--bp-ink);
	}

	.footer-link:hover {
		color: var(--bp-accent);
	}
</style>
