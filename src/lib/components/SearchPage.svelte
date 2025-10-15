<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import CommonPage from './CommonPage.svelte';
	import { Input } from '$lib/components/ui';
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';

	interface Props {
		title?: string;
		search?: string;
		onsearch?: (event: CustomEvent<{ search: string }>) => void;
		children?: Snippet;
	}

	let {
		title = 'Title',
		search = $bindable(''),
		onsearch,
		children
	}: Props = $props();

	let mounted = $state(false);

	// Trigger search callback whenever search value changes
	$effect(() => {
		if (onsearch) {
			onsearch(new CustomEvent('search', { detail: { search: search.trim().toLowerCase() } }));
		}
	});

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		search = searchParams.get('q') ?? '';
		mounted = true;
	});
</script>

<CommonPage {title}>
	<div class="w-100% row">
		<Input bind:value={search} placeholder={'Search...'} />
	</div>
	<div class="w-100% col flex-1">
		{@render children?.()}
	</div>
</CommonPage>
