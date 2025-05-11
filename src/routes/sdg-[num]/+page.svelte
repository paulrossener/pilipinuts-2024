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

    interface SDG {
        [key: string]: { 
            title: string;
            description: string;
            image: string;
        };
    }

    import ProjectItem from './ProjectItem.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    import projects from "$lib/data/projects.json";
    import sdg from "$lib/data/sdg.json";

    // Type stricting as usual.
    const sdg_project: Project = projects;
    const sdgs: SDG = sdg;

    let curr_sdg = sdgs[data.content];

</script>

<h1 class="text-white">{curr_sdg.title}</h1>
<h2 class="text-white">{curr_sdg.description}</h2>
{#if sdg_project[data.content] == null}
    <p class="text-white">None found here.</p>
{:else}
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
{/if}

