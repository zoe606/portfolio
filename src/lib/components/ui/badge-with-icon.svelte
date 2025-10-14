<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { theme } from '$lib/stores/theme';

	export let name = '';
	export let logo = '';
	export let inverted = false;
	export let grayscale = true;
	export let href: string | undefined = undefined;
	export let variant: 'default' | 'secondary' | 'outline' = 'outline';
	let className: string = '';
	export { className as class };

	const variants = {
		default:
			'border-transparent bg-[var(--light-1)] text-[var(--dark-1)] hover:bg-[var(--light-2)]',
		secondary:
			'border-transparent bg-[var(--tertiary)] text-[var(--secondary-text)] hover:bg-[var(--tertiary-hover)]',
		outline: 'text-[var(--tertiary-text)] border-[var(--border)] hover:bg-[var(--main-hover)]'
	};

	$: baseClasses =
		'inline-flex items-center row-center relative rounded-10px border-1px border-solid p-10px m-r-5px m-b-5px decoration-none duration-150ms hover:border-[var(--border-hover)]';
	$: cursorClass = href ? 'cursor-pointer' : 'cursor-help';
	$: grayscaleClass = grayscale ? 'grayscale-65 hover:grayscale-0' : '';
	$: variantClass = variants[variant];
	$: combinedClasses = cn(baseClasses, variantClass, cursorClass, grayscaleClass, className);
</script>

<svelte:element this={href ? 'a' : 'div'} {href} class={combinedClasses} data-help={name}>
	{#if $$slots.default}
		<slot />
	{:else}
		<img
			class={cn('w-15px h-15px', inverted && 'invert-100')}
			class:badge-icon-logo-inverted={$theme && inverted}
			src={logo}
			alt={name}
		/>
	{/if}
</svelte:element>

<style lang="scss">
	[data-help]:hover:after {
		content: attr(data-help);
		display: inline-block;
		position: absolute;
		width: max-content;
		background-color: var(--secondary);
		padding: 5px 10px;
		left: 10px;
		top: calc(100% + 0px);
		border: 1px solid var(--border);
		border-radius: 15px;
		z-index: 10;
	}

	.badge-icon-logo-inverted {
		filter: invert(100);
	}
</style>
