<script lang="ts">
	import PBClient from '$lib/classes/Pocketbase.js';

	let validations = $state({
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	let formState = $state(1)

	async function register(data: any) {
		if(formState === 1) {
			formState + 1
		}

		const session = await PBClient.auth.register(data);
		if (session) return session;
	}
</script>

<main class="min-h-screen bg-gray-50 flex flex-col gap-8 px-6 py-6 justify-center items-center">
	<h1 class="text-2xl sm:text-4xl font-bold">Created New Account</h1>
	<form
		class="bg-white w-full sm:w-xl flex flex-col gap-12 items-center px-8 py-16 rounded-lg"
		onsubmit={() => register(validations)}
	>
		<div class="flex flex-col gap-6 w-full">
			<div class="py-2 px-4 bg-gray-200 flex flex-col">
				<label for="username mb-2">Username <span class="text-red-500">*</span></label>
				<input
					type="text"
					name="username"
					aria-label="Enter your email"
					bind:value={validations.username}
					placeholder="johndoe1234"
					class="focus:outline-0"
				/>
			</div>
			<div class="py-2 px-4 bg-gray-200 flex flex-col">
				<label for="email">Email <span class="text-red-500">*</span></label>
				<input
					type="email"
					name="email"
					aria-label="Enter your email"
					bind:value={validations.email}
					placeholder="example@gmail.com"
					class="focus:outline-0"
				/>
			</div>
			<div class="py-2 px-4 bg-gray-200 flex flex-col">
				<label for="password">Password <span class="text-red-500">*</span></label>
				<input
					type="password"
					name="password"
					aria-label="Enter your password"
					bind:value={validations.password}
					class="focus:outline-0"
				/>
			</div>
			<div class="py-2 px-4 bg-gray-200 flex flex-col">
				<label for="confirm">Confirm Password <span class="text-red-500">*</span></label>
				<input
					type="password"
					name="confirm"
					aria-label="Retype your password"
					bind:value={validations.passwordConfirm}
					class="focus:outline-0"
				/>
			</div>
		</div>
		<button
			type="submit"
			aria-label="Register you account"
			class="cursor-pointer w-full rounded-md bg-black text-white py-4 text-xl"
		>
			Register
		</button>
	</form>
</main>
