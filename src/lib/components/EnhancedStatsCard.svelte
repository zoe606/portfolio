<script lang="ts">
	import { base } from '$app/paths';
	import { changeColorOpacity } from '$lib/utils/color';
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
	role={href ? undefined : 'group'}
	class="enhanced-stats-card decoration-none border-1px border-solid border-[var(--border)] rounded-15px relative duration transition-all hover:border-[var(--border-hover)]"
>
	<div class="card-bg flex-1 flex flex-col p-25px rounded-15px">
		<div class="col-center gap-20px">
			<div class="text-5xl font-bold text-[var(--main-text)] leading-none">
				{value}
			</div>
			<div class="col-center gap-5px">
				<div class="text-base text-[var(--main-text)] font-medium text-center">
					{label}
				</div>
				{#if subtitle}
					<div class="text-xs text-[var(--secondary-text)] text-center font-light">
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
	}

	.card-bg {
		&:hover {
			background-color: var(--bg-color);
			background-image: radial-gradient(
				circle at var(--drop-x) var(--drop-y),
				var(--drop-color),
				transparent
			);
		}
	}
</style>
