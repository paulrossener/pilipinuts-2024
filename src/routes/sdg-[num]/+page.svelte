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

    import ProjectList from './ProjectList.svelte';
    import ProjectTable from './ProjectTable.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    import projects from "$lib/data/projects.json";
    import sdg from "$lib/data/sdg.json";

    // Type stricting as usual.
    const sdg_project: Project = projects;
    const sdgs: SDG = sdg;

    // Getting new projects
    let curr_sdg = sdgs[data.content];
    let curr_sdg_projects = sdg_project[data.content];

    // State reactivity for tabs
    // Yes, there are better ways to do this but... how they do it..
    let currentTab = $state("list");

</script>

<h1>{curr_sdg.title}</h1>
<p>{curr_sdg.description}</p>

{#if sdg_project[data.content] == null}
    <p>None found here.</p>
{:else}

<!-- Button section -->
<section class="container mx-auto mt-4 mb-10">
    <div class="grid grid-cols-[80%_20%]">
        <h2>Projects</h2>
        <div>
            <ul class="flex flex-wrap text-sm font-medium text-center border-collapse font-robotomono">
                <li class="py-1 flex-grow border border-white {currentTab == "list" ? "bg-white text-black" : ""}">
                    <button class="uppercase" onclick={() => currentTab = "list"}>
                        List View
                    </button>
                </li>
                <li class="py-1 flex-grow border border-white {currentTab == "table" ? "bg-white text-black" : ""}">
                    <button class="uppercase" onclick={() => currentTab = "table"}>
                        Table View
                    </button>
                </li>
            </ul>
        </div>
    </div>
</section>

<!-- Tab Content -->
<section>
    <!-- List View -->
     {#if currentTab == "list"}
     <ProjectList project_data={curr_sdg_projects}/>
     {/if}
    
    <!-- Table View -->
     {#if currentTab == "table"}
     <ProjectTable project_data={curr_sdg_projects}/>
     {/if}
    
</section>

{/if}

