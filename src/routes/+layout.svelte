<script lang="ts">
	import '../app.css';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	let { children } = $props();


</script>

<link rel="stylesheet" href="icons.css">
<link rel="icon" href="misc/icon.png">

<Header />
<main class="mt-[60px] min-h-[calc(100dvh-60px-20dvh)] flex flex-col bg-black">
	{@render children?.()}
</main>
<Footer />