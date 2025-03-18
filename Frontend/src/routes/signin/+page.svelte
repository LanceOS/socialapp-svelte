<script lang="ts">
	import { goto } from '$app/navigation';
	import PBClient from '$lib/classes/Pocketbase.js';

	const validations = $state({
		email: '',
		password: ''
	});

	async function signIn(data: any) {
		await PBClient.auth.signIn(data);
		goto('/');
	}
</script>

<main class="h-screen bg-gray-50 flex flex-col py-12 px-4 gap-4 items-center justify-center">
	<h1 class="text-2xl sm:text-4xl font-bold">Svelte App</h1>
	<form
		action="signin"
		class="bg-white w-full sm:w-xl flex flex-col gap-12 items-center px-8 py-16 rounded-lg"
		onsubmit={() => signIn(validations)}
	>
		<div class="w-full flex flex-col gap-6">
			<div class="flex flex-col gap-2 bg-gray-200 py-2 px-4">
				<label for="email">Email <span class="text-red-500">*</span></label>
				<input
					type="email"
					name="email"
					aria-label="Enter your email"
					placeholder="example@example.com"
					bind:value={validations.email}
					class="focus:outline-0"
				/>
			</div>
			<div class="flex flex-col gap-2 bg-gray-200 py-2 px-4">
				<label for="password">Password <span class="text-red-500">*</span></label>
				<input
					type="password"
					name="password"
					aria-label="Enter your password"
					bind:value={validations.password}
					class="focus:outline-0"
				/>
			</div>
		</div>
		<button
			type="submit"
			aria-label="Sign In"
			class="curosr-pointer w-full text-white bg-black rounded-md text-xl py-4">Sign In</button
		>
	</form>
</main>
