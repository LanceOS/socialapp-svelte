<script lang="ts">
	import PBClient from '$lib/classes/Pocketbase.js';

	let passwordInput = $state('');
	let emailInput = $state('');

	$effect(() => {
		console.log(emailInput);
		console.log(passwordInput);
	});

	async function signIn(emailInput: string, passwordInput: string) {
		console.log(emailInput, passwordInput);
		const data = {
			email: emailInput,
			password: passwordInput
		};

		const session = await PBClient.auth.signIn(data);

		if (session) {
			console.log(session);
			return session;
		}
	}
</script>

<main class="h-screen bg-gray-50 flex flex-col gap-8 items-center justify-center">
    <h1 class="text-4xl font-bold">Svelte App</h1>
    <form action="signin" class="bg-white flex flex-col gap-12 items-center py-20 px-12 rounded-lg w-fit" onsubmit={() => signIn(emailInput, passwordInput)}>
        <div class="flex flex-col gap-6 w-xl">
            <div class="flex flex-col gap-2 bg-gray-200 py-4 px-6">
                <label>Email <span class="text-red-500">*</span></label>
                <input type="email" name="email" placeholder="example@example.com" bind:value={emailInput} class="focus:outline-2" />
            </div>
            <div class="flex flex-col gap-2 bg-gray-200 py-4 px-6">
                <label for="password">Password <span class="text-red-500">*</span></label>
		    <input type="password" name="password" bind:value={passwordInput} class="focus:outline-2">
            </div>    
        </div>
        <button type="submit" class="curosr-pointer w-full text-white bg-black rounded-md text-xl py-4">Sign In</button>
	</form>
</main>
