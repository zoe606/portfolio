<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { HOME, NavBar } from '$lib/params';
	import { theme } from '$lib/stores/theme.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';

	interface Props {
		onsearchclick?: () => void;
	}

	let { onsearchclick }: Props = $props();

	const items = [
		{ title: NavBar.personal, href: resolve('/projects') },
		{ title: NavBar.career, href: resolve('/experience') },
		{ title: NavBar.skills, href: resolve('/skills') },
		{ title: NavBar.Education, href: resolve('/education') }
	];

	let menuOpen = $state(false);

	const isActive = (href: string) => page.url.pathname.startsWith(href);
</script>

<header class="sticky top-0 z-40 border-b border-bp-line bg-bp-bg">
	<div class="bp-container flex items-center justify-between gap-4 py-4">
		<a
			href={resolve('/')}
			class="flex items-center gap-3 font-display text-lg font-bold text-bp-ink decoration-none"
		>
			<span
				class="inline-flex h-9 w-9 items-center justify-center border-2 border-bp-ink text-sm"
				aria-hidden="true">{HOME.name[0]}{HOME.lastName[0]}</span
			>
			<span>{HOME.name} {HOME.lastName}</span>
		</a>

		<nav aria-label="Main" class="hidden items-center gap-1 font-mono text-sm md:flex">
			{#each items as item (item.href)}
				<a href={item.href} class="nav-link" aria-current={isActive(item.href) ? 'page' : undefined}
					>{item.title}</a
				>
			{/each}
			<a href={resolve('/resume')} class="cv-link">CV ↓</a>
		</nav>

		<div class="flex items-center gap-1">
			<button type="button" class="icon-button" aria-label="Search (⌘K)" onclick={onsearchclick}>
				<UIcon icon="i-carbon-search" />
			</button>
			<button
				type="button"
				class="icon-button"
				aria-label={theme.isDark ? 'Switch to light theme' : 'Switch to dark theme'}
				onclick={() => theme.toggle()}
			>
				<UIcon icon={theme.isDark ? 'i-carbon-sun' : 'i-carbon-moon'} />
			</button>
			<div class="md:hidden">
				<button
					type="button"
					class="icon-button"
					aria-label="Menu"
					aria-expanded={menuOpen}
					aria-controls="mobile-nav"
					onclick={() => (menuOpen = !menuOpen)}
				>
					<UIcon icon={menuOpen ? 'i-carbon-close' : 'i-carbon-menu'} />
				</button>
			</div>
		</div>
	</div>

	{#if menuOpen}
		<nav
			id="mobile-nav"
			aria-label="Main"
			class="bp-container flex flex-col border-t border-bp-line pb-4 font-mono md:hidden"
		>
			{#each items as item (item.href)}
				<a
					href={item.href}
					class="nav-link"
					aria-current={isActive(item.href) ? 'page' : undefined}
					onclick={() => (menuOpen = false)}>{item.title}</a
				>
			{/each}
			<a href={resolve('/resume')} class="nav-link" onclick={() => (menuOpen = false)}>CV ↓</a>
		</nav>
	{/if}
</header>

<style>
	.nav-link {
		padding: 12px 14px;
		color: var(--bp-ink);
		text-decoration: none;
		border-bottom: 2px solid transparent;
	}

	.nav-link:hover,
	.nav-link[aria-current='page'] {
		color: var(--bp-accent);
		border-bottom-color: var(--bp-accent);
	}

	.cv-link {
		margin-left: 8px;
		padding: 12px 18px;
		background: var(--bp-inverse);
		color: var(--bp-on-inverse);
		text-decoration: none;
	}

	.cv-link:hover {
		background: var(--bp-accent);
		color: var(--bp-on-accent);
	}

	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 1px solid transparent;
		background: none;
		color: var(--bp-ink);
		font-size: 18px;
		cursor: pointer;
	}

	.icon-button:hover {
		border-color: var(--bp-line);
		color: var(--bp-accent);
	}
</style>
