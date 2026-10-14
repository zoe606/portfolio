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
	{:else if figure.kind === 'checklist'}
		<ul class="checklist">
			{#each figure.items as item, i (item)}
				<li class="check" style:--i={i}>
					<span class="box" aria-hidden="true">✓</span>
					{item}
				</li>
			{/each}
		</ul>
		<p class="result" style:--i={figure.items.length}>{figure.result}</p>
	{:else if figure.kind === 'pipeline'}
		<ol class="pipeline">
			{#each figure.steps as step, i (step.label)}
				<li class="step" style:--i={i}>
					<span class="text-bp-muted">{String(i + 1).padStart(2, '0')}</span>
					<span>
						{step.label}
						{#if step.loop}<span class="text-bp-accent" title="repeats until it passes">↺</span
							>{/if}
					</span>
					<span class={['who', step.by.includes('me') && 'who-me']}>{step.by}</span>
				</li>
			{/each}
		</ol>
	{:else if figure.kind === 'load'}
		<div class="flex flex-col gap-1.5">
			<p class="flex justify-between gap-3 font-mono text-xs text-bp-muted">
				<span>{figure.label}</span>
				<strong class="text-bp-accent">{figure.total}</strong>
			</p>
			<div class="load" aria-hidden="true"><span class="load-fill"></span></div>
		</div>
		<dl class="counters">
			{#each figure.counters as counter (counter.label)}
				<div class="flex flex-col-reverse">
					<dt class="font-mono text-xs text-bp-muted">{counter.label}</dt>
					<dd class="counter-value">{counter.value}</dd>
				</div>
			{/each}
		</dl>
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

	/* Checklist: each risk is ticked in turn, then the result lights up. */
	.checklist {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: var(--mono-f);
		font-size: 13px;
	}

	.check {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border: 2px solid var(--bp-accent);
		background: var(--bp-accent);
		color: var(--bp-on-accent);
		font-size: 12px;
		transition: all 200ms ease calc(var(--i) * 350ms + 200ms);
	}

	.result {
		padding: 10px 12px;
		border: 2px solid var(--bp-ink);
		background: var(--bp-inverse);
		color: var(--bp-on-inverse);
		font-family: var(--mono-f);
		font-size: 14px;
		text-align: center;
		transition: all 300ms ease calc(var(--i) * 350ms + 300ms);
	}

	.figure:global([data-motion='ready']) .box {
		border-color: var(--bp-muted);
		background: none;
		color: transparent;
	}

	.figure:global([data-motion='ready']) .result {
		border-style: dashed;
		border-color: var(--bp-muted);
		background: none;
		color: var(--bp-muted);
	}

	/* Pipeline: the steps light up in order. My review steps are filled. */
	.pipeline {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: var(--mono-f);
		font-size: 12px;
	}

	.step {
		display: grid;
		grid-template-columns: 22px minmax(0, 1fr) auto;
		align-items: center;
		gap: 8px;
		transition: opacity 250ms ease calc(var(--i) * 180ms + 200ms);
	}

	.who {
		padding: 2px 6px;
		border: 1.5px solid var(--bp-muted);
		color: var(--bp-muted);
		font-size: 11px;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.who-me {
		border-color: var(--bp-accent);
		background: var(--bp-accent);
		color: var(--bp-on-accent);
	}

	.figure:global([data-motion='ready']) .step {
		opacity: 0.2;
	}

	/* Load: the backlog bar fills while the failure counters stay at zero. */
	.load {
		height: 14px;
		background: var(--bp-surface-2);
	}

	.load-fill {
		display: block;
		width: 100%;
		height: 100%;
		background: var(--bp-accent);
		transition: width 1600ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;
	}

	.figure:global([data-motion='ready']) .load-fill {
		width: 0;
	}

	.counters {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin: 0;
	}

	.counter-value {
		margin: 0;
		font-family: var(--title-f);
		font-size: 28px;
		font-weight: 700;
	}
</style>
