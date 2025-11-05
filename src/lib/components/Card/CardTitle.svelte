<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="font-[var(--title-f)] text-1.25em font-semibold">{title}</div>
