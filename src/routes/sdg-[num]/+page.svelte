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

<h1>{curr_sdg.title}</h1>
<p>{curr_sdg.description}</p>

{#if sdg_project[data.content] == null}
    <p>None found here.</p>
{:else}

<div class="grid grid-cols-2">
    <h2>Projects</h2>
    <div>
        <p>List View</p>
        <p>Table View</p>
    </div>
</div>

{#each sdg_project[data.content] as project}
    <ProjectItem
        group={project.group}
        name={project.name}
        title={project.title}
        desc={project.desc}
        authors={project.authors}
        plot={project.plot}
        website={project.website}
        class_type={project.class}
    />
{/each}

{/if}

