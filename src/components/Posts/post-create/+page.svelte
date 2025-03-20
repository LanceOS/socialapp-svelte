<script lang="ts">
	import { render } from 'svelte/server';

	// list of uploaded images from input
	let uploadedImages: FileList[] = $state([]);

	// processed image
	let renderedImage: string[] = $state([]);

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const newFiles = Array.from(target.files);

			// convert FileList to an array and merge with current state
			uploadedImages = [...uploadedImages, ...newFiles];

			// process each new file
			newFiles.forEach(processFile);
		}
	}

	let body = $state();

	// view state
	let previewImage = $state(false);

	function processFile(file: File) {
		const reader = new FileReader();

		reader.onload = (event) => {
			if (event.target?.result) {
				renderedImage = [...renderedImage, event.target.result as string];
			}
		};

		reader.readAsDataURL(file);
	}

	function changePreview() {
		previewImage = !previewImage;
	}
</script>

<section class="border-2 h-fit p-4">
	<form class="flex flex-col gap-2" action="">
		<textarea
			placeholder="What's on your mind?"
			aria-label="Create your post body"
			class="w-full h-10 focus:outline-0 focus:h-52 leading-normal bg-base-300 rounded-lg py-2 px-6 resize-none overflow-hidden"
			bind:value={body}
		></textarea>
		{#if renderedImage}
			<button
				onclick={changePreview}
				class="cursor-pointer bg-primary rounded-lg text-primary-content w-32 py-2 px-6"
			>
				Preview
			</button>
			{#if previewImage}
				<div class="flex flex-row gap-4 overflow-y-none overflow-x-auto">
					{#each renderedImage as image}
						<img src={image} alt="Your image" aria-label="" class="h-24" />
					{/each}
				</div>
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
				onchange={handleFileUpload}
			/>
		</div>
	</form>
</section>
