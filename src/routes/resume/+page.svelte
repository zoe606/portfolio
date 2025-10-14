<script>
	import { Badge } from '$lib/components/ui';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { RESUME } from '$lib/params';

	const { item, title } = RESUME;
</script>

<CommonPage {title}>
	<div class="resume">
		{#if item}
			<a href={item} title="Download Resume">
				<Badge class="text-1.25em" alt="Download Icon">Download</Badge>
			</a>
		{:else}
			<Badge>Ooops! No CV at the moment.</Badge>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.resume {
		display: flex;
		justify-content: center;
		margin-top: 20px;

		& > a {
			color: inherit;
		}
	}
</style>
