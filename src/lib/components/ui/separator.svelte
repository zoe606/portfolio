<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string = '';
	export { className as class };
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';

	$: separatorClasses = cn(
		'shrink-0 bg-[var(--border)]',
		orientation === 'horizontal' ? 'h-1px w-full' : 'h-full w-1px',
		className
	);
</script>

<div class={separatorClasses} role="separator" aria-orientation={orientation} />
