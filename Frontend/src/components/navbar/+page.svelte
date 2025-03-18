<script>
	import { goto } from '$app/navigation';
</script>

<header class="border-2 w-full md:w-1/4 flex md:flex-col items-center py-8">
	<nav class="flex flex-col justify-between items-center h-full">
		<div class="">
			<p>Placeholder</p>
		</div>
		<div class="flex gap-2">
			<button
				class="cursor-pointer rounded-lg text-white py-2 px-4"
				aria-label="Go to sign in page"
				onclick={() => goto('/signin')}
			>
				Sign In
			</button>
			<button
				class="cursor-pointer rounded-lg bg-[#05083d] text-white py-2 px-4"
				aria-label="Create new Account"
				onclick={() => goto('/')}
			>
				Register
			</button>
		</div>
	</nav>
</header>
