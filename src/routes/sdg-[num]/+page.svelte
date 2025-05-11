<script lang="ts">
    interface Project {
        [key: string]: { 
            group: string;
            name: string;
            title: string;
            desc: string;
            authors: string[];
            plot: string;
            website: string;
            class: string;
        }[];
    }

    import ProjectItem from './ProjectItem.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    import projects from "$lib/data/projects.json";
    const sdg_project: Project = projects;

</script>

<h1 class="text-white">{data.title}</h1>
{#each sdg_project[data.content] as project}
    <p class="text-white">{project.group}</p>
    <p class="text-white">{project.name}</p>
    <p class="text-white">{project.title}</p>
    <p class="text-white">{project.desc}</p>
    {#each project.authors as author}
        <p class="text-white">{author}</p>
    {/each}
    <p class="text-white">{project.plot}</p>
    <p class="text-white">{project.website}</p>
    <p class="text-white">{project.class}</p>
{/each}
<ProjectItem
    adjective=""
/>