<script lang="ts">
	import UIcon from './Icon/UIcon.svelte';
	import { base } from '$app/paths';

	interface Props {
		value: string | number;
		label: string;
		icon?: string;
		href?: string;
	}

	let { value, label, icon, href }: Props = $props();
</script>

{#if href}
	<a
		href={`${base}${href}`}
		class="stats-card flex flex-col items-center justify-center p-20px rounded-lg bg-[var(--main-hover)] border-1px border-[var(--border)] transition-all hover:border-[var(--accent-text)] hover:shadow-xl hover:-translate-y-2px decoration-none cursor-pointer"
	>
		{#if icon}
			<div class="m-b-10px">
				<UIcon {icon} classes="text-[var(--accent-text)]" size="28px" />
			</div>
		{/if}
		<div class="text-4xl font-bold text-[var(--primary-text)] m-b-5px">
			{value}
		</div>
		<div class="text-sm text-[var(--tertiary-text)] text-center font-medium">
			{label}
		</div>
	</a>
{:else}
	<div
		class="stats-card flex flex-col items-center justify-center p-20px rounded-lg bg-[var(--main-hover)] border-1px border-[var(--border)]"
	>
		{#if icon}
			<div class="m-b-10px">
				<UIcon {icon} classes="text-[var(--accent-text)]" size="28px" />
			</div>
		{/if}
		<div class="text-4xl font-bold text-[var(--primary-text)] m-b-5px">
			{value}
		</div>
		<div class="text-sm text-[var(--tertiary-text)] text-center font-medium">
			{label}
		</div>
	</div>
{/if}

<style>
	.stats-card {
		min-width: 140px;
	}

	a.stats-card:hover {
		transform: translateY(-4px);
	}
</style>
