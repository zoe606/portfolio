<script lang="ts">
	import { HOME, NavBar } from '$lib/params';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import UIcon from '../Icon/UIcon.svelte';
	import ThemeSwitcher from '../ThemeSwitcher.svelte';

	interface Props {
		onsearchclick?: () => void;
	}

	let { onsearchclick }: Props = $props();

	let isMobileMenuOpen = $state(false);
	let navElement = $state<HTMLElement | undefined>(undefined);

	const items = [
		{ title: NavBar.skills, to: '/skills', icon: 'i-carbon-software-resource-cluster' },
		{ title: NavBar.personal, to: '/projects', icon: 'i-carbon-cube' },
		{ title: NavBar.career, to: '/experience', icon: 'i-carbon-development' },
		{ title: NavBar.Education, to: '/education', icon: 'i-carbon-education' },
		{ title: NavBar.resume, to: '/resume', icon: 'i-carbon-result' }
	];

	function handleSearchClick(e: MouseEvent) {
		e.preventDefault();
		onsearchclick?.();
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (navElement && !navElement.contains(event.target as Node)) {
			closeMobileMenu();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isMobileMenuOpen) {
			closeMobileMenu();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="nav-menu" bind:this={navElement}>
	<nav class="container nav-container">
		<!-- Logo -->
		<a data-sveltekit-replacestate href={`${base}/`} class="nav-menu-left">
			<UIcon icon="i-carbon-code" classes="text-2em" />
			<span class="nav-logo-text">{HOME.name} {HOME.lastName}</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="nav-desktop-items">
			{#each items as item (item.to)}
				<a data-sveltekit-replacestate href={`${base}${item.to}`} class="nav-menu-item">
					<UIcon icon={item.icon} classes="text-1.3em sm:text-1.5em" />
					<span class="nav-menu-item-label">{item.title}</span>
				</a>
			{/each}
		</div>

		<!-- Desktop Right Actions -->
		<div class="nav-desktop-actions">
			<button
				type="button"
				aria-label="search"
				class="nav-search-button"
				onclick={handleSearchClick}
				data-tooltip={typeof navigator !== 'undefined' && navigator.platform.includes('Mac')
					? '⌘K'
					: 'Ctrl+K'}
			>
				<UIcon icon="i-carbon-search" />
				<p class="nav-menu-item-label">search</p>
			</button>
			<div class="nav-theme-switcher">
				<ThemeSwitcher />
			</div>
		</div>

		<!-- Mobile Right Actions (Search + Theme + Hamburger) -->
		<div class="nav-mobile-actions">
			<button
				type="button"
				aria-label="search"
				class="nav-mobile-icon-button"
				onclick={handleSearchClick}
			>
				<UIcon icon="i-carbon-search" />
			</button>
			<div class="nav-mobile-theme">
				<ThemeSwitcher />
			</div>
			<button
				type="button"
				aria-label="menu"
				aria-expanded={isMobileMenuOpen}
				class="nav-hamburger"
				onclick={toggleMobileMenu}
			>
				<UIcon icon={isMobileMenuOpen ? 'i-carbon-close' : 'i-carbon-menu'} classes="text-2xl" />
			</button>
		</div>
	</nav>

	<!-- Mobile Menu Overlay -->
	{#if isMobileMenuOpen}
		<div
			class="nav-mobile-backdrop"
			onclick={closeMobileMenu}
			onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
			role="button"
			tabindex="-1"
			aria-label="Close navigation menu"
		></div>

		<div class="nav-mobile-menu">
			{#each items as item (item.to)}
				<a
					data-sveltekit-replacestate
					href={`${base}${item.to}`}
					class="nav-mobile-menu-item"
					onclick={closeMobileMenu}
				>
					<UIcon icon={item.icon} classes="text-2xl" />
					<span>{item.title}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.nav-menu {
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0px;
		z-index: 100;
		padding: 0px 10px;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--main);
		backdrop-filter: blur(8px);
	}

	.nav-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		min-height: 60px;
		gap: 8px;

		@media (max-width: 768px) {
			min-height: 56px;
			gap: 4px;
		}
	}

	.nav-menu-left {
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		padding: 8px 12px;
		color: var(--secondary-text);
		border-radius: 8px;
		transition: background-color 0.2s ease;
		flex-shrink: 0;

		&:hover {
			background-color: var(--main-hover);
		}

		@media (max-width: 768px) {
			padding: 8px;
		}

		@media (max-width: 480px) {
			padding: 6px;
		}
	}

	.nav-logo-text {
		margin-left: 8px;
		font-size: 1rem;
		font-weight: 700;
		white-space: nowrap;

		@media (max-width: 768px) {
			display: none;
		}

		@media (min-width: 769px) and (max-width: 1024px) {
			font-size: 0.9rem;
		}
	}

	// Desktop Navigation
	.nav-desktop-items {
		display: flex;
		flex-direction: row;
		flex: 1;
		align-items: center;
		justify-content: center;
		gap: 4px;

		@media (max-width: 768px) {
			display: none;
		}
	}

	.nav-menu-item {
		text-decoration: none;
		font-weight: 400;
		padding: 10px 16px;
		color: var(--secondary-text);
		display: flex;
		align-items: center;
		border-radius: 8px;
		transition: all 0.2s ease;
		min-height: 44px;

		&:hover {
			background-color: var(--main-hover);
			color: var(--main-text);
		}

		&-label {
			margin-left: 10px;
			font-size: 0.875rem;

			@media (max-width: 1024px) {
				display: none;
			}
		}
	}

	// Desktop Actions
	.nav-desktop-actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4px;

		@media (max-width: 768px) {
			display: none;
		}
	}

	.nav-search-button {
		background: transparent;
		color: var(--secondary-text);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px 12px;
		border: none;
		cursor: pointer;
		border-radius: 8px;
		transition: background-color 0.2s ease;
		position: relative;
		min-height: 44px;

		&:hover {
			background-color: var(--main-hover);
		}

		.nav-menu-item-label {
			margin-left: 8px;
			font-size: 0.875rem;

			@media (max-width: 1024px) {
				display: none;
			}
		}

		@media (hover: hover) and (pointer: fine) {
			&::after {
				content: attr(data-tooltip);
				position: absolute;
				bottom: -35px;
				left: 50%;
				transform: translateX(-50%);
				background-color: var(--main-text);
				color: var(--main);
				padding: 4px 8px;
				border-radius: 4px;
				font-size: 12px;
				font-weight: 500;
				white-space: nowrap;
				opacity: 0;
				pointer-events: none;
				transition: opacity 0.2s ease;
				z-index: 1000;
			}

			&:hover::after {
				opacity: 1;
			}
		}
	}

	.nav-theme-switcher {
		display: flex;
		align-items: center;
	}

	// Mobile Actions
	.nav-mobile-actions {
		display: none;

		@media (max-width: 768px) {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0;
			height: 100%;
		}
	}

	.nav-mobile-icon-button {
		background: transparent;
		color: var(--secondary-text);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border: none;
		cursor: pointer;
		border-radius: 8px;
		transition: background-color 0.2s ease;
		min-width: 44px;
		min-height: 44px;
		flex-shrink: 0;

		&:hover {
			background-color: var(--main-hover);
		}

		@media (max-width: 480px) {
			padding: 6px;
			min-width: 40px;
			min-height: 40px;
		}
	}

	.nav-mobile-theme {
		display: flex;
		align-items: center;
		flex-shrink: 0;

		:global(.theme-switcher) {
			margin: 0;
		}

		:global(.theme-toggle-btn) {
			padding: 8px 10px;
			min-height: 44px;

			@media (max-width: 480px) {
				padding: 6px 8px;
				min-height: 40px;
			}
		}
	}

	.nav-hamburger {
		background: transparent;
		color: var(--secondary-text);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border: none;
		cursor: pointer;
		border-radius: 8px;
		transition: background-color 0.2s ease;
		min-width: 44px;
		min-height: 44px;
		flex-shrink: 0;

		&:hover {
			background-color: var(--main-hover);
		}

		@media (max-width: 480px) {
			padding: 6px;
			min-width: 40px;
			min-height: 40px;
		}
	}

	// Mobile Menu Backdrop
	.nav-mobile-backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 90;
		animation: fadeIn 0.2s ease;

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}

	// Mobile Menu
	.nav-mobile-menu {
		position: fixed;
		top: 60px;
		left: 0;
		right: 0;
		background-color: var(--main);
		border-bottom: 1px solid var(--border);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		z-index: 95;
		animation: slideDown 0.3s ease;
		max-height: calc(100vh - 60px);
		overflow-y: auto;

		@media (max-width: 768px) {
			top: 56px;
			max-height: calc(100vh - 56px);
		}

		@keyframes slideDown {
			from {
				opacity: 0;
				transform: translateY(-20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}

	.nav-mobile-menu-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px 20px;
		text-decoration: none;
		color: var(--secondary-text);
		font-weight: 500;
		font-size: 1rem;
		border-bottom: 1px solid var(--border);
		transition: all 0.2s ease;
		min-height: 60px;

		&:hover {
			background-color: var(--main-hover);
			color: var(--main-text);
		}

		&:last-child {
			border-bottom: none;
		}

		span {
			flex: 1;
		}
	}
</style>
