<script lang="ts">
	import type { Metric } from '#lib/types.js';

	interface Props {
		metrics: Array<Metric>;
	}

	let { metrics }: Props = $props();
</script>

<dl class="bp-panel m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-7">
	{#each metrics as metric (metric.label)}
		<div class="flex flex-col-reverse gap-1">
			<dt class="text-sm text-bp-muted">{metric.label}</dt>
			<dd class="m-0 font-display text-4xl font-bold text-bp-accent">{metric.value}</dd>
		</div>
	{/each}
</dl>
