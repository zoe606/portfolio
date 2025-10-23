<script lang="ts">
	import { buildPageSEO } from '$lib/utils/seo';

	export let title: string;
	export let description: string | undefined = undefined;
	export let path: string | undefined = undefined;
	export let image: string | undefined = undefined;
	export let type: 'website' | 'article' = 'website';

	const seo = buildPageSEO({ title, description, path, image, type });
</script>

<svelte:head>
	<title>{seo.title}</title>
	{#if seo.description}
		<meta name="description" content={seo.description} />
	{/if}
	{#if seo.canonical}
		<link rel="canonical" href={seo.canonical} />
	{/if}
	<meta property="og:type" content={seo.og.type} />
	<meta property="og:title" content={seo.og.title} />
	{#if seo.og.description}
		<meta property="og:description" content={seo.og.description} />
	{/if}
	{#if seo.og.url}
		<meta property="og:url" content={seo.og.url} />
	{/if}
	{#if seo.og.siteName}
		<meta property="og:site_name" content={seo.og.siteName} />
	{/if}
	{#if seo.og.image}
		<meta property="og:image" content={seo.og.image} />
	{/if}
	<meta name="twitter:card" content={seo.twitter.card} />
	<meta name="twitter:title" content={seo.twitter.title} />
	{#if seo.twitter.description}
		<meta name="twitter:description" content={seo.twitter.description} />
	{/if}
	{#if seo.twitter.image}
		<meta name="twitter:image" content={seo.twitter.image} />
	{/if}
	{#if seo.twitter.site}
		<meta name="twitter:site" content={seo.twitter.site} />
	{/if}
	{#if seo.twitter.creator}
		<meta name="twitter:creator" content={seo.twitter.creator} />
	{/if}
</svelte:head>
