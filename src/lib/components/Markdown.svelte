<script lang="ts">
	import { gfmHeadingId } from 'marked-gfm-heading-id';
	import { mangle } from 'marked-mangle';
	import Prism from 'prismjs';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/themes/prism-tomorrow.css';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	export let content: string;

	onMount(() => {
		marked.use(gfmHeadingId());
		marked.use(mangle());

		if (window) {
			const parsed = marked.parse(content);
			container.innerHTML = DOMPurify.sanitize(parsed as string);
			Prism.highlightAllUnder(container);
		}
	});
</script>

<div bind:this={container} class="markdown-container"></div>
