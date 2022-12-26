import type Meetup from '$lib/models/meetup';
import { writable } from 'svelte/store';

const meetups = writable([
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
] as Meetup[]);

const customMeetupsStore = {
	subscribe: meetups.subscribe,
	addMeetup: (meetupData: Meetup) => {
		const newMeetup = {
			...meetupData
		};
		meetups.update((items) => {
			return [newMeetup, ...items];
		});
	},
	toggleFavorite: (id: string) => {
		meetups.update((items) => {
			const meetupIndex = items.findIndex((m) => m.id === id);
			const updatedMeetup = { ...items[meetupIndex] };
			updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
			items[meetupIndex] = updatedMeetup;
			return [...items];
		});
	},
	editMeetup: (id: string, meetupData: Meetup) => {
		meetups.update((items) => {
			const meetupIndex = items.findIndex((m) => m.id === id);
			// What a cool line of code! It's like a spread operator, but it also allows you to overwrite properties of the object.
			const updatedMeetup = { ...items[meetupIndex], ...meetupData };
			items[meetupIndex] = updatedMeetup;
			return [...items];
		});
	},
	deleteMeetup: (id: string) => {
		meetups.update((items) => {
			return items.filter((m) => m.id !== id);
		});
	},
	getById: (id: string) => {
		let existingMeetup: Meetup | undefined;
		meetups.subscribe((items) => {
			existingMeetup = items.find((m) => m.id === id);
		});
		return existingMeetup;
	}
};

export default customMeetupsStore;
