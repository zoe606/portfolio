<script>
	// Simple back button using browser history
</script>

<button class="back-button" on:click={() => history.back()}>Back</button>

<style>
	/* Custom styling for the button */
	.back-button {
		background-color: transparent;
		color: var(--your-button-text-color);
		font-weight: bold; /* Make the text bold */
		font-size: 16px; /* Adjust the font size as needed */
		padding: 10px 20px;
		border: 2px solid var(--your-button-text-color); /* Add a border for clarity */
		border-radius: 20px; /* Adjust the value to control the roundness */
		cursor: pointer;
		transition:
			background-color 0.3s,
			color 0.3s; /* Add transition for smooth hover effect */
	}

	.back-button:hover {
		background-color: var(--your-button-text-color); /* Change background color on hover */
		color: var(--your-button-hover-text-color); /* Change text color on hover */
	}
</style>
