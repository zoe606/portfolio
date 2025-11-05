# Image Optimization Guide

This project uses `vite-imagetools` for automatic image optimization. Images are automatically converted to modern formats (WebP, AVIF) and generated in multiple sizes for responsive images.

## Basic Usage

### 1. Import with Query Parameters

The simplest way to use optimized images:

```svelte
<script>
	// Import image with optimization query parameter
	import myImage from '$lib/assets/photo.jpg?imagetools';
</script>

<img src={myImage} alt="Description" />
```

### 2. Responsive Images (Picture Element)

For maximum optimization, use the `picture` element with multiple formats:

```svelte
<script>
	// Import multiple formats
	import myImageWebP from '$lib/assets/photo.jpg?format=webp&w=400;800;1200';
	import myImageAVIF from '$lib/assets/photo.jpg?format=avif&w=400;800;1200';
	import myImageJPG from '$lib/assets/photo.jpg?w=400;800;1200';
</script>

<picture>
	<source srcset={myImageAVIF} type="image/avif" />
	<source srcset={myImageWebP} type="image/webp" />
	<img src={myImageJPG} alt="Description" loading="lazy" />
</picture>
```

### 3. Specific Width

Generate image at specific width:

```svelte
<script>
	import thumbnail from '$lib/assets/photo.jpg?w=300&h=300&fit=cover&format=webp';
</script>

<img src={thumbnail} alt="Thumbnail" width="300" height="300" />
```

## Available Query Parameters

### Format Options

- `format=webp` - Convert to WebP (modern, good compression)
- `format=avif` - Convert to AVIF (best compression, newest)
- `format=jpg` - Keep as JPEG
- `format=png` - Convert to PNG
- `format=webp;avif;jpg` - Generate multiple formats

### Size Options

- `w=800` - Width in pixels
- `h=600` - Height in pixels
- `w=400;800;1200` - Generate multiple sizes (for srcset)

### Quality

- `quality=80` - Set quality (1-100, default: 80)

### Fit Options

- `fit=cover` - Crop to fill dimensions
- `fit=contain` - Fit within dimensions
- `fit=inside` - Resize to fit inside dimensions
- `fit=outside` - Resize to fit outside dimensions

### Position (when using fit=cover)

- `position=center` (default)
- `position=top`
- `position=bottom`
- `position=left`
- `position=right`

## Advanced Examples

### Logo with Multiple Sizes

```svelte
<script>
	import logo from '$lib/assets/logo.png?w=100;200;300&format=webp';
</script>

<img
	srcset={logo}
	sizes="(max-width: 768px) 100px, (max-width: 1024px) 200px, 300px"
	src={logo}
	alt="Company Logo"
/>
```

### Banner with Art Direction

```svelte
<script>
	import bannerMobile from '$lib/assets/banner.jpg?w=800&h=600&fit=cover&format=webp';
	import bannerDesktop from '$lib/assets/banner.jpg?w=1920&h=600&fit=cover&format=webp';
</script>

<picture>
	<source media="(max-width: 768px)" srcset={bannerMobile} />
	<source media="(min-width: 769px)" srcset={bannerDesktop} />
	<img src={bannerDesktop} alt="Banner" class="w-full" />
</picture>
```

### Avatar with Blur Placeholder

```svelte
<script>
	import avatar from '$lib/assets/avatar.jpg?w=200&h=200&fit=cover&format=webp';
	import avatarBlur from '$lib/assets/avatar.jpg?w=20&h=20&blur=10&format=webp';
</script>

<div class="relative">
	<img
		src={avatarBlur}
		alt="Avatar placeholder"
		class="absolute inset-0 w-full h-full"
		aria-hidden="true"
	/>
	<img src={avatar} alt="User Avatar" loading="lazy" class="relative w-full h-full" />
</div>
```

## Performance Tips

1. **Always use `loading="lazy"`** for images below the fold
2. **Use WebP/AVIF** for better compression (50-70% smaller)
3. **Generate multiple sizes** for responsive images
4. **Set explicit width/height** to prevent layout shift
5. **Use blur placeholders** for better perceived performance

## Example Component

Here's a complete example of an optimized image component:

```svelte
<!-- src/lib/components/OptimizedImage.svelte -->
<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		widths?: string;
		loading?: 'lazy' | 'eager';
		class?: string;
	}

	let {
		src,
		alt,
		widths = '400;800;1200',
		loading = 'lazy',
		class: className = ''
	}: Props = $props();

	// Dynamically construct import paths
	// Note: This is a simplified example. In practice, you'd use dynamic imports
	// or pass pre-imported image objects
</script>

<img
	{src}
	{alt}
	{loading}
	class={className}
	sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## Migration Guide

To migrate existing images:

1. **Find all image imports:**

   ```bash
   rg "from.*\.(jpg|png|jpeg|gif|svg)" --type ts --type svelte
   ```

2. **Add query parameters:**

   ```diff
   - import logo from '$lib/assets/logo.png';
   + import logo from '$lib/assets/logo.png?w=300&format=webp';
   ```

3. **Add lazy loading:**
   ```diff
   - <img src={logo} alt="Logo" />
   + <img src={logo} alt="Logo" loading="lazy" />
   ```

## Build Output

When you build, vite-imagetools will:

- Generate optimized images in the `build/_app` directory
- Create WebP and AVIF versions automatically
- Generate multiple sizes for responsive images
- Add content hashes for cache busting

## References

- [vite-imagetools Documentation](https://github.com/JonasKruckenberg/imagetools)
- [Modern Image Formats Guide](https://web.dev/uses-webp-images/)
- [Responsive Images Guide](https://web.dev/responsive-images/)
