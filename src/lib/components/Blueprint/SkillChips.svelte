<script lang="ts">
	import { resolve } from '$app/paths';
	import { getAssetURL } from '#lib/data/assets.js';
	import type { Skill } from '#lib/types.js';

	interface Props {
		skills: Array<Skill>;
	}

	let { skills }: Props = $props();
</script>

<ul class="m-0 flex list-none flex-wrap gap-2 p-0">
	{#each skills as skill (skill.slug)}
		<li>
			<a href={resolve('/skills/[slug]', { slug: skill.slug })} class="chip">
				<!-- A white tile keeps dark logos visible on the dark theme. -->
				<img src={getAssetURL(skill.logo)} alt="" width="20" height="20" />
				{skill.name}
			</a>
		</li>
	{/each}
</ul>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		min-height: 44px;
		padding: 0 14px 0 8px;
		border: 1px solid var(--bp-line);
		background: var(--bp-surface);
		color: var(--bp-ink);
		font-family: var(--mono-f);
		font-size: 13px;
		text-decoration: none;
	}

	.chip:hover {
		border-color: var(--bp-accent);
		color: var(--bp-accent);
	}

	img {
		padding: 2px;
		background: #ffffff;
		object-fit: contain;
	}
</style>
