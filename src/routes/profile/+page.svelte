<script>
	import bannerImg from '../../assets/banner.jpg';
	import profileImg from '../../assets/duck.jpg';

	const profile = {
		banner: bannerImg,
		avatar: profileImg,
		name: 'John Doe',
		username: 'johndoe22',
		bio: 'A typical bio for a social media profile',
		joinedAt: Date.now().toLocaleString()
	};
</script>

<main class="max-w-4xl border-2 min-h-screen h-fit mx-auto flex flex-col gap-24">
	<section>
		<div class="flex flex-col gap-12">
			<img src={profile.banner} class="h-32 w-full object-cover" alt="Profile Banner" />

			<div class="absolute top-20 sm:top-12 px-4">
				<img
					src={profile.avatar}
					class="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-full border-white border-4"
					alt="Profile Avatar"
				/>
			</div>
			<div class="px-4 flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<h1 class="text-xl sm:text-3xl font-bold">{profile.name}</h1>
					<p class="text-gray-500 text-md sm:text-xl font-semibold">@{profile.username}</p>
				</div>

				<div>
					<p class="text-md">{profile.bio}</p>
					<p class="text-sm text-gray-500">{profile.joinedAt}</p>
				</div>
			</div>
		</div>
	</section>

	<section class="flex"></section>
</main>
