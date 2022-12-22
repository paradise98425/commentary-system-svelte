<script>
	import { enhance } from '$app/forms';
	import ListComment from './listComment.svelte';
	export let comments = [];
	export let replies = [];
	export let liked;
	export let form;
</script>

<div class="rounded-sm overflow-hidden shadow-lg m-8">
	<!-- post content -->
	<div
		class="h-80 w-100 bg-cover hover:bg-gray"
		style="background-image: url('https://c0.wallpaperflare.com/preview/314/893/236/hand-light-bulb-idea-energy.jpg')"
	/>
	<div class="mx-6 my-4 border-b border-gray-light">
		<div class="font-sans font-medium text-xl text-gray-darker mb-4">
			Escaping design boundries...
		</div>
		<p class="font-sans font-normal text-gray-dark text-sm mb-2">
			Design like a boss, go for black and white. The interface has the potential for so much depth,
			sex appeal, and sophistication. How could you resist?
			<a href="https://www.vectornator.io/blog/black-and-white-design/" class="text-blue-400"
				>Read more</a
			>
		</p>
	</div>
	<!-- likes button and comment counter -->
	<div class="mx-6 my-4 flex">
		<form method="POST" action="?/handleLike" class="flex flex-row flex-grow gap-8" use:enhance>
			<input type="hidden" name="id" hidden value={liked.status} />
			<button>
				{#if liked.status}
					<img
						alt="Icon for like- a filled heart"
						src="/like-fill.svg"
						class="h-6 w-6 cursor-pointer"
					/>
				{:else}
					<img
						alt="Icon for like- an outlined heart"
						src="/like.svg"
						class="h-6 w-6 cursor-pointer"
					/>
				{/if}
			</button>
		</form>
		<div class="flex-grow text-right">
			<p class="font-sans font-normal text-gray-dark text-sm mb-2">{comments?.length} comments</p>
		</div>
	</div>
	<!-- comments list and input -->
	<ListComment {comments} {replies} {form} />
</div>
