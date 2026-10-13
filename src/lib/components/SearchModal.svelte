<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import UIcon from './Icon/UIcon.svelte';
	import { plural } from '#lib/utils/helpers.js';
	import { PortfolioSearch, type SearchResultItem } from '#lib/utils/search.js';
	import MY_EXPERIENCES from '#lib/experiences.params.js';
	import MY_PROJECTS from '#lib/projects.params.js';
	import MY_SKILLS from '#lib/skills.params.js';

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
		goto(resolve(result.to));
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
		class="backdrop"
		onclick={handleBackdropClick}
		onkeydown={(e) => e.key === 'Escape' && close()}
		role="dialog"
		aria-modal="true"
		aria-label="Search"
		tabindex="-1"
	>
		<div class="bp-panel modal">
			<div class="input-row">
				<UIcon icon="i-carbon-search" classes="text-xl text-bp-muted" />
				<input
					bind:this={inputElement}
					bind:value={query}
					type="text"
					placeholder="Search projects, skills, experience"
					class="input"
					aria-label="Search"
				/>
				<kbd>ESC</kbd>
			</div>

			<div class="results">
				{#if query.trim().length === 0}
					<div class="empty">
						<span>Start typing to search.</span>
						<div class="flex flex-wrap justify-center gap-6">
							<span class="shortcut"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
							<span class="shortcut"><kbd>↵</kbd> Select</span>
							<span class="shortcut"><kbd>ESC</kbd> Close</span>
						</div>
					</div>
				{:else if results.length === 0}
					<div class="empty">
						<span>No results for "{query}".</span>
					</div>
				{:else}
					<p class="bp-label summary">
						{plural(results.length, 'result')}
						{#if resultCount.projects > 0}
							· {plural(resultCount.projects, 'project')}
						{/if}
						{#if resultCount.experiences > 0}
							· {plural(resultCount.experiences, 'experience')}
						{/if}
						{#if resultCount.skills > 0}
							· {plural(resultCount.skills, 'skill')}
						{/if}
					</p>

					<div class="list">
						{#each results as result, index (result.to)}
							<button
								class="item"
								class:selected={index === selectedIndex}
								onclick={() => navigateToResult(result)}
								onmouseenter={() => (selectedIndex = index)}
							>
								<span class="bp-label type">{result.type}</span>
								<span class="name">{result.name}</span>
								{#if index === selectedIndex}
									<kbd>↵</kbd>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 10vh 16px 16px;
		background-color: rgb(11 27 51 / 0.55);
		animation: fade-in 0.15s ease-out;
	}

	.modal {
		width: 100%;
		max-width: 640px;
		overflow: hidden;
		box-shadow: 8px 8px 0 var(--bp-ink);
		animation: slide-down 0.2s ease-out;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border-bottom: 2px solid var(--bp-ink);
	}

	.input {
		flex: 1;
		min-width: 0;
		background: transparent;
		outline: none;
		color: var(--bp-ink);
		font: inherit;
		font-size: 16px;
	}

	.input::placeholder {
		color: var(--bp-muted);
	}

	kbd {
		padding: 2px 8px;
		border: 1px solid var(--bp-line);
		background: var(--bp-surface-2);
		color: var(--bp-muted);
		font-family: var(--mono-f);
		font-size: 12px;
	}

	.results {
		max-height: 400px;
		overflow-y: auto;
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		padding: 48px 20px;
		color: var(--bp-muted);
		text-align: center;
	}

	.shortcut {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
	}

	.summary {
		padding: 12px 20px;
		border-bottom: 1px solid var(--bp-line);
		color: var(--bp-muted);
	}

	.list {
		padding: 8px;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		min-height: 48px;
		padding: 8px 12px;
		background: transparent;
		color: var(--bp-ink);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.item.selected {
		background: var(--bp-surface-2);
		outline: 2px solid var(--bp-accent);
		outline-offset: -2px;
	}

	.type {
		width: 92px;
		flex-shrink: 0;
		color: var(--bp-accent);
	}

	.name {
		flex: 1;
		min-width: 0;
		font-weight: 500;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-12px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.backdrop,
		.modal {
			animation: none;
		}
	}
</style>
