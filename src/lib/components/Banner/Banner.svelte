<script lang="ts">
	export let img = '';
	export let useDefaultDimensions = true;
	export let classes = '';
</script>

<div
	style={`--bg-img:url(${img})`}
	class={`row w-[100%] ${
		useDefaultDimensions
			? 'min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] px-4 md:px-10'
			: ''
	} items-center skill-cover  ${classes}`}
>
	<div class="p-x-2 col flex-1">
		<slot />
	</div>
</div>

<style lang="scss">
	.skill-cover {
		background:
			linear-gradient(90deg, var(--main) 0%, var(--main) 55%, var(--main-60) 130%),
			no-repeat 110% 45% / 50% var(--bg-img);
		border-block-end: 1px solid var(--border);

		@media (max-width: 1024px) {
			background:
				linear-gradient(90deg, var(--main) 0%, var(--main) 70%, var(--main-60) 120%),
				no-repeat 120% 50% / 45% var(--bg-img);
		}

		@media (max-width: 768px) {
			background:
				linear-gradient(180deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%),
				no-repeat center top / 100% var(--bg-img);
			background-size: cover;
			text-align: center;
		}

		@media (max-width: 480px) {
			background: var(--main);
			background-image: linear-gradient(180deg, var(--main-60) 0%, var(--main) 100%);
		}
	}
</style>
