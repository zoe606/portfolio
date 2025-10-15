<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		class?: string;
		orientation?: 'horizontal' | 'vertical';
	}

	let { class: className = '', orientation = 'horizontal' }: Props = $props();

	let separatorClasses = $derived(
		cn(
			'shrink-0 bg-[var(--border)]',
			orientation === 'horizontal' ? 'h-1px w-full' : 'h-full w-1px',
			className
		)
	);
</script>

<div class={separatorClasses} role="separator" aria-orientation={orientation}></div>
