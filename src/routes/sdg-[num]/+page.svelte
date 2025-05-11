<script lang="ts">
    import ProjectItem from './ProjectItem.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    import projects from "$lib/data/projects.json";

</script>

<h1 class="text-white">{data.title}</h1>
<ProjectItem
    adjective=""
/>