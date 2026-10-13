<script lang="ts">
	import { resolve } from '$app/paths';
	import { EXPERIENCES } from '#lib/params.js';
	import { formatYears } from '#lib/utils/helpers.js';
	import PageHeader from '#lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '#lib/components/TabTitle.svelte';
	import { scrollReveal } from '#lib/animations/actions.js';
	import { REVEAL } from '#lib/animations/presets.js';

	const { items, title, description } = EXPERIENCES;

	const experiences = items.toSorted((a, b) => a.no - b.no);
</script>

<TabTitle {title} {description} path="/experience" />

<PageHeader label="Index · Career" {title} {description} />

<ol class="m-0 flex list-none flex-col gap-4 p-0">
	{#each experiences as job, i (job.slug)}
		<li
			class="bp-panel entry relative grid gap-x-8 gap-y-3 p-6 md:grid-cols-[150px_minmax(0,1fr)_auto]"
			use:scrollReveal={{ direction: 'left', delay: i * REVEAL.stagger }}
		>
			<p class={['bp-label pt-1', job.period.to ? 'text-bp-muted' : 'text-bp-accent']}>
				{formatYears(job.period)}
			</p>
			<div class="flex min-w-0 flex-col gap-1.5">
				<h2 class="m-0 font-display text-xl font-semibold">
					<a href={resolve('/experience/[slug]', { slug: job.slug })} class="stretched">
						{job.company}
					</a>
				</h2>
				<p>{job.name} · {job.location}</p>
				<p class="leading-relaxed text-bp-muted">{job.shortDescription}</p>
			</div>
			<p class="bp-label text-bp-muted md:pt-1">{job.contract}</p>
		</li>
	{/each}
</ol>

<style>
	.entry:hover {
		border-color: var(--bp-accent);
	}

	.entry:has(.stretched:focus-visible) {
		outline: 2px solid var(--bp-accent);
		outline-offset: 2px;
	}

	.stretched {
		color: var(--bp-ink);
		text-decoration: none;
	}

	/* Makes the whole entry clickable while the link stays the only focus stop. */
	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.stretched:focus-visible {
		outline: none;
	}
</style>
