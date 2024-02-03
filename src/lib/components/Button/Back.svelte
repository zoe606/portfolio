<script>
	import { base } from '$app/paths';
</script>

<button class="back-button" on:click={() => history.back()}>Back To Project Page</button>

<style>
	/* Add your custom styling for the button */
	.back-button {
		background-color: transparent;
		color: var(--your-button-text-color);
		/* Add other styling properties as needed */
		padding: 10px 20px;
		border: none;
		border-radius: 20px; /* Adjust the value to control the roundness */
		cursor: pointer;
	}
</style>
