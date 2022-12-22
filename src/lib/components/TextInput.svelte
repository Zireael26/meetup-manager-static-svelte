<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string;
	export let controlType = 'text';
	export let rows = 3;
	export let isValid = true;
	export let validationErrorMessage: string;

	let touched = false;
	function markAsTouched() {
		touched = true;
	}
</script>

<div class="form-control">
	<label for={id}>{label}</label>
	{#if controlType === 'textarea'}
		<textarea
			class:invalid={!isValid && touched}
			{id}
			{rows}
			{value}
			on:input
			on:blur={markAsTouched}
		/>
	{:else}
		<input
			class:invalid={!isValid && touched}
			type={controlType}
			{id}
			{value}
			on:input
			on:blur={markAsTouched}
		/>
	{/if}

	{#if !isValid && validationErrorMessage && touched}
		<p class="error-message">{validationErrorMessage}</p>
	{/if}
</div>

<style>
	input,
	textarea {
		display: block;
		width: 100%;
		font: inherit;
		border: none;
		border-bottom: 2px solid #ccc;
		border-radius: 3px 3px 0 0;
		background: white;
		padding: 0.15rem 0.25rem;
		transition: border-color 0.1s ease-out;
	}
	input:focus,
	textarea:focus {
		border-color: #e40763;
		outline: none;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		width: 100%;
	}
	.form-control {
		padding: 0.5rem 0;
		width: 100%;
		margin: 0.25rem 0;
	}
	.invalid {
		border-color: red;
		background-color: #fde3e3;
	}
	.error-message {
		color: red;
		margin: 0.25rem 0;
	}
</style>
