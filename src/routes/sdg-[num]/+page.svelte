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
    
    

    onMount(() => {
        let navbar = document.getElementById("topBarColored");

        let scrollWatcher = document.querySelector("#data-scroll-watcher") as HTMLDivElement;

        const navObserver = new IntersectionObserver((entries) => {
            navbar.classList.toggle("hidden", !entries[0].isIntersecting);
        })

        navObserver.observe(scrollWatcher);
    });
    
    // Prevent document scrolling when dropdown is open
    let isDropdownOpen = false;

    function handleFocusIn() {
        isDropdownOpen = true;
    }

    function handleFocusOut(event: FocusEvent) {
        setTimeout(() => {
            const currentTarget = event.currentTarget as HTMLElement || null;
            if (currentTarget && !currentTarget.contains(document.activeElement)) {
                isDropdownOpen = false;
            }
        }, 10);
    }

    import { browser } from '$app/environment';

    if (browser) {
        if (isDropdownOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    

</script>

<svelte:head>
	<title>SDG {sdg_num} | PilipiNuts 2024</title>
</svelte:head>

<nav id="topBarColored" class="top-bar fixed flex flex-row items-center top-0 w-full h-[60px] {curr_sdg.color} text-black border-b border-black z-[1000]">
    <div class="flex flex-row items-center bg-black-500 w-full h-full ">
        <a target="_self" href="/" aria-label="Page Title" class="px-4 py-[10px] title-content flex items-center" onmouseenter={triggerAnimation}>
            <div class="relative flex items-center gap-1">
                <div class="w-[24px] h-[24px] flex items-center justify-center">
                    <img src="misc/logo-black.svg" class="block" alt="pilipinuts-logo">
                </div>
                <h3 class="hidden sm:block text-2xl tracking-[-1%]">PilipiNuts</h3>
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
            <div class="hidden hover:bg-[rgb(255,255,255,0.3)] serch-input relative sm:flex flex-row h-full border-l-1 border-l-black gap-4 sm:gap-6 px-4 sm:px-6">
                <input type="text" placeholder="Search by Project Name" class="field-sizing-content p-0 bg-transparent text-sm text-black placeholder-black border-none focus:ring-0">
                <button type = "button" aria-label="Search Button"><span class="size-4 nrk--search-active"></span></button>
            </div>
            <div class="hidden sm:hidden hover:bg-[rgb(255,255,255,0.3)] serch-input flex-row h-full border-l-1 border-l-black gap-4 sm:gap-6 px-4 sm:px-6">
                <input 
                type="text" 
                placeholder="Search"
                class="field-sizing-content p-0 bg-transparent text-xs text-white placeholder-white border-none focus:ring-0"
                >
                <button type = "button" 
                aria-label="Search Button"
                ><span class="size-3 sm:size-4 nrk--search-active"></span></button>
            </div>
            <div class="dropdown dropdown-end h-full">
                <div 
                    role="button"
                    tabindex="0" 
                    class="hover:bg-[rgb(255,255,255,0.3)] flex flex-row items-center h-full border-l-1 border-l-black text-xs sm:text-sm px-4 sm:px-6 gap-4 sm:gap-6 cursor-pointer"
                >
                    <span class="font-mono hidden md:inline-block">View SDGs </span>
                    <span class="font-mono inline-block md:hidden">SDGs </span>
                    <span class="size-3 sm:size-4 nrk--category-active"></span>
                </div>
                {#if isDropdownOpen}
                    <div
                        class="fixed inset-0 bg-black opacity-60 z-40"
                        onclick={() => isDropdownOpen = false}
                        aria-hidden="true"
                    ></div>
                {/if}
                <div id = "sdg-drop" class="dropdown-content z-50 max-h-[60dvh] w-[350px] sm:w-auto overflow-y-auto flex flex-col m-auto bg-black
                shadow-[0_4px_15px_rgba(194,_218,_253,_0.5)] border border-white/50 text-white
                ">
                    <!-- NOTE: projectList function -->
                    <!-- sdgs -> JSON File -->
                    {#each sdg_entries as [number, sdg]}
                        <a href="/sdg-2/">
                            <div
                                id="sdg-dynamic-{number}"
                                class="sdg-item flex flex-row w-full items-center gap-4 py-2 pl-2 border-b-[0.5] border-t border-amber-50"
                                onmouseenter={()=>changeSDGBGColor(sdg.color, number)}
                                onmouseleave={()=>changeSDGBGColor("", number)}
                            >
                                <div class="min-w-[50px] max-w-[50px]">
                                    <img src={sdg.image} alt="{sdg.title}" class="sdg-img p-2 w-full h-[50px] object-contain {sdg.color}"/>
                                </div>
                                <div class="flex flex-col h-[100%] justify-center truncate">
                                    <h3 class="font-semibold">{sdg.title}</h3>
                                    <!-- <p class="truncate font-mono font-light text-sm">{sdg.description}</p> -->
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</nav>
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
                        <span class="hidden lg:block uppercase text-white font-mono ml-2">{curr_sdg_projects.length} Projects Found</span>
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


