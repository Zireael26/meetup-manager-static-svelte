<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type Meetup from '../../models/meetup';
	import Button from '../Button.svelte';
	import Modal from '../Modal.svelte';
	import TextInput from '../TextInput.svelte';
	import { notEmpty } from '../../../utils/validation';

	import meetups from '../../../store/meetups-store';

	const dispatch = createEventDispatcher();

	$: titleValid = notEmpty(editedMeetup.title);
	$: subtitleValid = notEmpty(editedMeetup.subtitle);
	$: descriptionValid = notEmpty(editedMeetup.description);
	$: addressValid = notEmpty(editedMeetup.address);
	$: contactEmailValid =
		notEmpty(editedMeetup.contactEmail) && editedMeetup.contactEmail.includes('@');
	$: formSubmittable =
		titleValid &&
		subtitleValid &&
		descriptionValid &&
		addressValid &&
		contactEmailValid &&
		editedMeetup.imageUrl.length > 0;

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
		if (formSubmittable && editedMeetup.id !== nextMeetupId) {
			meetups.editMeetup(editedMeetup.id, editedMeetup);
		} else if (formSubmittable && editedMeetup.id === nextMeetupId) {
			meetups.addMeetup(editedMeetup);
		}
		dispatch('modalactionclose');
	}

	function setTitle(event: Event) {
		const target = event.target as HTMLInputElement;
		editedMeetup.title = target.value;
	}

	function setSubtitle(event: Event) {
		const target = event.target as HTMLInputElement;
		editedMeetup.subtitle = target.value;
	}

	function setDescription(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		editedMeetup.description = target.value;
	}

	function setAddress(event: Event) {
		const target = event.target as HTMLInputElement;
		editedMeetup.address = target.value;
	}

	function setImageUrl(event: Event) {
		const target = event.target as HTMLInputElement;
		editedMeetup.imageUrl = target.value;
	}

	function setContactEmail(event: Event) {
		const target = event.target as HTMLInputElement;
		editedMeetup.contactEmail = target.value;
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
			isValid={titleValid}
			validationErrorMessage="Please enter a valid title"
			on:input={setTitle}
		/>
		<TextInput
			id="subtitle"
			label="Subtitle"
			value={editedMeetup.subtitle}
			isValid={subtitleValid}
			validationErrorMessage="Please enter a valid subtitle"
			on:input={setSubtitle}
		/>
		<TextInput
			id="description"
			label="Description"
			value={editedMeetup.description}
			isValid={descriptionValid}
			validationErrorMessage="Please enter a valid description"
			on:input={setDescription}
			controlType="textarea"
		/>
		<TextInput
			id="address"
			label="Address"
			value={editedMeetup.address}
			isValid={addressValid}
			validationErrorMessage="Please enter a valid address"
			on:input={setAddress}
		/>
		<TextInput
			id="image"
			label="Image URL"
			value={editedMeetup.imageUrl}
			isValid={editedMeetup.imageUrl.length > 0}
			validationErrorMessage="Please enter a valid image URL"
			on:input={setImageUrl}
		/>
		<TextInput
			id="email"
			label="Contact Email"
			value={editedMeetup.contactEmail}
			isValid={contactEmailValid}
			validationErrorMessage="Please enter a valid email address"
			on:input={setContactEmail}
			controlType="email"
		/>
	</form>
	<div class="form-actions" slot="actions">
		<Button type="button" mode="outline" on:click={() => dispatch('modalactioncancel')}
			>Cancel</Button
		>
		<Button type="button" disabled={!formSubmittable} on:click={submitForm}>Save</Button>
	</div>
</Modal>

<style>
	form {
		width: 100%;
	}
</style>
