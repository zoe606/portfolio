<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string = '';
	export { className as class };

	$: contentClasses = cn('p-25px pt-0', className);
</script>

<div class={contentClasses}>
	<slot />
</div>
