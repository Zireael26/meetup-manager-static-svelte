<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Meetup from '../../models/meetup';
	import Button from '../Button.svelte';
	import meetups from '../../../store/meetups-store';

	const dispatch = createEventDispatcher();
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

	function closeModal() {
		dispatch('close');
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
			<!-- <Button>Show on Map</Button> -->
		</div>
		<Button href="mailto:{meetup.contactEmail}">Contact</Button>
		<Button mode="outline" on:click={closeModal}>Close</Button>
	</div>
</section>

<style>
	.image {
		width: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image {
		background: #e7e7e7;
	}

	.content {
		text-align: center;
		width: 80%;
		margin: auto;
	}

	h1 {
		font-size: 2rem;
		font-family: 'Roboto Slab', sans-serif;
		margin: 0.5rem 0;
	}

	h2 {
		font-size: 1.25rem;
		color: #6b6b6b;
	}

	p {
		font-size: 1.5rem;
	}
</style>
