<script lang="ts">
	import type Meetup from '../models/meetup';
	import MeetupGrid from '../components/meetups/MeetupGrid.svelte';
	import TextInput from '../components/TextInput.svelte';
	import Button from '../components/Button.svelte';

	let newMeetup: Meetup = {
		id: 'm3',
		title: '',
		subtitle: '',
		description: '',
		imageUrl:
			'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/01/09151859/coding-bootcamp-1024x486.png',
		address: '',
		isFavorite: false,
		contactEmail: '@google.com'
	};

	let meetups: Meetup[] = [
		{
			id: 'm1',
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
			id: 'm2',
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

	function addMeetup() {
		meetups = [{ ...newMeetup }, ...meetups];
		resetForm();
	}

	function resetForm() {
		newMeetup.id = 'm' + String(Number(newMeetup.id.split('')[1]) + 1);
		newMeetup.title = '';
		newMeetup.subtitle = '';
		newMeetup.description = '';
		newMeetup.address = '';
		newMeetup.imageUrl =
			'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/01/09151859/coding-bootcamp-1024x486.png';
		newMeetup.contactEmail = '@google.com';
	}

	function setValue(event: Event, attributeKey: keyof Meetup) {
		const target = event.target as HTMLInputElement;
		newMeetup[attributeKey] = target.value;
	}

	function toggleFavorite(event: CustomEvent<{ id: string }>) {
		const meetupIndex = meetups.findIndex((meetup) => meetup.id === event.detail.id);
		meetups[meetupIndex].isFavorite = !meetups[meetupIndex].isFavorite;
	}
</script>

<main>
	<form on:submit|preventDefault={addMeetup}>
		<TextInput
			id="title"
			label="Title"
			value={newMeetup.title}
			on:input={(event) => setValue(event, 'title')}
		/>
		<TextInput
			id="subtitle"
			label="Subtitle"
			value={newMeetup.subtitle}
			on:input={(event) => setValue(event, 'subtitle')}
		/>
		<TextInput
			id="description"
			label="Description"
			value={newMeetup.description}
			on:input={(event) => setValue(event, 'description')}
			controlType="textarea"
		/>
		<TextInput
			id="address"
			label="Address"
			value={newMeetup.address}
			on:input={(event) => setValue(event, 'address')}
		/>
		<TextInput
			id="image"
			label="Image URL"
			value={newMeetup.imageUrl}
			on:input={(event) => setValue(event, 'imageUrl')}
		/>
		<TextInput
			id="email"
			label="Contact Email"
			value={newMeetup.contactEmail}
			on:input={(event) => setValue(event, 'contactEmail')}
			controlType="email"
		/>
		<div class="form-actions">
			<Button type="submit">Save</Button>
		</div>
	</form>
	<MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>

<style>
	main {
		margin-top: 5rem;
	}
	form {
		width: 30rem;
		max-width: 90%;
		margin: auto 1rem;
	}
</style>
