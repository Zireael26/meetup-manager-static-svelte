<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<span transition:slide>
	<slot />
</span>

<style>
	span {
		display: inline-block;
		margin: 0 0.25rem;
		padding: 0 0.5rem;
		border-radius: 0.25rem;
		background: #cf0056;
		color: white;
		font-family: 'Lato', sans-serif;
		font-size: 0.8rem;
	}
</style>
