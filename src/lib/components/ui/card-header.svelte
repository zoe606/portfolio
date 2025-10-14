<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string = '';
	export { className as class };

	$: headerClasses = cn('flex flex-col space-y-6px p-25px', className);
</script>

<div class={headerClasses}>
	<slot />
</div>
