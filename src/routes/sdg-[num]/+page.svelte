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
            related_sdg: Number[];
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
    const sdg_entries = Object.entries(sdgs);

    function changeSDGBGColor(newColor: String, target_sdg: String){
        const color = newColor.replace(/^bg-|\[|\]/g, '');
        const target_element = document.getElementById(`sdg-dynamic-${target_sdg}`) as HTMLDivElement;
        target_element.style.backgroundColor = color;
    }

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

    import {onMount} from "svelte";
    
    

    onMount(() => {
        let scrollWatcher = document.querySelector("#data-scroll-watcher") as HTMLDivElement;
        let navbar = document.querySelector("#topBar") as HTMLDivElement;
        let numButtons = document.querySelectorAll<HTMLDivElement>("div.num-buttons");
        let pilipinutsText = document.querySelector("#pilipinuts-text") as HTMLDivElement;
        let searchBar = document.querySelectorAll<HTMLDivElement>("div.serch-input");
        let viewSDG = document.querySelector("#view-sdg") as HTMLDivElement;
        const color = curr_sdg.color.replace(/^bg-|\[|\]/g, '');
        navbar.style.backgroundColor = color;

        const navObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                navbar.style.backgroundColor = color;
                navbar.style.borderColor = "black";
                pilipinutsText.style.color = "black";
                searchBar.forEach(bar => {
                    bar.style.color = "black";
                    bar.style.borderColor = "black";
                });
                viewSDG.style.color = "black";
                viewSDG.style.borderColor = "black";
                numButtons.forEach(elem => {
                    elem.style.backgroundColor = "black";
                    elem.style.color = "white";
                });
            }
            else {
                navbar.style.backgroundColor = "#000000";
                navbar.style.borderColor = "white";
                pilipinutsText.style.color = "white";
                searchBar.forEach(bar => {
                    bar.style.color = "white";
                    bar.style.borderColor = "white";
                });
                viewSDG.style.color = "white";
                viewSDG.style.borderColor = "white";
                numButtons[0].style.backgroundColor = "var(--color-yellow-500)";
                numButtons[1].style.backgroundColor = "var(--color-red-500)";
                numButtons[2].style.backgroundColor = "var(--color-blue-500)";
                numButtons[3].style.backgroundColor = "var(--color-pink-500)";
                numButtons.forEach( elem => {
                    elem.style.color = "black";
                });
            }

            //const target_element = document.getElementById(`sdg-${target_sdg}`) as HTMLDivElement;
            //navbar.classList.toggle("navBarChange", !entries[0].isIntersecting);
        })

        navObserver.observe(scrollWatcher);
    });
    
</script>

<svelte:head>
	<title>SDG {sdg_num} | PilipiNuts 2024</title>
</svelte:head>

<div id="data-scroll-watcher"></div>
<div class="flex flex-col items-center {curr_sdg.color} w-full text-black p-10 text-center">
    <img src={curr_sdg.image} class="sdg-img p-2 w-[50px] h-[50px] object-contain bg-white mb-2" alt="sdg">
    <h1 class="font-bold text-center text-4xl/8 md:text-5xl mb-4">{curr_sdg.title}</h1>
    <p class="font-mono text-xs md:text-sm">{curr_sdg.description}</p>
</div>
<div class="w-full flex flex-col flex-grow items-center">
    <div class="w-[90%] md:w-[70%]">
        
        {#if sdg_project[data.content] == null}
            <div class="flex items-center justify-center w-full h-full flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#fff"><animate id="svgSpinnersBarsFade0" fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsFade1.end-0.25s" dur="0.75s" values="1;0.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#fff" opacity="0.4"><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsFade0.begin+0.15s" dur="0.75s" values="1;0.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#fff" opacity="0.3"><animate id="svgSpinnersBarsFade1" fill="freeze" attributeName="opacity" begin="svgSpinnersBarsFade0.begin+0.3s" dur="0.75s" values="1;0.2"/></rect></svg>
                <span class="font-mono">No Projects Found.</span>
                <a target="_self" href="/#sdgProjects" class="underline"><span class="font-mono">Back to the SDGs</span></a>
            </div>
        {:else}
            <!-- Button section -->
            <section class="container mx-auto mt-4 md:mt-6 mb-10">
                <div class="grid lg:grid-cols-[80%_20%] gap-2">
                    <div class="md:w-full justify-center md:justify-start flex flex-row gap-2 text-xs font-mono font-medium text-black items-center">
                        <a href="/"><button class="uppercase bg-[rgb(255,255,255,0.3)] hover:bg-white h-full p-2 lg:py-2 lg:px-4">
                        <img src="misc/logo-black.svg" class="lg:hidden w-[20px]" alt="pilipinuts"><span class="hidden lg:block">PilipiNuts 2024</span></button></a>
                        <button class="flex-grow lg:flex-grow-0 uppercase {curr_sdg.color} h-full py-2 px-4">Sustainable Development Goal #{sdg_num}</button>
                        <span class="hidden lg:block uppercase text-white font-mono ml-2">{`${curr_sdg_projects.length} Project${curr_sdg_projects.length > 1 ? 's' : ''} Found`}</span>
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
