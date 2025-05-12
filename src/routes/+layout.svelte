<script lang="ts">
	import '../app.css';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	let { children } = $props();
</script>

<Header />
<main class="mt-[25px]">
	{@render children?.()}
</main>
<Footer />