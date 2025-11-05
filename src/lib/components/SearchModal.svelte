<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import UIcon from './Icon/UIcon.svelte';
	import { PortfolioSearch, type SearchResultItem } from '$lib/utils/search';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import MY_PROJECTS from '$lib/projects.params';
	import MY_SKILLS from '$lib/skills.params';

	interface Props {
		open?: boolean;
	}

	let { open = $bindable(false) }: Props = $props();

	const searchEngine = new PortfolioSearch(MY_PROJECTS, MY_EXPERIENCES, MY_SKILLS);

	let query = $state('');
	let results = $state<SearchResultItem[]>([]);
	let selectedIndex = $state(0);
	let inputElement = $state<HTMLInputElement | undefined>(undefined);
	let modalElement = $state<HTMLDivElement | undefined>(undefined);

	// Reactive search
	$effect(() => {
		if (query.trim().length >= 2) {
			results = searchEngine.search(query, 20);
			selectedIndex = 0;
		} else {
			results = [];
			selectedIndex = 0;
		}
	});

	// Focus input when modal opens
	$effect(() => {
		if (open && inputElement) {
			setTimeout(() => inputElement?.focus(), 50);
		}
	});

	// Handle keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				close();
				break;
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				e.preventDefault();
				if (results[selectedIndex]) {
					navigateToResult(results[selectedIndex]);
				}
				break;
		}
	}

	function navigateToResult(result: SearchResultItem) {
		goto(`${base}/${result.to}`);
		close();
	}

	function close() {
		open = false;
		query = '';
		results = [];
		selectedIndex = 0;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === modalElement) {
			close();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	// Result count by type
	const resultCount = $derived({
		projects: results.filter((r) => r.type === 'project').length,
		experiences: results.filter((r) => r.type === 'experience').length,
		skills: results.filter((r) => r.type === 'skill').length
	});
</script>

{#if open}
	<div
		bind:this={modalElement}
		class="search-modal-backdrop"
		onclick={handleBackdropClick}
		onkeydown={(e) => e.key === 'Escape' && close()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="search-modal-title"
		tabindex="-1"
	>
		<div class="search-modal">
			<!-- Search Input -->
			<div class="search-input-wrapper">
				<UIcon icon="i-carbon-search" classes="text-[var(--accent-text)] text-xl" />
				<input
					bind:this={inputElement}
					bind:value={query}
					type="text"
					placeholder="Search projects, skills, experiences..."
					class="search-input"
					aria-label="Search"
				/>
				<kbd class="keyboard-hint">ESC</kbd>
			</div>

			<!-- Results -->
			<div class="search-results">
				{#if query.trim().length === 0}
					<div class="search-empty">
						<UIcon
							icon="i-carbon-search-locate-mirror"
							classes="text-4xl text-[var(--accent-text)]"
						/>
						<span class="text-[var(--secondary-text)]">Start typing to search...</span>
						<div class="keyboard-shortcuts">
							<div class="shortcut">
								<kbd>↑</kbd><kbd>↓</kbd>
								<span>Navigate</span>
							</div>
							<div class="shortcut">
								<kbd>↵</kbd>
								<span>Select</span>
							</div>
							<div class="shortcut">
								<kbd>ESC</kbd>
								<span>Close</span>
							</div>
						</div>
					</div>
				{:else if results.length === 0}
					<div class="search-empty">
						<UIcon icon="i-carbon-cube" classes="text-4xl text-[var(--accent-text)]" />
						<span class="text-[var(--secondary-text)]">No results found for "{query}"</span>
					</div>
				{:else}
					<!-- Result count -->
					<div class="result-summary">
						<span class="font-semibold text-[var(--main-text)]"
							>{results.length} result{results.length !== 1 ? 's' : ''}</span
						>
						{#if resultCount.projects > 0}
							<span class="text-[var(--secondary-text)]"
								>• {resultCount.projects} project{resultCount.projects !== 1 ? 's' : ''}</span
							>
						{/if}
						{#if resultCount.experiences > 0}
							<span class="text-[var(--secondary-text)]"
								>• {resultCount.experiences} experience{resultCount.experiences !== 1
									? 's'
									: ''}</span
							>
						{/if}
						{#if resultCount.skills > 0}
							<span class="text-[var(--secondary-text)]"
								>• {resultCount.skills} skill{resultCount.skills !== 1 ? 's' : ''}</span
							>
						{/if}
					</div>

					<!-- Result items -->
					<div class="result-list">
						{#each results as result, index (result.to)}
							<button
								class="result-item"
								class:selected={index === selectedIndex}
								onclick={() => navigateToResult(result)}
								onmouseenter={() => (selectedIndex = index)}
							>
								<div class="result-icon">
									<UIcon icon={result.icon} classes="text-[var(--accent-text)]" />
								</div>
								<div class="result-content">
									<span class="result-name">{result.name}</span>
									<span class="result-type">{result.type}</span>
								</div>
								{#if index === selectedIndex}
									<div class="result-hint">
										<kbd>↵</kbd>
									</div>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.search-modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 10vh 20px 20px;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		animation: fadeIn 0.15s ease-out;
	}

	.search-modal {
		width: 100%;
		max-width: 640px;
		background-color: var(--main);
		border-radius: 12px;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		overflow: hidden;
		animation: slideDown 0.2s ease-out;
		border: 1px solid var(--border);
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border-bottom: 1px solid var(--border);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 16px;
		color: var(--main-text);
		font-family: inherit;

		&::placeholder {
			color: var(--tertiary-text);
		}
	}

	.keyboard-hint {
		padding: 4px 8px;
		background-color: var(--main-hover);
		border: 1px solid var(--border);
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
		color: var(--secondary-text);
	}

	.search-results {
		max-height: 400px;
		overflow-y: auto;
	}

	.search-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		gap: 16px;
	}

	.keyboard-shortcuts {
		display: flex;
		gap: 24px;
		margin-top: 20px;

		.shortcut {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 13px;
			color: var(--tertiary-text);

			kbd {
				padding: 4px 8px;
				background-color: var(--main-hover);
				border: 1px solid var(--border);
				border-radius: 4px;
				font-size: 12px;
				font-weight: 500;
			}
		}
	}

	.result-summary {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 12px 20px;
		font-size: 13px;
		border-bottom: 1px solid var(--border);
	}

	.result-list {
		padding: 8px;
	}

	.result-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 12px;
		border: none;
		background: transparent;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.15s;
		text-align: left;

		&:hover,
		&.selected {
			background-color: var(--main-hover);
		}

		&.selected {
			outline: 2px solid var(--border-hover);
			outline-offset: -2px;
		}
	}

	.result-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		background-color: var(--main-hover);
		border: 1px solid var(--border);
	}

	.result-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.result-name {
		font-size: 14px;
		font-weight: 500;
		color: var(--main-text);
	}

	.result-type {
		font-size: 12px;
		color: var(--tertiary-text);
		text-transform: capitalize;
	}

	.result-hint {
		kbd {
			padding: 4px 8px;
			background-color: var(--accent-hover);
			border: 1px solid var(--border-hover);
			border-radius: 4px;
			font-size: 12px;
			font-weight: 500;
			color: var(--accent-text);
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
</style>
