<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string = '';
	export { className as class };

	$: cardClasses = cn(
		'rounded-15px border-1px border-solid border-[var(--border)] bg-[var(--main)] text-[var(--tertiary-text)]',
		className
	);
</script>

<div class={cardClasses}>
	<slot />
</div>
