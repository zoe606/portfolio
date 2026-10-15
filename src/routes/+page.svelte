<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { HOME, PROJECTS, EXPERIENCES, RESUME } from '#lib/params.js';
	import { ContractType, Platform } from '#lib/types.js';
	import TabTitle from '#lib/components/TabTitle.svelte';
	import PrincipleFigure from '#lib/components/Blueprint/PrincipleFigure.svelte';
	import { playOnView, scrollReveal } from '#lib/animations/actions.js';
	import { REVEAL } from '#lib/animations/presets.js';
	import { formatYears } from '#lib/utils/helpers.js';
	import { buildPersonJsonLd } from '#lib/utils/seo.js';

	const { title, role, location, headline, intro, spotlight, highlights, principles } = HOME;

	const email = HOME.links.find((link) => link.platform === Platform.Email)?.link;
	const emailHref =
		email && `mailto:${email}?subject=${encodeURIComponent('Backend engineering role')}`;
	const resumeHref = RESUME.item ? asset(RESUME.item) : undefined;

	const projectHref = (slug: string) => resolve('/projects/[slug]', { slug });

	const timeline = EXPERIENCES.items
		.filter((item) => item.contract === ContractType.FullTime)
		.toSorted((a, b) => a.no - b.no);

	const sideProject = PROJECTS.items.find((item) => item.slug === HOME.sideProject);
	const sideProjectSite = sideProject?.links[0];
</script>

<!-- home.description is the long CV summary. Without a description, TabTitle uses the shorter metadata.defaultDescription. -->
<TabTitle {title} path="/" />

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- the JSON comes from site data and buildPersonJsonLd escapes it -->
	{@html buildPersonJsonLd()}
</svelte:head>

<section class="flex flex-wrap items-center gap-12 pb-16 pt-24" use:scrollReveal>
	<div class="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
		<p class="bp-label text-bp-accent">{role} · {location}</p>
		<h1 class="m-0 font-display text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold leading-[1.04]">
			{headline}
		</h1>
		<p class="max-w-140 text-lg leading-relaxed text-bp-muted">{intro}</p>
		<div class="flex flex-wrap gap-3">
			{#if emailHref}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={emailHref} class="bp-button bp-button-primary">Email me →</a>
			{/if}
			{#if resumeHref}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={resumeHref} download class="bp-button">Download CV ↓</a>
			{/if}
		</div>
	</div>

	<figure class="bp-panel m-0 flex min-w-0 flex-[1_1_400px] flex-col gap-4 p-7">
		<figcaption class="bp-label text-bp-muted">Fig. 1 · {spotlight.caption}</figcaption>
		<div class="flow">
			<span class="flow-current" aria-hidden="true"></span>
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
					<dd class="fx-neon m-0 font-display text-[26px] font-bold" use:playOnView>
						{stat.value}
					</dd>
				</div>
			{/each}
		</dl>
		<a href={projectHref(spotlight.project)} class="font-mono text-sm py-3">Open the case →</a>
	</figure>
</section>

<section class="flex flex-col gap-6 pt-20" aria-labelledby="highlights">
	<h2 id="highlights" class="bp-label m-0 text-bp-muted">02 / Before → after</h2>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
		{#each highlights as item, i (item.project)}
			<article
				class="bp-panel flex flex-col gap-3.5 p-7"
				use:scrollReveal={{ delay: i * REVEAL.stagger }}
			>
				<p class="bp-label text-bp-muted">{item.meta}</p>
				<p class="flex flex-wrap items-baseline gap-3 font-display font-bold">
					<span class="text-[32px] text-bp-muted">{item.before}</span>
					<span aria-hidden="true" class="text-2xl">→</span>
					<span class="fx-neon text-5xl text-bp-accent" use:playOnView>{item.after}</span>
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

<section class="flex flex-col gap-6 pt-24" aria-labelledby="principles">
	<h2 id="principles" class="bp-label m-0 text-bp-muted">03 / How I work</h2>
	<ol class="m-0 flex list-none flex-col gap-5 p-0">
		{#each principles as item, i (item.title)}
			<li class="principle bp-panel" use:scrollReveal={{ delay: i * REVEAL.stagger }}>
				<div class="flex min-w-0 flex-col gap-4">
					<span class="bp-label text-bp-accent">Principle {String(i + 1).padStart(2, '0')}</span>
					<h3 class="m-0 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold leading-[1.08]">
						{item.title}
					</h3>
					<p class="max-w-130 leading-relaxed text-bp-muted">{item.proof}</p>
					{#if item.project}
						<a href={projectHref(item.project)} class="mt-auto self-start py-3 font-mono text-sm">
							See the proof →
						</a>
					{/if}
				</div>
				<figure class="principle-figure m-0">
					<figcaption class="bp-label text-bp-muted">Fig. 3.{i + 1}</figcaption>
					<PrincipleFigure figure={item.figure} />
					<p class="flex flex-col border-t border-bp-line pt-4">
						<span
							class="fx-neon font-display text-[44px] font-bold leading-none text-bp-accent"
							use:playOnView
						>
							{item.stat.value}
						</span>
						<span class="mt-1.5 text-sm text-bp-muted">{item.stat.label}</span>
					</p>
				</figure>
			</li>
		{/each}
	</ol>
</section>

<section class="flex flex-col gap-6 pt-24" aria-labelledby="timeline" use:scrollReveal>
	<h2 id="timeline" class="bp-label m-0 text-bp-muted">04 / Timeline</h2>
	<div class="bp-panel overflow-x-auto px-7 py-8">
		<ol
			class="timeline m-0 grid min-w-215 list-none p-0"
			style:grid-template-columns={`repeat(${timeline.length}, minmax(0, 1fr))`}
		>
			<li class="timeline-pulse" aria-hidden="true"></li>
			{#each timeline as job, i (job.slug)}
				<li class={['timeline-item', i === 0 && 'timeline-current']}>
					<a href={resolve('/experience/[slug]', { slug: job.slug })} class="decoration-none">
						<span class="bp-label block">{formatYears(job.period)}</span>
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
		<h2 id="side-project" class="bp-label m-0 text-bp-muted">05 / Side project</h2>
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
	.bp-panel a {
		color: var(--bp-ink);
	}

	.bp-panel a:hover {
		color: var(--bp-accent);
	}

	.principle {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 380px);
		gap: 40px;
		padding: 36px;
	}
	.principle-figure {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
		background: var(--bp-bg);
		background-image:
			linear-gradient(var(--bp-grid) 1px, transparent 1px),
			linear-gradient(90deg, var(--bp-grid) 1px, transparent 1px);
		background-size: 16px 16px;
		border: 1px solid var(--bp-line);
	}
	@media (max-width: 760px) {
		.principle {
			grid-template-columns: minmax(0, 1fr);
			gap: 24px;
			padding: 24px;
		}
	}
	.flow {
		/* The Fig. 1 pulse moves in container units, so it can use transform. */
		container-type: inline-size;
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

	.timeline-item .bp-label {
		color: var(--bp-muted);
	}

	.timeline-current {
		border-top-color: var(--bp-accent);
	}

	.timeline-current .bp-label {
		color: var(--bp-accent);
	}

	.timeline-item a:hover span {
		color: var(--bp-accent);
	}

	/* Electric effects. They run only when the reader allows motion. */
	.flow {
		position: relative;
	}
	.flow-current {
		display: none;
	}
	.timeline {
		position: relative;
		container-type: inline-size;
	}
	.timeline-pulse {
		display: none;
	}
	@media (prefers-reduced-motion: no-preference) {
		/* Fig. 1: a pulse runs along a wire behind the three boxes, and each box lights up as it passes. */
		.flow-current {
			display: block;
			position: absolute;
			top: 50%;
			left: 0;
			z-index: 0;
			width: 64px;
			height: 2px;
			background: linear-gradient(90deg, transparent, var(--bp-accent));
			box-shadow: 0 0 10px var(--bp-accent);
			animation: fx-flow-current 3.2s linear infinite;
		}
		.flow-step {
			position: relative;
			z-index: 1;
			background-color: var(--bp-surface);
		}
		.flow-switch {
			animation: fx-flow-switch 3.2s linear infinite;
		}
		.flow-target {
			background-color: var(--bp-inverse);
			animation: fx-flow-target 3.2s linear infinite;
		}

		/* Timeline: a pulse runs from 2019 on the right to the current job on the left. */
		.timeline-pulse {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 140px;
			height: 6px;
			background: linear-gradient(90deg, var(--bp-accent), transparent);
			box-shadow: 0 0 12px var(--bp-accent);
			animation: fx-timeline-pulse 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		}
		.timeline-current {
			animation: fx-timeline-current 4s linear infinite;
		}
	}
	/* The pulses move with transform, not left. Moving left changes the layout on
	   every frame, and the browser counts each frame as a layout shift. */
	@keyframes fx-flow-current {
		0% {
			transform: translateX(0);
			opacity: 0;
		}
		5% {
			opacity: 1;
		}
		70% {
			transform: translateX(calc(100cqw - 64px));
			opacity: 1;
		}
		76%,
		100% {
			transform: translateX(calc(100cqw - 64px));
			opacity: 0;
		}
	}
	@keyframes fx-flow-switch {
		0%,
		30%,
		48%,
		100% {
			box-shadow: none;
		}
		38% {
			box-shadow:
				0 0 0 2px var(--bp-accent),
				0 0 18px var(--bp-accent);
		}
	}
	@keyframes fx-flow-target {
		0%,
		52%,
		74%,
		100% {
			box-shadow: none;
		}
		62% {
			box-shadow:
				0 0 0 2px var(--bp-accent),
				0 0 22px var(--bp-accent);
		}
	}
	@keyframes fx-timeline-pulse {
		0% {
			transform: translateX(calc(100cqw - 140px));
			opacity: 0;
		}
		5% {
			opacity: 1;
		}
		65% {
			transform: translateX(0);
			opacity: 1;
		}
		75%,
		100% {
			transform: translateX(0);
			opacity: 0;
		}
	}
	@keyframes fx-timeline-current {
		0%,
		60%,
		90%,
		100% {
			box-shadow: none;
		}
		70% {
			box-shadow: 0 -8px 16px -6px var(--bp-accent);
		}
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
