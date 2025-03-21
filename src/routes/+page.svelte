<script>
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Pocketbase from 'pocketbase';
	import App from '$lib/classes/App.js';
	import Nav from '../components/navbar/nav.svelte';
	import CreatePost from '../components/Posts/post-create/card.svelte';

	const db = new Pocketbase(PUBLIC_POCKETBASE_URL);
	const isAuthed = db.authStore.isValid;
</script>

<div class="flex flex-col md:flex-row max-w-7xl mx-auto text-base-content">
	<Nav />
	<main class="border-2 min-h-screen w-full flex">
		<!-- post section -->
		<div class="w-full">
			{#if isAuthed}
				<CreatePost />
			{:else}
				<section class="flex items-center justify-center w-full h-24">
					<p>Loading...</p>
				</section>
			{/if}
		</div>
		<div class="w-1/4"></div>
	</main>
</div>
