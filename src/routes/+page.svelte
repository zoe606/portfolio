<script lang="ts">
	import { resolve } from '$app/paths';
	import { HOME, PROJECTS, EXPERIENCES } from '$lib/params';
	import { ContractType } from '$lib/types';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { scrollReveal } from '$lib/animations/actions';
	import { REVEAL } from '$lib/animations/presets';

	const { title, description, role, location, headline, intro, spotlight, highlights } = HOME;

	const projectHref = (slug: string) => resolve('/projects/[slug]', { slug });

	const timeline = EXPERIENCES.items
		.filter((item) => item.contract === ContractType.FullTime)
		.toSorted((a, b) => a.no - b.no);

	const sideProject = PROJECTS.items.find((item) => item.slug === HOME.sideProject);
	const sideProjectSite = sideProject?.links[0];

	const years = (period: { from: Date; to?: Date }) =>
		`${period.from.getFullYear()} — ${period.to ? period.to.getFullYear() : 'now'}`;
</script>

<TabTitle {title} {description} path="/" />

<section class="flex flex-wrap items-center gap-12 pb-16 pt-24" use:scrollReveal>
	<div class="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
		<p class="label text-bp-accent">{role} · {location}</p>
		<h1 class="m-0 font-display text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold leading-[1.04]">
			{headline}
		</h1>
		<p class="max-w-140 text-lg leading-relaxed text-bp-muted">{intro}</p>
	</div>

	<figure class="panel m-0 flex min-w-0 flex-[1_1_400px] flex-col gap-4 p-7">
		<figcaption class="label text-bp-muted">Fig. 1 · {spotlight.caption}</figcaption>
		<div class="flow">
			{#each spotlight.flow as step, i (step)}
				{#if i > 0}
					<span aria-hidden="true" class="font-mono text-lg">→</span>
				{/if}
				<span class={['flow-step', i === 1 && 'flow-switch', i === 2 && 'flow-target']}>
					{step}
				</span>
			{/each}
		</div>
		<dl class="m-0 grid grid-cols-3 gap-3 border-t border-bp-line pt-4">
			{#each spotlight.stats as stat (stat.label)}
				<div class="flex flex-col-reverse">
					<dt class="text-sm text-bp-muted">{stat.label}</dt>
					<dd class="m-0 font-display text-[26px] font-bold">{stat.value}</dd>
				</div>
			{/each}
		</dl>
		<a href={projectHref(spotlight.project)} class="font-mono text-sm py-3">Open the case →</a>
	</figure>
</section>

<section class="flex flex-col gap-6 pt-20" aria-labelledby="highlights">
	<h2 id="highlights" class="label m-0 text-bp-muted">02 / Before → after</h2>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
		{#each highlights as item, i (item.project)}
			<article
				class="panel flex flex-col gap-3.5 p-7"
				use:scrollReveal={{ delay: i * REVEAL.stagger }}
			>
				<p class="label text-bp-muted">{item.meta}</p>
				<p class="flex flex-wrap items-baseline gap-3 font-display font-bold">
					<span class="text-[32px] text-bp-muted">{item.before}</span>
					<span aria-hidden="true" class="text-2xl">→</span>
					<span class="text-5xl text-bp-accent">{item.after}</span>
				</p>
				<h3 class="m-0 font-display text-[21px] font-semibold">{item.title}</h3>
				<p class="leading-relaxed text-bp-muted">{item.summary}</p>
				<a href={projectHref(item.project)} class="mt-auto py-3 font-mono text-sm">
					Open the case →
				</a>
			</article>
		{/each}
	</div>
</section>

<section class="flex flex-col gap-6 pt-24" aria-labelledby="timeline" use:scrollReveal>
	<h2 id="timeline" class="label m-0 text-bp-muted">03 / Timeline</h2>
	<div class="panel overflow-x-auto px-7 py-8">
		<ol
			class="m-0 grid min-w-215 list-none p-0"
			style:grid-template-columns={`repeat(${timeline.length}, minmax(0, 1fr))`}
		>
			{#each timeline as job, i (job.slug)}
				<li class={['timeline-item', i === 0 && 'timeline-current']}>
					<a href={resolve('/experience/[slug]', { slug: job.slug })} class="decoration-none">
						<span class="label block">{years(job.period)}</span>
						<span class="mt-1.5 block font-display text-lg font-semibold text-bp-ink">
							{job.company}
						</span>
						<span class="mt-1 block text-sm text-bp-muted">{job.name}</span>
					</a>
				</li>
			{/each}
		</ol>
	</div>
</section>

{#if sideProject}
	<section class="flex flex-col gap-6 pt-24" aria-labelledby="side-project" use:scrollReveal>
		<h2 id="side-project" class="label m-0 text-bp-muted">04 / Side project</h2>
		<div
			class="flex flex-wrap items-center justify-between gap-6 bg-bp-inverse p-9 text-bp-oninverse"
		>
			<div class="flex min-w-0 flex-[1_1_520px] flex-col gap-2.5">
				<h3 class="m-0 font-display text-[28px] font-bold">{sideProject.name}</h3>
				<p class="leading-relaxed text-bp-oninversemuted">{sideProject.shortDescription}</p>
			</div>
			<div class="flex flex-wrap gap-3">
				{#if sideProjectSite}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={sideProjectSite.to} class="inverse-button" target="_blank" rel="noreferrer">
						Visit {sideProject.name} ↗
					</a>
				{/if}
				<a href={projectHref(sideProject.slug)} class="inverse-button inverse-button-ghost">
					Details
				</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.label {
		margin: 0;
		font-family: var(--mono-f);
		font-size: 13px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.panel {
		background: var(--bp-surface);
		border: 2px solid var(--bp-ink);
	}

	.panel a {
		color: var(--bp-ink);
	}

	.panel a:hover {
		color: var(--bp-accent);
	}

	.flow {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr;
		align-items: center;
		gap: 8px;
	}

	.flow-step {
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: stretch;
		padding: 12px 8px;
		border: 1.5px dashed var(--bp-muted);
		color: var(--bp-muted);
		font-family: var(--mono-f);
		font-size: 13px;
		text-align: center;
	}

	.flow-switch {
		border: 2px solid var(--bp-accent);
		color: var(--bp-accent);
		font-weight: 500;
	}

	.flow-target {
		border: 2px solid var(--bp-inverse);
		background: var(--bp-inverse);
		color: var(--bp-on-inverse);
	}

	.timeline-item {
		padding: 16px 16px 0 0;
		border-top: 6px solid var(--bp-ink);
	}

	.timeline-item .label {
		color: var(--bp-muted);
	}

	.timeline-current {
		border-top-color: var(--bp-accent);
	}

	.timeline-current .label {
		color: var(--bp-accent);
	}

	.timeline-item a:hover span {
		color: var(--bp-accent);
	}

	.inverse-button {
		display: inline-flex;
		align-items: center;
		min-height: 48px;
		padding: 0 22px;
		background: var(--bp-on-inverse);
		color: var(--bp-inverse);
		font-family: var(--mono-f);
		font-size: 14px;
		text-decoration: none;
	}

	.inverse-button-ghost {
		background: none;
		color: var(--bp-on-inverse);
		border: 1px solid var(--bp-on-inverse-muted);
	}

	.inverse-button:hover {
		background: var(--bp-accent);
		color: var(--bp-on-accent);
		border-color: var(--bp-accent);
	}
</style>
