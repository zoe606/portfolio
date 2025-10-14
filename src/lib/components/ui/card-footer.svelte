<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string = '';
	export { className as class };

	$: footerClasses = cn('flex items-center p-25px pt-0', className);
</script>

<div class={footerClasses}>
	<slot />
</div>
