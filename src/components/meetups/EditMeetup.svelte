<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type Meetup from '../../models/meetup';
	import Button from '../Button.svelte';
	import Modal from '../Modal.svelte';
	import TextInput from '../TextInput.svelte';

	const dispatch = createEventDispatcher();

	$: formSubmittable =
		editedMeetup.title.trim().length > 0 &&
		editedMeetup.subtitle.trim().length > 0 &&
		editedMeetup.description.trim().length > 0 &&
		editedMeetup.address.trim().length > 0 &&
		editedMeetup.contactEmail.trim().length > 0;

	export let meetup: Meetup = {
		id: '',
		title: '',
		subtitle: '',
		description: '',
		imageUrl:
			'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/01/09151859/coding-bootcamp-1024x486.png',
		address: '',
		isFavorite: false,
		contactEmail: '@google.com'
	};

	export let nextMeetupId = '';
	let editedMeetup = { ...meetup };

	function submitForm() {
		if (editedMeetup.id === '') {
			editedMeetup.id = nextMeetupId;
		}
		if (formSubmittable) dispatch('savemeetup', editedMeetup);
	}

	function setValue(event: Event, attributeKey: keyof Meetup) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		editedMeetup[attributeKey] = target.value;
	}
</script>

<Modal
	title={meetup.id === '' ? 'Add Meetup' : 'Edit Meetup'}
	on:modalactionclose
	on:modalactioncancel
>
	<form>
		<TextInput
			id="title"
			label="Title"
			value={editedMeetup.title}
			on:input={(event) => setValue(event, 'title')}
		/>
		<TextInput
			id="subtitle"
			label="Subtitle"
			value={editedMeetup.subtitle}
			on:input={(event) => setValue(event, 'subtitle')}
		/>
		<TextInput
			id="description"
			label="Description"
			value={editedMeetup.description}
			on:input={(event) => setValue(event, 'description')}
			controlType="textarea"
		/>
		<TextInput
			id="address"
			label="Address"
			value={editedMeetup.address}
			on:input={(event) => setValue(event, 'address')}
		/>
		<TextInput
			id="image"
			label="Image URL"
			value={editedMeetup.imageUrl}
			on:input={(event) => setValue(event, 'imageUrl')}
		/>
		<TextInput
			id="email"
			label="Contact Email"
			value={editedMeetup.contactEmail}
			on:input={(event) => setValue(event, 'contactEmail')}
			controlType="email"
		/>
	</form>
	<div class="form-actions" slot="actions">
		<Button type="button" mode="outline" on:click={() => dispatch('modalactioncancel')}
			>Cancel</Button
		>
		<Button type="button" on:click={submitForm}>Save</Button>
	</div>
</Modal>

<style>
	form {
		width: 100%;
	}
</style>
