<script lang="ts">
	import MeetupGrid from '../lib/components/meetups/MeetupGrid.svelte';
	import EditMeetup from '../lib/components/meetups/EditMeetup.svelte';
	import Button from '../lib/components/Button.svelte';
	import meetups from '../store/meetups-store';
	import MeetupDetails from '$lib/components/meetups/MeetupDetails.svelte';

	$: nextMeetupId = 'm' + (Number($meetups[0].id.split('')[1]) + 1);

	let editMode = '';
	let editMeetupId = '';
	let page = 'overview';
	let pageId = '';
	let favoritesOnly = false;

	function toggleAddMode() {
		if (editMode === 'add') {
			editMode = '';
			return;
		}
		editMode = 'add';
	}

	function showDetails(event: CustomEvent) {
		pageId = event.detail.id;
		page = 'details';
	}

	function closeDetails() {
		page = 'overview';
		pageId = '';
	}

	function closeModal() {
		editMode = '';
	}

	function editMeetup(event: CustomEvent) {
		editMeetupId = event.detail.id;
		editMode = 'edit';
	}
</script>

<main>
	{#if page === 'overview'}
		<div class="add-meetup-action">
			{#if editMode !== 'add'}
				<Button on:click={toggleAddMode}>Add New Meetup</Button>
				<Button mode="outline" on:click={() => (favoritesOnly = !favoritesOnly)}
					>{favoritesOnly ? 'Show All' : 'Show Favorites'}</Button
				>
			{/if}
		</div>
		{#if editMode === 'add'}
			<EditMeetup
				{nextMeetupId}
				on:modalactionclose={closeModal}
				on:modalactioncancel={closeModal}
			/>
		{:else if editMode === 'edit'}
			<EditMeetup
				meetup={$meetups.find((meetup) => meetup.id === editMeetupId)}
				on:modalactionclose={closeModal}
				on:modalactioncancel={closeModal}
			/>
		{/if}
		<MeetupGrid
			meetups={favoritesOnly ? $meetups.filter((mtp) => mtp.isFavorite) : $meetups}
			on:showdetails={showDetails}
			on:editmeetup={editMeetup}
		/>
	{:else}
		<MeetupDetails meetupId={pageId} on:close={closeDetails} />
	{/if}
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
