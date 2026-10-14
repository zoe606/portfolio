<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { TITLE_SUFFIX } from '#lib/params.js';
	import PageHeader from '#lib/components/Blueprint/PageHeader.svelte';

	const notFound = $derived(page.status === 404);
	const title = $derived(notFound ? 'Page not found' : 'Something went wrong');
</script>

<svelte:head>
	<title>{title} | {TITLE_SUFFIX}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHeader
	label={`ERR-${page.status}`}
	{title}
	description={notFound
		? 'This page does not exist, or it moved. These pages do:'
		: (page.error?.message ?? 'The page failed to load. Try again, or go to one of these pages:')}
>
	<nav class="flex flex-wrap gap-3 pt-4" aria-label="Pages">
		<a href={resolve('/')} class="bp-button bp-button-primary">Home</a>
		<a href={resolve('projects')} class="bp-button">Projects</a>
		<a href={resolve('resume')} class="bp-button">CV</a>
	</nav>
</PageHeader>
