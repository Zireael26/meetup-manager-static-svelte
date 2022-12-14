<script lang="ts">
</script>

<header>
	<h1>MeetUs</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/settings">Settings</a>
	</nav>
</header>

<slot />

<style>
	header {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 4rem;
		background-color: #cf0056;
		display: flex;
		align-items: center;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
	}

	header h1 {
		color: white;
		font-family: 'Roboto Slab', 'serif';
		margin-left: 1rem;
	}

	header nav {
		margin-right: 1rem;
		margin-left: auto;
	}

	header nav a {
		color: white;
		text-decoration: none;
		margin-left: 1rem;
	}

	:global(main) {
		margin-top: 4rem;
		font-family: 'Lato', 'sans-serif';
	}
</style>
