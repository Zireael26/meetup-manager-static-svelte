<script lang="ts">
	import type Meetup from '../../models/meetup';
	import MeetupItem from './MeetupItem.svelte';

	export let meetups: Meetup[];
</script>

<section>
	{#each meetups as meetup (meetup.id)}
		<MeetupItem {meetup} on:togglefavorite />
	{/each}
</section>

<style>
	section {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
	}
	@media (min-width: 768px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
