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

    import { setContext } from 'svelte';

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

    let view_image = $state() as HTMLImageElement;
    let thisModal = $state() as HTMLDivElement;
 
    setContext('modal-image', showModalImage);

    async function showModalImage(delta: String) {
        const imageModule = await import(`$lib/assets/plots/${delta}.png`);
		view_image.src = imageModule.default;
        thisModal.classList.remove('hidden')
	}

    function hideModal(){
        thisModal.classList.add('hidden');
    }

</script>

<div class="w-full p-[50px]">
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
        <ProjectList 
            project_data={curr_sdg_projects}
        />
        {/if}
        
        <!-- Table View -->
        {#if currentTab == "table"}
        <ProjectTable 
            project_data={curr_sdg_projects}
        />
        {/if}
        
    </section>

    {/if}

<div bind:this={thisModal}  tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900/50">

    <!-- Catcher -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={hideModal} class="h-full w-full z-50 fixed"></div>

    <div class="max-w-7xl my-20 bg-black p-10 mx-auto z-51 relative rounded-2xl">
        <button onclick={hideModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="progress-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
        </button>
        <img bind:this={view_image} class="mb-4 h-auto w-full" alt="Profile">
    </div>
</div>
</div>



