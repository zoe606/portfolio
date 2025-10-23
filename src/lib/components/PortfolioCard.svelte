<script lang="ts">
	/**
	 * Web Component Example using $host()
	 * This can be used as a custom element: <portfolio-card title="..." />
	 */

	interface Props {
		title?: string;
		description?: string;
		imageUrl?: string;
	}

	let { title = '', description = '', imageUrl = '' }: Props = $props();

	// Access the host element (only works in custom elements)
	// Uncomment when using as web component
	// import { $host } from 'svelte';
	// let host = $host<HTMLElement>();

	// $effect(() => {
	//   if (host) {
	//     // Manipulate host element
	//     host.style.display = 'block';
	//     host.setAttribute('data-initialized', 'true');
	//   }
	// });

	function handleCardClick() {
		// Dispatch custom event from web component
		const event = new CustomEvent('card-click', {
			detail: { title, description },
			bubbles: true,
			composed: true // Cross shadow DOM boundary
		});

		// this would dispatch from host if using $host()
		// host.dispatchEvent(event);
		dispatchEvent(event);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleCardClick();
		}
	}
</script>

<div
	class="portfolio-card"
	role="button"
	tabindex="0"
	aria-label={`View ${title}`}
	onclick={handleCardClick}
	onkeydown={handleKeyDown}
>
	{#if imageUrl}
		<img src={imageUrl} alt={title} class="card-image" />
	{/if}

	<div class="card-content">
		<h3 class="card-title">{title}</h3>
		{#if description}
			<p class="card-description">{description}</p>
		{/if}
	</div>
</div>

<!--
Usage as Web Component:

1. Register the component:
   import './PortfolioCard.svelte';

2. Use in HTML:
   <portfolio-card
     title="My Project"
     description="A cool project"
     image-url="/image.jpg"
   ></portfolio-card>

3. Listen to events:
   document.querySelector('portfolio-card')
     .addEventListener('card-click', (e) => {
       console.log(e.detail);
     });
-->

<style>
	.portfolio-card {
		border: 1px solid var(--border, #e0e0e0);
		border-radius: 8px;
		padding: 1rem;
		cursor: pointer;
		transition: all 150ms;
		background: var(--card-bg, white);
	}

	.portfolio-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.card-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.card-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.card-description {
		margin: 0;
		color: var(--text-secondary, #666);
		line-height: 1.5;
	}
</style>
