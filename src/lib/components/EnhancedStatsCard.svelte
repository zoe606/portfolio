<script lang="ts">
	import { base } from '$app/paths';
	import { changeColorOpacity } from '$lib/utils/color';
	import { cardHover } from '$lib/animations/actions';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		value: string | number;
		label: string;
		subtitle?: string;
		href?: string;
		color?: string;
	}

	let el: HTMLElement;
	let { value, label, subtitle, href, color = '#ffffff00' }: Props = $props();

	const borderColor = $derived(changeColorOpacity(color, 0.5));
	const dropColor = $derived(changeColorOpacity(color, 0.15));
	const bgColor = $derived(changeColorOpacity(color, 0.01));

	$effect(() => {
		if (el) {
			el.style.setProperty('--border-color', borderColor);
			el.style.setProperty('--drop-color', dropColor);
			el.style.setProperty('--bg-color', bgColor);
		}
	});

	const onHover: MouseEventHandler<HTMLElement> = (ev) => {
		const target = ev.currentTarget;
		const rect = target.getBoundingClientRect();
		const x = ev.clientX - rect.left;
		const y = ev.clientY - rect.top;

		el.style.setProperty('--drop-x', `${x}px`);
		el.style.setProperty('--drop-y', `${y}px`);
	};
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	href={href ? `${base}${href}` : undefined}
	bind:this={el}
	onmousemove={onHover}
	use:cardHover={{ lift: 4 }}
	role={href ? undefined : 'group'}
	class="enhanced-stats-card decoration-none flex flex-col flex-1 border-1px border-solid border-[var(--border)] rounded-15px relative duration transition-all hover:border-[var(--border-hover)]"
>
	<div class="card-bg flex-1 flex flex-col rounded-15px">
		<div class="col-center card-content">
			<div class="stat-value text-[var(--main-text)] leading-none">
				{value}
			</div>
			<div class="col-center gap-5px">
				<div class="stat-label text-[var(--main-text)] font-medium text-center">
					{label}
				</div>
				{#if subtitle}
					<div class="stat-subtitle text-[var(--secondary-text)] text-center font-light">
						{subtitle}
					</div>
				{/if}
			</div>
		</div>
	</div>
</svelte:element>

<style lang="scss">
	.enhanced-stats-card {
		min-width: 160px;
		--border-color: transparent;
		--bg-color: transparent;
		--drop-color: transparent;
		--drop-x: 0;
		--drop-y: 0;

		background: linear-gradient(90deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%);
		cursor: pointer;

		@media (max-width: 480px) {
			min-width: 100%;
		}
	}

	.card-bg {
		padding: 25px;

		@media (max-width: 768px) {
			padding: 20px;
		}

		@media (max-width: 480px) {
			padding: 16px;
		}

		&:hover {
			background-color: var(--bg-color);
			background-image: radial-gradient(
				circle at var(--drop-x) var(--drop-y),
				var(--drop-color),
				transparent
			);
		}
	}

	.card-content {
		gap: 20px;

		@media (max-width: 768px) {
			gap: 16px;
		}

		@media (max-width: 480px) {
			gap: 12px;
		}
	}

	.stat-value {
		font-size: 3rem;
		font-weight: bold;

		@media (max-width: 768px) {
			font-size: 2.5rem;
		}

		@media (max-width: 480px) {
			font-size: 2rem;
		}
	}

	.stat-label {
		font-size: 1rem;

		@media (max-width: 768px) {
			font-size: 0.95rem;
		}

		@media (max-width: 480px) {
			font-size: 0.875rem;
		}
	}

	.stat-subtitle {
		font-size: 0.75rem;

		@media (max-width: 768px) {
			font-size: 0.7rem;
		}

		@media (max-width: 480px) {
			font-size: 0.65rem;
		}
	}
</style>
