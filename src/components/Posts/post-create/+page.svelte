<script lang="ts">
	// list of uploaded images from input
	let uploadedImages: FileList | undefined = $state();

	// content text body of post
	let body = $state('');

	// processed image
	let renderedImage = $state();

	// view state
	let previewImage = $state(false);

	function renderFile() {
		const file = uploadedImages![0];

		if (!file) throw new Error('Failed to render new file');

		const reader = new FileReader();

		reader.onload = (event) => {
			renderedImage = event.target?.result;
		};

		reader.readAsDataURL(file);

		return;
	}

	function changePreview() {
		previewImage = !previewImage;
	}

	function createPost() {}
</script>

<section class="border-2 h-fit p-4">
	<form class="flex flex-col gap-2" action="">
		<input
			placeholder="Create Post"
			aria-label="Create your post body"
			class="w-full focus:outline-0 bg-base-300 rounded-lg py-2 px-6"
			bind:value={body}
		/>
		{#if renderedImage}
			<button
				onclick={changePreview}
				class="cursor-pointer bg-primary rounded-lg text-primary-content w-32 py-2 px-6"
			>
				Preview
			</button>
			{#if previewImage}
				<img src={renderedImage} alt="Your image" aria-label="" class="h-full" />
			{/if}
		{/if}

		<div class="flex gap-4">
			<button
				type="submit"
				class="bg-primary text-primary-content py-2 px-6 rounded-lg cursor-pointer"
				>Create Post</button
			>
			<input
				placeholder="Upload Image"
				type="file"
				aria-label="Upload a selected image (Optional)"
				class="p-2 bg-base-300 rounded-lg cursor-pointer"
				bind:files={uploadedImages}
				onchange={() => renderFile()}
			/>
		</div>
	</form>
</section>
