<script lang="ts">
	import { HOME, NavBar } from '$lib/params';
	import { theme, toggleTheme } from '$lib/stores/theme';

	import { base } from '$app/paths';
	import UIcon from '../Icon/UIcon.svelte';

	interface Props {
		onsearchclick?: () => void;
	}

	let { onsearchclick }: Props = $props();

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
</script>

<div class="nav-menu">
	<nav class="container !justify-between flex flex-row items-center text-sm">
		<a
			data-sveltekit-replacestate
			href={`${base}/`}
			class="nav-menu-left decoration-none flex flex-row items-center cursor-pointer px-4 text-[var(--secondary-text)] self-stretch hover:bg-[color:var(--main-hover)]"
		>
			<UIcon icon="i-carbon-code" classes="text-2em" />
			<span class="ml-2 text-md font-bold hidden md:inline">{HOME.name} {HOME.lastName}</span>
		</a>
		<div class="flex flex-row flex-1 self-center justify-center">
			{#each items as item (item.to)}
				<a
					data-sveltekit-replacestate
					href={`${base}${item.to}`}
					class="nav-menu-item !text-[var(--secondary-text)]"
				>
					<UIcon icon={item.icon} classes="text-1.3em sm:text-1.5em" />
					<span class="nav-menu-item-label text-base sm:text-xs">{item.title}</span>
				</a>
			{/each}
		</div>
		<div class="flex flex-row self-stretch items-stretch gap-1 text-1.15em">
			<button
				type="button"
				aria-label="search"
				class="nav-search-button bg-transparent text-inherit col-center self-stretch px-2 border-none cursor-pointer hover:bg-[color:var(--main-hover)] text-[var(--secondary-text)] relative"
				onclick={handleSearchClick}
				data-tooltip={typeof navigator !== 'undefined' && navigator.platform.includes('Mac')
					? '⌘K'
					: 'Ctrl+K'}
			>
				<UIcon icon="i-carbon-search" />
				<p class="nav-menu-item-label sm:text-0.9em">search</p>
			</button>
			<button
				type="button"
				aria-label="toggle-theme"
				class="bg-transparent text-1em border-none cursor-pointer hover:bg-[color:var(--main-hover)] text-[var(--secondary-text)] px-2"
				onclick={() => toggleTheme()}
			>
				{#if $theme}
					<UIcon icon="i-carbon-sun" />
				{:else}
					<UIcon icon="i-carbon-moon" />
				{/if}
			</button>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-menu {
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0px;
		z-index: 10;
		padding: 0px 10px;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--main);

		&-item {
			text-decoration: none;
			font-weight: 400;
			padding: 10px 20px;
			color: inherit;
			display: flex;
			align-items: center;
			border-bottom: 3px solid transparent;

			&-label {
				margin-left: 10px;

				@media (max-width: 950px) {
					& {
						display: none;
					}
				}
			}

			&:hover {
				background-color: var(--main-hover);
			}
		}
	}

	.nav-search-button {
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
</style>
