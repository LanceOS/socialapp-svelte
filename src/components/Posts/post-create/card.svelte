<script lang="ts">
	import Posts from '$lib/classes/Posts.js';

	// list of uploaded images from input
	let uploadedImages: object[] = $state([]);

	// processed image
	let renderedImages: string[] = $state([]);

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

	let body = $state('');

	// process file and add data url to renderedImage array
	function processFile(file: File) {
		const reader = new FileReader();

		reader.onload = (event) => {
			if (event.target?.result) {
				renderedImages = [...renderedImages, event.target.result as string];
			}
		};

		reader.readAsDataURL(file);
	}

	function deleteImage(index: number) {
		uploadedImages = uploadedImages.filter((_, i) => i !== index);
		renderedImages = renderedImages.filter((_, i) => i !== index);
	}

	let counter = $state(false);

	$effect(() => {
		console.log(uploadedImages);
	});

	async function submitNewPost(event: any) {
		event.preventDefault();

		try {
			const data = {
				body: body,
				images: uploadedImages
			};

			await Posts.create(data);
		} catch (e) {
			console.log(e);
		}
	}
</script>

<section class="border-2 h-fit p-4">
	<form class="flex flex-col gap-2" method="POST" onsubmit={(event) => submitNewPost(event)}>
		<div class="h-fit flex items-center relative">
			<textarea
				placeholder="What's on your mind?"
				aria-label="Create your post body"
				class={`w-full h-10 focus:outline-0 focus:h-52 ${body.length > 0 && 'h-52'}  transition-all duration-150 leading-normal bg-base-300 rounded-lg py-2 px-6 resize-none overflow-hidden`}
				bind:value={body}
				onfocus={() => (counter = !counter)}
				onfocusout={() => (counter = !counter)}
			>
			</textarea>
			{#if counter}
				<p
					class={`absolute py-2 px-4 self-end ${body.length < 400 ? 'text-info' : 'text-error'} right-0`}
				>
					{body.length}/400
				</p>
			{/if}
		</div>

		{#if renderedImages}
			<div class="flex flex-row gap-4 overflow-y-none overflow-x-auto">
				{#each renderedImages as image, index}
					<div class="relative flex-none">
						<button
							type="button"
							aria-label="Remove image from post"
							class="absolute flex items-center justify-center bg-white cursor-pointer text-sm font-bold h-6 w-6 p-2 rounded-full top-4 right-4"
							onclick={() => deleteImage(index)}>X</button
						>
						<img src={image} alt="" class="h-50" />
					</div>
				{/each}
			</div>
		{/if}

		<div class="flex gap-4">
			<button
				type="submit"
				aria-label="Create Post"
				class="bg-neutral text-white py-2 px-6 rounded-lg cursor-pointer">Create Post</button
			>
			<input
				id="file-input"
				placeholder="Upload Image"
				type="file"
				accept="image/*"
				aria-label="Upload a selected image (Optional)"
				class="p-2 bg-base-300 rounded-lg cursor-pointer hidden"
				onchange={handleFileUpload}
			/>
			<button
				type="button"
				class="cursor-pointer bg-neutral rounded-lg w-12 flex justify-center items-center text-white"
				aria-label="Upload Image"
				onclick={() => document.getElementById('file-input')?.click()}
			>
				<svg
					width="25"
					height="25"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="3"
						y="7"
						width="18"
						height="12"
						rx="2"
						ry="2"
						stroke="white"
						stroke-width="1"
						fill="none"
					/>
					<circle cx="12" cy="13" r="4" stroke="white" stroke-width="1" fill="none" />
					<path d="M8 7L10 4H14L16 7" stroke="white" stroke-width="1" fill="none" />
				</svg>
			</button>
		</div>
	</form>
</section>
