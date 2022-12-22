<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let title: string;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('modalactionclose');
	}

	function cancel() {
		dispatch('modalactioncancel');
	}

	function handleEscapeKey(event: KeyboardEvent) {
		if (event.key === 'escape') {
			cancel();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			cancel();
		}
	}
</script>

<div class="backdrop" on:click={handleBackdropClick} on:keypress={handleEscapeKey} />
<div class="modal">
	<h1>{title}</h1>
	<div class="content">
		<slot />
	</div>
	<footer>
		<slot name="actions">
			<Button on:click={closeModal}>Close</Button>
		</slot>
	</footer>
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}
	.modal {
		position: fixed;
		top: 15vh;
		left: 25%;
		width: 50%;
		z-index: 100;
		background-color: white;
		border-radius: 3px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	}
	.modal h1 {
		font-size: 1.25rem;
		margin: 0;
		padding: 1rem;
		border-bottom: 1px solid #ccc;
	}
	.modal .content {
		padding: 1rem;
	}
	.modal footer {
		padding: 1rem;
		border-top: 1px solid #ccc;
		display: flex;
		justify-content: flex-end;
	}
	@media (max-width: 768px) {
		.modal {
			top: 10vh;
			left: 5%;
			width: 90%;
		}
	}
</style>
