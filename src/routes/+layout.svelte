<script lang="ts">
	import '../app.css';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	let { children } = $props();
</script>

<link rel="stylesheet" href="icons.css">

<Header />
<main class="mt-[25px]">
	{@render children?.()}
</main>
<Footer />