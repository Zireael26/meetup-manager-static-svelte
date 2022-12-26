<script lang="ts">
	// import { createEventDispatcher } from 'svelte';
	import type Meetup from '../../models/meetup';
	import Button from '../Button.svelte';
	import meetups from '../../../store/meetups-store';

	export let meetupId: string;
	let meetup: Meetup;
	const possibleMeetup = $meetups.find((meetup) => meetup.id === meetupId);
	if (possibleMeetup) {
		meetup = possibleMeetup;
	} else {
		meetup = {
			id: meetupId,
			title: 'Meetup not found',
			subtitle: 'Please try again later',
			description: 'This meetup could not be found. Please try again later.',
			imageUrl:
				'https://images.unsplash.com/photo-1517436073-3b8b0b0c5f0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			address: '404 Not Found',
			contactEmail: 'help@google.com'
		} as Meetup;
	}
</script>

<section>
	<div class="image" />
	<img src={meetup.imageUrl} alt={meetup.title} />
	<div class="content">
		<h1>{meetup.title}</h1>
		<h2>{meetup.subtitle}</h2>
		<p>{meetup.description}</p>
		<div class="address">
			<address>{meetup.address}</address>
			<Button>Show on Map</Button>
		</div>
		<Button href="mailto:{meetup.contactEmail}">Contact</Button>
		<Button mode="outline">Close</Button>
	</div>
</section>

<style>
</style>
