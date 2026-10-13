<script lang="ts">
	interface Props {
		items: Array<string>;
	}

	let { items }: Props = $props();
</script>

<ol class="bp-panel m-0 list-none p-0">
	{#each items as item, i (item)}
		<li class="flex gap-5 border-t border-bp-line px-7 py-5 first:border-t-0">
			<span class="bp-label pt-1 text-bp-accent" aria-hidden="true">
				{String(i + 1).padStart(2, '0')}
			</span>
			<p class="leading-relaxed">{item}</p>
		</li>
	{/each}
</ol>
