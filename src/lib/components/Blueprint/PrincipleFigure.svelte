<script lang="ts">
	import { playOnView } from '#lib/animations/actions.js';
	import type { PrincipleFigure } from '#lib/types.js';

	interface Props {
		figure: PrincipleFigure;
	}

	let { figure }: Props = $props();
</script>

<!-- Every style below shows the final state by default. playOnView adds the
     start state and the animation only when motion is allowed. -->
<div class="figure" use:playOnView>
	{#if figure.kind === 'switch'}
		<div class="switch">
			<span class="end end-from">{figure.from}</span>
			<span class="track" aria-hidden="true"><span class="knob"></span></span>
			<span class="end end-to">{figure.to}</span>
		</div>
		<p class="rollback">
			<span aria-hidden="true">↺</span>
			{figure.note}
		</p>
	{:else if figure.kind === 'bars'}
		<div class="flex flex-col gap-4">
			{#each figure.bars as bar (bar.label)}
				<div class="flex flex-col gap-1.5">
					<p class="flex justify-between gap-3 font-mono text-xs text-bp-muted">
						<span>{bar.label}</span>
						<span class="whitespace-nowrap"
							>{bar.before}% → <strong class="text-bp-accent">{bar.after}%</strong></span
						>
					</p>
					<div
						class="bar"
						style:--before={`${bar.before}%`}
						style:--after={`${bar.after}%`}
						aria-hidden="true"
					>
						<span class="bar-before"></span>
						<span class="bar-fill"></span>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<ol class="days" aria-label={`${figure.days} days`}>
			{#each { length: figure.days }, i (i)}
				<li class={['day', i === figure.days - 1 && 'day-last']} style:--i={i}></li>
			{/each}
		</ol>
		<p class="flex justify-between font-mono text-xs text-bp-muted">
			<span>day 1</span>
			<span class="text-bp-accent">day {figure.days} · {figure.label}</span>
		</p>
	{/if}
</div>

<style>
	.figure {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 12px;
		min-height: 120px;
	}

	/* Switch: the knob moves from the old system to the new one. */
	.switch {
		display: grid;
		grid-template-columns: 1fr 72px 1fr;
		align-items: center;
		gap: 10px;
		font-family: var(--mono-f);
		font-size: 13px;
		text-align: center;
		text-transform: uppercase;
	}

	.end {
		padding: 10px 6px;
		border: 1.5px dashed var(--bp-muted);
		color: var(--bp-muted);
		transition: all 300ms ease 700ms;
	}

	.end-to {
		border: 2px solid var(--bp-accent);
		background: var(--bp-accent);
		color: var(--bp-on-accent);
	}

	.track {
		position: relative;
		height: 32px;
		border: 2px solid var(--bp-ink);
		border-radius: 999px;
	}

	.knob {
		position: absolute;
		top: 3px;
		left: calc(100% - 25px);
		width: 22px;
		height: 22px;
		border-radius: 999px;
		background: var(--bp-accent);
		transition: left 600ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;
	}

	.rollback {
		font-family: var(--mono-f);
		font-size: 12px;
		color: var(--bp-muted);
		text-align: center;
	}

	.figure:global([data-motion='ready']) .knob {
		left: 3px;
	}

	.figure:global([data-motion='ready']) .end-to {
		border: 1.5px dashed var(--bp-muted);
		background: none;
		color: var(--bp-muted);
	}

	/* Bars: the accent fill grows from "before" to "after". The faded part is the "before" value. */
	.bar {
		position: relative;
		height: 14px;
		background: var(--bp-surface-2);
	}

	.bar-before,
	.bar-fill {
		position: absolute;
		inset: 0 auto 0 0;
	}

	.bar-before {
		z-index: 1;
		width: var(--before);
		border-right: 2px solid var(--bp-ink);
		background: color-mix(in srgb, var(--bp-surface) 55%, transparent);
	}

	.bar-fill {
		width: var(--after);
		background: var(--bp-accent);
		transition: width 1200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;
	}

	.figure:global([data-motion='ready']) .bar-fill {
		width: var(--before);
	}

	/* Days: the squares fill one by one, and the last one is the release. */
	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.day {
		aspect-ratio: 1;
		border: 1.5px solid var(--bp-line);
		background: color-mix(in srgb, var(--bp-accent) 35%, transparent);
		transition: background 200ms ease calc(var(--i) * 80ms);
	}

	.day-last {
		border: 2px solid var(--bp-accent);
		background: var(--bp-accent);
	}

	.figure:global([data-motion='ready']) .day {
		background: none;
	}
</style>
