<script lang="ts">
	import { playOnView } from '#lib/animations/actions.js';
	import type { Decision } from '#lib/types.js';

	interface Props {
		decisions: Array<Decision>;
	}

	let { decisions }: Props = $props();
</script>

<!-- Each decision shows the option turned down next to the option chosen. The
     final state is the default; playOnView first shows both options alike. -->
<ol class="m-0 flex list-none flex-col gap-5 p-0">
	{#each decisions as decision, i (decision.title)}
		<li class="bp-panel flex flex-col gap-5 p-6" use:playOnView>
			<div class="flex flex-col gap-2">
				<h3 class="flex flex-wrap items-baseline gap-3 font-display text-xl font-bold">
					<span class="bp-label text-bp-accent">DEC-{String(i + 1).padStart(2, '0')}</span>
					{decision.title}
				</h3>
				<p class="text-bp-muted">{decision.problem}</p>
			</div>
			<div class="fork">
				<div class="branch branch-rejected">
					<span class="bp-label"><span aria-hidden="true">✕</span> Turned down</span>
					<p class="branch-text">{decision.rejected}</p>
				</div>
				<div class="branch branch-chosen">
					<span class="bp-label"><span aria-hidden="true">✓</span> Chose</span>
					<p>{decision.choice}</p>
				</div>
			</div>
			<dl class="fork">
				<div class="flex flex-col gap-1">
					<dt class="bp-label text-bp-muted">Cost</dt>
					<dd>{decision.tradeoff}</dd>
				</div>
				<div class="flex flex-col gap-1">
					<dt class="bp-label text-bp-accent">Proof</dt>
					<dd class="font-semibold">{decision.proof}</dd>
				</div>
			</dl>
		</li>
	{/each}
</ol>

<style>
	h3,
	p,
	dl,
	dd {
		margin: 0;
	}

	p,
	dd {
		line-height: 1.6;
	}

	.fork {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
		gap: 12px;
	}

	@media (max-width: 640px) {
		.fork {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.branch {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 14px;
		transition: all 400ms ease;
	}

	.branch-rejected {
		border: 1.5px dashed var(--bp-muted);
		color: var(--bp-muted);
		transition-delay: 300ms;
	}

	.branch-rejected .branch-text {
		text-decoration: line-through;
	}

	.branch-chosen {
		border: 2px solid var(--bp-accent);
		background: var(--bp-accent);
		color: var(--bp-on-accent);
		transition-delay: 800ms;
	}

	/* Start state: both options look the same until the decision plays. */
	li:global([data-motion='ready']) .branch {
		border: 1.5px dashed var(--bp-ink);
		background: none;
		color: var(--bp-ink);
	}

	li:global([data-motion='ready']) .branch-rejected .branch-text {
		text-decoration: none;
	}
</style>
