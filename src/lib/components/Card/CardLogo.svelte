<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		src: string;
		alt: string;
		size?: number;
		radius?: string;
		class?: string;
		classes?: string;
	}

	let {
		src,
		alt,
		size = 50,
		radius = '15px',
		class: className = '',
		classes = '',
		...restProps
	}: Props = $props();
</script>

<img
	class={cn(`rounded-${radius} aspect-square`, className, classes)}
	{src}
	{alt}
	height={size}
	width={size}
	{...restProps}
/>
