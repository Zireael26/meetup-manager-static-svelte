<script lang="ts">
	import type Meetup from '../models/meetup';
	import MeetupGrid from '../components/meetups/MeetupGrid.svelte';
	import EditMeetup from '../components/meetups/EditMeetup.svelte';
	import Button from '../components/Button.svelte';

	$: nextMeetupId = 'm' + (Number(meetups[0].id.split('')[1]) + 1);

	let editMode = '';

	let meetups: Meetup[] = [
		{
			id: 'm2',
			title: 'Coding Bootcamp',
			subtitle: 'Learn to code in 2 hours',
			description: 'In this meetup, we will have experts that teach you how to code!',
			imageUrl:
				'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/01/09151859/coding-bootcamp-1024x486.png',
			address: '27th Nerd Road, 32523 New York',
			contactEmail: 'code@google.com',
			isFavorite: true
		},
		{
			id: 'm1',
			title: 'Swim Together',
			subtitle: "Let's go for some swimming",
			description: 'We will simply swim some rounds!',
			imageUrl:
				'https://assets.thehansindia.com/h-upload/2022/06/19/1298595-young-swimmers-hone-skills-.webp',
			address: '27th Nerd Road, 32523 New York',
			contactEmail: 'swim@google.com',
			isFavorite: false
		}
	];

	function addMeetup(event: CustomEvent<Meetup>) {
		meetups = [event.detail, ...meetups];
		editMode = '';
	}

	function toggleFavorite(event: CustomEvent<{ id: string }>) {
		const meetupIndex = meetups.findIndex((meetup) => meetup.id === event.detail.id);
		meetups[meetupIndex].isFavorite = !meetups[meetupIndex].isFavorite;
	}

	function toggleAddMode() {
		if (editMode === 'add') {
			editMode = '';
			return;
		}
		editMode = 'add';
	}
</script>

<main>
	<Button on:click={toggleAddMode}>
		{#if editMode === 'add'}
			Show All Meetups
		{:else}
			Add New Meetup
		{/if}
	</Button>
	{#if editMode === 'add'}
		<EditMeetup {nextMeetupId} on:savemeetup={addMeetup} />
	{:else}
		<MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
	{/if}
</main>

<style>
	main {
		/* top right bottom left */
		margin: 5rem 1rem 0 1rem;
	}
</style>
