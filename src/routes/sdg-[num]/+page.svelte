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
            color: string;
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
    let sdg_num = data.content;
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

    let num = [
        {num: "2", color: "bg-black"},
        {num: "0", color: "bg-black"},
        {num: "2", color: "bg-black"},
        {num: "4", color: "bg-black"}
    ]

    let titleAnimation = false;

    function triggerAnimation() {
        if (titleAnimation) return;

        titleAnimation = true;
        setTimeout(() => {
            titleAnimation = false;
        }, 1500 + num.length * 100);
    }

    import {onMount} from "svelte";
    
    let navbar = $state() as HTMLElement;

    onMount(() => {
        let scrollWatcher = document.querySelector("#data-scroll-watcher") as HTMLDivElement;

        const navObserver = new IntersectionObserver((entries) => {
            navbar.classList.toggle("hidden", !entries[0].isIntersecting);
        })

        navObserver.observe(scrollWatcher);
    });
    

</script>

<nav bind:this={navbar} class="top-bar fixed flex flex-row items-center top-0 w-full h-[60px] {curr_sdg.color} text-black border-b border-black z-[1000]">
    <div class="flex flex-row items-center bg-black-500 w-full h-full ">
        <a target="_self" href="/" aria-label="Page Title" class="px-4 py-[10px] title-content flex items-center" onmouseenter={triggerAnimation}>
            <div class="relative flex items-center gap-2">
                <h3 class="text-2xl tracking-[-1%]">PilipiNuts</h3>
                <div class="flex flex-row text-white text-lg font-bold gap-1">
                    {#each num as n, i}
                        <div
                        class={`num-buttons flex flex-row w-[24px] h-[24px] text-base m-0 ${n.color} items-center justify-center ${titleAnimation ? 'spin' : ''}`}
                        style={`animation-delay: ${i * 0.1}s`}
                        >
                        {n.num}
                        </div>
                    {/each}
                </div>
            </div>
        </a>
        <div class=flex-grow></div>
        <div class="flex items-center h-full font-mono transition duration-300 ease-in">
            <div class="hover:bg-[rgb(255,255,255,0.3)] serch-input relative flex flex-row h-full border-l-1 border-l-black gap-6 px-6">
                <input type="text" placeholder="Search by Project Name" class="flex p-0 bg-transparent text-sm text-black placeholder-black border-none">
                <button type = "button" aria-label="Search Button"><span class="size-4 nrk--search-active"></span></button>
            </div>
            <div class="hover:bg-[rgb(255,255,255,0.3)] flex flex-row items-center h-full border-l-1 border-l-black text-sm px-6 gap-6">View SDGs <span class="size-4 nrk--category-active"></span></div>
        </div>
    </div>
</nav>
<div id="data-scroll-watcher"></div>
<div class="flex flex-col items-center {curr_sdg.color} w-full text-black p-10">
    <img src="{curr_sdg.image}" class="sdg-img p-2 w-[50px] h-[50px] object-contain bg-white mb-2" alt="sdg">
    <h1 class="font-bold text-5xl mb-4">{curr_sdg.title}</h1>
    <p class="font-mono text-sm">{curr_sdg.description}</p>
</div>
<div class="w-full flex flex-col flex-grow items-center">
    <div class="w-[70%] p-[50px]">
        
        {#if sdg_project[data.content] == null}
            <div class="flex items-center justify-center w-full h-full flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#fff"><animate id="svgSpinnersBarsFade0" fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsFade1.end-0.25s" dur="0.75s" values="1;0.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#fff" opacity="0.4"><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsFade0.begin+0.15s" dur="0.75s" values="1;0.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#fff" opacity="0.3"><animate id="svgSpinnersBarsFade1" fill="freeze" attributeName="opacity" begin="svgSpinnersBarsFade0.begin+0.3s" dur="0.75s" values="1;0.2"/></rect></svg>
                <span class="font-mono">No Projects Found.</span>
                <a target="_self" href="/" class="underline"><span class="font-mono">Back to Home</span></a>
            </div>
        {:else}

        <!-- Button section -->
        <section class="container mx-auto mt-2 mb-10">
            <div class="grid grid-cols-[80%_20%]">
                <div class="flex flex-row gap-2 text-xs font-mono font-medium text-black items-center">
                    <a href="/"><button class="uppercase bg-[rgb(255,255,255,0.3)] hover:bg-white h-full py-2 px-4">PilipiNuts 2024</button></a>
                    <button class="uppercase {curr_sdg.color} h-full py-2 px-4">SUSTAINABLE DEVELOPMENT GOAL #{sdg_num}</button>
                    <span class="uppercase text-white font-mono ml-2">{curr_sdg_projects.length} Projects Found</span>
                </div>
                <!-- <h2 class="font-medium">Projects</h2> -->
                <div>
                    <ul class="flex flex-wrap text-xs font-medium text-center border-collapse font-mono">
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
            <ProjectList project_data={curr_sdg_projects} sdg_num={sdg_num}/>
            {/if}
            
            <!-- Table View -->
            {#if currentTab == "table"}
            <ProjectTable project_data={curr_sdg_projects} sdg_num={sdg_num}/>
            {/if}
            
        </section>
        <div class="w-full uppercase font-mono text-sm text-center mt-10">Nothing Follows</div>
        {/if}

        
    </div>
</div>

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

