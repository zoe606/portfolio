<script lang="ts">
	import { EDUCATION } from '$lib/params';
	import { formatYears } from '$lib/utils/helpers';
	import PageHeader from '$lib/components/Blueprint/PageHeader.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { scrollReveal } from '$lib/animations/actions';
	import { REVEAL } from '$lib/animations/presets';

	const { items, title, description } = EDUCATION;
</script>

<TabTitle {title} {description} path="/education" />

<PageHeader label="Index · Education" {title} {description} />

<ol class="m-0 flex list-none flex-col gap-4 p-0">
	{#each items as education, i (education.slug)}
		<li
			class="bp-panel grid gap-x-8 gap-y-4 p-6 md:grid-cols-[150px_minmax(0,1fr)]"
			use:scrollReveal={{ direction: 'left', delay: i * REVEAL.stagger }}
		>
			<p class="bp-label pt-1 text-bp-muted">{formatYears(education.period)}</p>
			<div class="flex min-w-0 flex-col gap-3">
				<div class="flex flex-col gap-1.5">
					<h2 class="m-0 font-display text-xl font-semibold">{education.organization}</h2>
					<p>{education.degree} · {education.location}</p>
				</div>
				<p class="max-w-160 leading-relaxed text-bp-muted">{education.description}</p>
				<div class="flex flex-col gap-2 pt-2">
					<h3 class="bp-label text-bp-muted">Coursework</h3>
					<ul class="m-0 flex list-none flex-wrap gap-2 p-0">
						{#each education.subjects as subject (subject)}
							<li class="subject">{subject}</li>
						{/each}
					</ul>
				</div>
			</div>
		</li>
	{/each}
</ol>

<style>
	.subject {
		padding: 6px 12px;
		border: 1px solid var(--bp-line);
		background: var(--bp-surface-2);
		font-family: var(--mono-f);
		font-size: 13px;
	}
</style>
