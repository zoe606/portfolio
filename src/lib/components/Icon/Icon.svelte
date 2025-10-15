<script lang="ts">
	import type { Icons } from '$lib/utils';
	import { viewBox } from './Icons';

	interface Props {
		icon: Icons;
		size?: string;
		color?: string;
	}

	let { icon, size = '30px', color = 'var(--main-text)' }: Props = $props();

	let el: SVGElement = $state()!;
</script>

<svg
	bind:this={el}
	class="inline-block"
	viewBox={viewBox(icon)}
	fill={color}
	height={size}
	width={size}
>
	<path d={icon} />
</svg>
