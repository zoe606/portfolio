<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher();

	function closeDialog() {
		open = false;
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDialog();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeDialog();
		}
	}
</script>

{#if open}
	<div
		class="dialog-overlay fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
		on:click={handleBackdropClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="0"
	>
		<div
			class={cn(
				'dialog-content relative bg-[var(--main)] border-1px border-solid border-[var(--border)] rounded-15px p-6 w-full max-w-lg max-h-90vh overflow-y-auto',
				className
			)}
		>
			<button
				type="button"
				class="dialog-close absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
				on:click={closeDialog}
				aria-label="Close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	.dialog-overlay {
		animation: fadeIn 150ms ease-out;
	}

	.dialog-content {
		animation: slideIn 150ms ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
