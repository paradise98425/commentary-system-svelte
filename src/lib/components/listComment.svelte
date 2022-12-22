<script>
	import Comment from '$lib/components/inputComment.svelte';
	import { setContext } from 'svelte';
	export let comments = [];
	export let replies = [];
	export let form;
	export let showReply = false;
	export let replyFor = null;

	function handleDisplayReply(id) {
		showReply = !showReply;
		replyFor = id;
	}

	const hideReply = () => {
		showReply = false;
		replyFor = null;
	};
	setContext('functions', { hideReply });
</script>

<div class="mx-6 my-4 flex flex-col space-y-2" style="cursor: auto;">
	{#each comments as item}
		{#if item.replyTo == ''}
			<div class="group flex flex-row justify-between space-y-1">
				<div class="flex flex-col">
					<p class="font-sans text-sm" style="cursor: auto;">
						<span class="text-base font-semibold">{item.username}</span>
						{item.comment}
					</p>
					{#each replies as reply}
						{#if reply.replyTo == item.id}
							<div class="ml-3 border-l-2 border-gray-light ">
								<p class="font-sans ml-3 text-sm" style="cursor: auto;">
									<span class="text-base font-semibold">{reply.username}</span>
									{reply.comment}
								</p>
							</div>
						{/if}
					{/each}
				</div>
				<button on:click={handleDisplayReply(item.id)} focus:outline-none focus:border-none>
					<p class="hidden group-hover:block text-gray-500 text-xs">
						{showReply && replyFor == item.id ? 'Hide' : 'Reply'}
					</p>
				</button>
			</div>
			{#if showReply && replyFor == item.id}
				{#if replyFor == item.id}
					<div class="mx-8">
						<Comment {form} {replyFor} />
					</div>
				{/if}
			{/if}
		{/if}
	{/each}
	<Comment {form} {replyFor} {hideReply} />
</div>
