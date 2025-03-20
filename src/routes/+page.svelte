<script>
	import App from '$lib/classes/App.js';
	import Nav from '../components/navbar/+page.svelte';
	import CreatePost from '../components/Posts/post-create/+page.svelte';

	const user = $derived(App.user.retrieve());
	const isAuthed = $derived(App.user.isAuthed());
</script>

<div class="flex flex-col md:flex-row max-w-7xl mx-auto bg-base-100 text-base-content">
	<Nav />
	<main class="border-2 min-h-screen w-full flex">
		<!-- post section -->
		<div class="w-full">
			{#if isAuthed}
				<CreatePost />
			{:else}
				<section>
					<p>Placeholder</p>
				</section>
			{/if}
		</div>
		<div class="w-1/4"></div>
	</main>
</div>
