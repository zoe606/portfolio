<script lang="ts">
	import { onMount } from 'svelte';
	import UIcon from './Icon/UIcon.svelte';
	import {
		currentTheme,
		autoThemeEnabled,
		themeConfig,
		setTheme,
		toggleAutoTheme,
		THEMES,
		type ThemeName
	} from '$lib/stores/theme';

	let isOpen = $state(false);
	let dropdownElement = $state<HTMLDivElement | undefined>(undefined);
	let dropdownContentElement = $state<HTMLDivElement | undefined>(undefined);
	let isMobile = $state(false);
	let portalContainer = $state<HTMLDivElement | undefined>(undefined);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectTheme(themeName: ThemeName) {
		setTheme(themeName);
		isOpen = false;
	}

	function handleAutoThemeToggle() {
		toggleAutoTheme();
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			// Also check if click is outside portal on mobile
			if (isMobile && portalContainer && !portalContainer.contains(event.target as Node)) {
				isOpen = false;
			} else if (!isMobile) {
				isOpen = false;
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	function checkMobile() {
		isMobile = window.innerWidth <= 1024;
	}

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		// Create portal container for mobile
		if (typeof document !== 'undefined') {
			portalContainer = document.createElement('div');
			portalContainer.className = 'theme-switcher-portal';
			document.body.appendChild(portalContainer);
		}

		return () => {
			window.removeEventListener('resize', checkMobile);
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
			if (portalContainer && document.body.contains(portalContainer)) {
				document.body.removeChild(portalContainer);
			}
		};
	});

	// Move dropdown to portal when mobile and open
	$effect(() => {
		if (dropdownContentElement && portalContainer) {
			if (isMobile && isOpen) {
				portalContainer.appendChild(dropdownContentElement);
			} else if (dropdownElement && dropdownContentElement.parentElement === portalContainer) {
				dropdownElement.appendChild(dropdownContentElement);
			}
		}
	});

	const themeList = Object.values(THEMES);
</script>

<div class="theme-switcher" bind:this={dropdownElement}>
	<button
		type="button"
		aria-label="theme-switcher"
		class="theme-toggle-btn"
		onclick={toggleDropdown}
		aria-expanded={isOpen}
		data-tooltip="Change Theme"
	>
		<UIcon icon={$themeConfig.icon} />
		<span class="theme-name">{$themeConfig.name}</span>
		<UIcon icon={isOpen ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'} classes="text-sm" />
	</button>

	{#if isOpen}
		<div class="theme-dropdown-wrapper" bind:this={dropdownContentElement}>
			<!-- Mobile backdrop -->
			<div
				class="theme-backdrop"
				onclick={toggleDropdown}
				onkeydown={(e) => e.key === 'Escape' && toggleDropdown()}
				role="button"
				tabindex="-1"
				aria-label="Close theme selector"
			></div>

			<div class="theme-dropdown">
				<!-- Auto-theme toggle -->
				<div class="theme-auto-section">
					<button
						type="button"
						class="theme-auto-toggle"
						onclick={handleAutoThemeToggle}
						class:active={$autoThemeEnabled}
					>
						<div class="theme-auto-content">
							<UIcon
								icon="i-carbon-time"
								classes={$autoThemeEnabled ? 'text-[var(--accent-text)]' : ''}
							/>
							<div class="theme-auto-text">
								<span class="theme-auto-label">Auto Theme</span>
								<span class="theme-auto-desc">Changes with time of day</span>
							</div>
						</div>
						<div class="theme-auto-indicator" class:active={$autoThemeEnabled}>
							{#if $autoThemeEnabled}
								<UIcon icon="i-carbon-checkmark" classes="text-xs" />
							{/if}
						</div>
					</button>
				</div>

				<div class="theme-divider"></div>

				<!-- Theme list -->
				<div class="theme-list">
					{#each themeList as theme (theme.id)}
						<button
							type="button"
							class="theme-item"
							class:active={$currentTheme === theme.id}
							onclick={() => selectTheme(theme.id)}
							disabled={$autoThemeEnabled}
						>
							<div
								class="theme-preview"
								style="background: {theme.gradient}"
								class:active={$currentTheme === theme.id}
							>
								<UIcon icon={theme.icon} classes="text-white" />
							</div>
							<div class="theme-info">
								<span class="theme-item-name">{theme.name}</span>
								<span class="theme-item-desc">{theme.description}</span>
							</div>
							{#if $currentTheme === theme.id}
								<UIcon icon="i-carbon-checkmark" classes="text-[var(--accent-text)] text-lg" />
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.theme-switcher {
		position: relative;
		display: inline-block;
	}

	.theme-dropdown-wrapper {
		// Wrapper has no styling, just groups backdrop and dropdown
		display: contents; // Use display: contents to make it invisible in the DOM tree
	}

	:global(.theme-switcher-portal) {
		// Portal container at body level
		position: fixed;
		inset: 0;
		z-index: 1000;
		pointer-events: none; // Allow clicks through to backdrop/dropdown

		& > * {
			pointer-events: auto; // Re-enable pointer events for children
		}
	}

	.theme-backdrop {
		display: none;

		@media (max-width: 768px) {
			display: block;
			position: fixed;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(4px);
			z-index: 999;
			animation: fadeIn 0.2s ease;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.theme-toggle-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: transparent;
		border: none;
		color: var(--secondary-text);
		cursor: pointer;
		border-radius: 8px;
		transition: all 0.2s ease;
		font-size: 14px;
		position: relative;
		min-height: 44px;
		flex-shrink: 0;

		&:hover {
			background-color: var(--main-hover);
			color: var(--main-text);
		}

		@media (max-width: 768px) {
			padding: 8px 10px;
			gap: 6px;
		}

		@media (max-width: 480px) {
			padding: 6px 8px;
			gap: 4px;
			min-height: 40px;
		}

		.theme-name {
			white-space: nowrap;

			@media (max-width: 768px) {
				display: none;
			}
		}

		// Hide tooltip on touch devices
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

	.theme-dropdown {
		background-color: var(--main);
		border: 1px solid var(--border);
		border-radius: 12px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		padding: 8px;
		z-index: 1000;

		// Desktop: position relative to parent
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		min-width: 280px;
		max-width: 320px;
		animation: slideDown 0.2s ease;

		// Mobile: when in portal, positioned at bottom
		@media (max-width: 1024px) {
			position: fixed;
			top: auto;
			bottom: 10px;
			right: 10px;
			left: 10px;
			min-width: auto;
			max-width: none;
			width: calc(100vw - 20px);
			max-height: 75vh;
			overflow-y: auto;
			animation: slideUp 0.3s ease;
		}

		@media (max-width: 480px) {
			max-height: 70vh;
		}
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(100px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.theme-auto-section {
		padding: 4px;
	}

	.theme-auto-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--secondary-text);
		min-height: 56px; // Larger touch target for important toggle

		&:hover {
			background-color: var(--main-hover);
			border-color: var(--border-hover);
		}

		&.active {
			border-color: var(--accent-text);
			background-color: var(--secondary);
		}

		@media (max-width: 480px) {
			padding: 14px;
			min-height: 60px;
		}
	}

	.theme-auto-content {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.theme-auto-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
	}

	.theme-auto-label {
		font-size: 14px;
		font-weight: 500;
		color: var(--main-text);

		@media (max-width: 480px) {
			font-size: 15px;
		}
	}

	.theme-auto-desc {
		font-size: 12px;
		color: var(--tertiary-text);

		@media (max-width: 480px) {
			font-size: 13px;
		}

		@media (max-width: 360px) {
			display: none; // Hide description on very small screens
		}
	}

	.theme-auto-indicator {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;

		&.active {
			background-color: var(--accent-text);
			border-color: var(--accent-text);
			color: var(--main);
		}
	}

	.theme-divider {
		height: 1px;
		background-color: var(--border);
		margin: 8px 0;
	}

	.theme-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 4px;

		@media (max-width: 768px) {
			// Enable smooth scrolling on mobile
			overflow-y: auto;
			max-height: calc(80vh - 120px); // Account for auto-theme toggle
			-webkit-overflow-scrolling: touch;
			scroll-behavior: smooth;

			// Better scrollbar styling
			&::-webkit-scrollbar {
				width: 6px;
			}

			&::-webkit-scrollbar-track {
				background: var(--secondary);
				border-radius: 3px;
			}

			&::-webkit-scrollbar-thumb {
				background: var(--border);
				border-radius: 3px;

				&:hover {
					background: var(--border-hover);
				}
			}
		}
	}

	.theme-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
		min-height: 56px; // Better touch target

		&:hover:not(:disabled) {
			background-color: var(--main-hover);
			border-color: var(--border);
		}

		&.active {
			background-color: var(--secondary);
			border-color: var(--accent-text);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		@media (max-width: 480px) {
			padding: 14px;
			min-height: 60px;
			gap: 14px;
		}
	}

	.theme-preview {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;

		&.active {
			transform: scale(1.1);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}

		@media (max-width: 480px) {
			width: 44px;
			height: 44px;
		}
	}

	.theme-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}

	.theme-item-name {
		font-size: 14px;
		font-weight: 500;
		color: var(--main-text);

		@media (max-width: 480px) {
			font-size: 15px;
		}
	}

	.theme-item-desc {
		font-size: 12px;
		color: var(--tertiary-text);

		@media (max-width: 480px) {
			font-size: 13px;
		}

		@media (max-width: 360px) {
			display: none; // Hide descriptions on very small screens
		}
	}
</style>
