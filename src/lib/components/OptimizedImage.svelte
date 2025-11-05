<script lang="ts">
	/**
	 * OptimizedImage Component
	 *
	 * A wrapper component that demonstrates best practices for image optimization
	 * using lazy loading, modern formats, and responsive sizing.
	 *
	 * Usage:
	 * <OptimizedImage src="/logos/svelte.png" alt="Svelte Logo" />
	 *
	 * For dynamic imports with vite-imagetools:
	 * import logo from '/static/logos/svelte.png?w=300&format=webp';
	 * <OptimizedImage src={logo} alt="Svelte Logo" />
	 */

	interface Props {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		loading?: 'lazy' | 'eager';
		class?: string;
		sizes?: string;
		objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
	}

	let {
		src,
		alt,
		width,
		height,
		loading = 'lazy',
		class: className = '',
		sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
		objectFit = 'contain'
	}: Props = $props();

	// Determine object-fit class
	const objectFitClass = objectFit !== 'contain' ? `object-${objectFit}` : 'object-contain';
</script>

<img
	{src}
	{alt}
	{loading}
	{width}
	{height}
	{sizes}
	class="{className} {objectFitClass}"
	decoding="async"
/>

<style>
	img {
		max-width: 100%;
		height: auto;
	}
</style>
