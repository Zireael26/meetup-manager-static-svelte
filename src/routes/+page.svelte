<script lang="ts">
	import MeetupGrid from '../lib/components/meetups/MeetupGrid.svelte';
	import EditMeetup from '../lib/components/meetups/EditMeetup.svelte';
	import Button from '../lib/components/Button.svelte';
	import meetups from '../store/meetups-store';

	$: nextMeetupId = 'm' + (Number($meetups[0].id.split('')[1]) + 1);

	let editMode = '';

	function toggleAddMode() {
		if (editMode === 'add') {
			editMode = '';
			return;
		}
		editMode = 'add';
	}

	function closeModal() {
		editMode = '';
	}
</script>

<main>
	<div class="add-meetup-action">
		{#if editMode !== 'add'}
			<Button on:click={toggleAddMode}>Add New Meetup</Button>
		{/if}
	</div>
	{#if editMode === 'add'}
		<EditMeetup {nextMeetupId} on:modalactionclose={closeModal} on:modalactioncancel={closeModal} />
	{/if}
	<MeetupGrid meetups={$meetups} />
</main>

<style>
	main {
		/* top right bottom left */
		margin: 5rem 0 0 0;
	}
	.add-meetup-action {
		margin-left: 1rem;
	}
</style>
