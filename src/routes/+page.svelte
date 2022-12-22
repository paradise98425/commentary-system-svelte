<script>
	import Card from '$lib/components/card.svelte';
	export let data;
	export let form;
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
	<div class="flex flex-col gap-4 items-center">
		<Card comments={data?.comments} {form} liked={data?.liked} replies={data?.replies} />
	</div>
</div>
