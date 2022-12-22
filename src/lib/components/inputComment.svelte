<script>
	import { enhance, applyAction } from '$app/forms';
	import { getContext } from 'svelte';
	const { hideReply } = getContext('functions');
	export let form = [];
	export let replyFor;
	let dictionary = ['MayannaJill', 'RoshanPratapKatel'];
	let showSuggestion = false;

	const refresh = () => {
		hideReply();
	};

	// DISPLAYS SUGGESTION WHEN @ IS PRESSED
	function handleShowSuggestion(e) {
		form = [];
		if (e.data == '@') {
			showSuggestion = true;
		} else {
			showSuggestion = false;
		}
	}

	// ADDS SUGGESTION TO THE INPUT FIELD IF SELECTED
	function addSuggestion(item) {
		// TODO:
		var element = document.getElementById('comment_input');
		element.value = element.value + item;
		showSuggestion = false;
	}
</script>

<form
	method="POST"
	action="?/create"
	use:enhance={({ form }) => {
		// Before form submission to server
		return async ({ result, update }) => {
			// After form submission to server
			if (result.type === 'success') {
				form.reset();
				refresh();
			}
			if (result.type === 'invalid') {
				await applyAction(result);
			}
			update();
		};
	}}
>
	<input type="hidden" name="replyFor" hidden value={replyFor} />
	<input
		id="comment_input"
		type="text"
		name="comment_input_field"
		placeholder="Leave your comment"
		class="w-full py-1 rounded text-sm pl-0 text-coolGray-100 focus:outline-none foucs:shadow-xl"
		style="cursor: auto;"
		value={form?.comment ?? ''}
		on:input={(e) => handleShowSuggestion(e)}
	/>
	{#if showSuggestion}
		<div class="flex flex-col space-y-0.5 bg-trasparent p-3">
			{#each dictionary as item}
				<button
					class="flex items-start text-sm text-gray-600 hover:bg-gray-200 p-1.5 focus:outline-none focus:border-none"
					on:click={() => addSuggestion(item)}>{item}</button
				>
			{/each}
		</div>
	{/if}
	{#if form?.error}
		<p class="font-sans mt-2 text-xs text-orange-500">{form?.message} &#128579;</p>
	{/if}
</form>
