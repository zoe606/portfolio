<script lang="ts">
	import { onMount } from 'svelte';

	// Grid lines that carry a pulse, counted in 32px grid cells from the top left of the page.
	const ROWS = [5, 12, 22, 31, 47, 63, 80];
	const COLUMNS = [3, 9, 17, 26, 34, 41];

	let layer: HTMLDivElement;

	onMount(() => {
		const canHover = window.matchMedia('(pointer: fine)').matches;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!canHover || reducedMotion) return;

		let frame = 0;
		const move = (event: PointerEvent) => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const rect = layer.getBoundingClientRect();
				layer.style.setProperty('--mx', `${event.clientX - rect.left}px`);
				layer.style.setProperty('--my', `${event.clientY - rect.top}px`);
			});
		};

		window.addEventListener('pointermove', move, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', move);
		};
	});
</script>

<div class="fx-layer" bind:this={layer} aria-hidden="true">
	<div class="fx-cursor"></div>
	{#each ROWS as row, i (row)}
		<span class="fx-pulse fx-pulse-row" style:--line={row} style:--i={i}></span>
	{/each}
	{#each COLUMNS as column, i (column)}
		<span class="fx-pulse fx-pulse-column" style:--line={column} style:--i={i}></span>
	{/each}
</div>

<style>
	.fx-layer {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		/* The pulses move in container units, so they can use transform instead of left and
		   top. Moving left or top changes the layout, and the browser counts it as a layout shift. */
		container-type: size;
		pointer-events: none;
		--mx: -999px;
		--my: -999px;
	}

	.fx-cursor,
	.fx-pulse {
		display: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* Cursor glow: the grid near the pointer is drawn again in the accent color. */
		.fx-cursor {
			display: block;
			position: absolute;
			inset: 0;
			background-image:
				linear-gradient(var(--bp-accent) 1px, transparent 1px),
				linear-gradient(90deg, var(--bp-accent) 1px, transparent 1px);
			background-size: 32px 32px;
			opacity: 0.45;
			mask-image: radial-gradient(180px circle at var(--mx) var(--my), #000, transparent);
		}

		/* Grid current: a few pulses run along grid lines, like signals on a circuit board. */
		.fx-pulse {
			display: block;
			position: absolute;
			opacity: 0;
		}

		.fx-pulse-row {
			top: calc(var(--line) * 32px);
			left: 0;
			transform: translateX(-160px);
			width: 160px;
			height: 1px;
			background: linear-gradient(90deg, transparent, var(--bp-accent));
			box-shadow: 0 0 6px var(--bp-accent);
			animation: fx-row 9s linear calc(var(--i) * 1.7s) infinite;
		}

		.fx-pulse-column {
			top: 0;
			left: calc(var(--line) * 32px);
			transform: translateY(-160px);
			width: 1px;
			height: 160px;
			background: linear-gradient(180deg, transparent, var(--bp-accent));
			box-shadow: 0 0 6px var(--bp-accent);
			animation: fx-column 14s linear calc(var(--i) * 2.3s + 0.8s) infinite;
		}
	}

	@keyframes fx-row {
		0% {
			transform: translateX(-160px);
			opacity: 0.7;
		}
		45% {
			transform: translateX(100cqw);
			opacity: 0.7;
		}
		46%,
		100% {
			transform: translateX(100cqw);
			opacity: 0;
		}
	}

	@keyframes fx-column {
		0% {
			transform: translateY(-160px);
			opacity: 0.7;
		}
		60% {
			transform: translateY(100cqh);
			opacity: 0.7;
		}
		61%,
		100% {
			transform: translateY(100cqh);
			opacity: 0;
		}
	}
</style>
