<script lang="ts">

    let num = [
        {num: "2", color: "bg-yellow-500"},
        {num: "0", color: "bg-red-500"},
        {num: "2", color: "bg-blue-500"},
        {num: "4", color: "bg-pink-500"}
    ]

    let titleAnimation = false;

    function triggerAnimation() {
        if (titleAnimation) return;

        titleAnimation = true;
        setTimeout(() => {
            titleAnimation = false;
        }, 1500 + num.length * 100);
    }

    interface SDG {
        [key: string]: { 
            title: string;
            description: string;
            image: string;
            color: string;
        };
    }

    import sdg_temp from "$lib/data/sdg.json";
    
    const sdgs: SDG = sdg_temp;

    const sdg_entries = Object.entries(sdgs);

    function changeSDGBGColor(id: String, newColor: String, target_sdg: String){
        const color = newColor.replace(/^bg-|\[|\]/g, '');
        const parent_element = document.getElementById(`${id}`) as HTMLDivElement
        const target_element = parent_element.querySelector(`.sdg-header-${target_sdg}`) as HTMLDivElement;
        target_element.style.backgroundColor = color;
    }

    // Search Bar

    import projectsData from '$lib/data/projects.json';

    let searchTerm = '';
    let searchContent = false;

    type Project = {
        group: string;
        name: string;
        title: string;
        desc: string;
        authors: string[];
        plot: string;
        website: string;
        class: string;
        related_sdg: number[];
    };

    type FilteredProjects = Record<string, Project[]>;

    $: filteredProjects = searchTerm
    ? Object.fromEntries(
        Object.entries(projectsData)
            .map(([key, projects]) => [
            key,
            projects.filter(
                (project: Project) =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
            ])
            .filter(([key, projects]) => projects.length > 0)
        ) as FilteredProjects
    : {};

    function getSDG(key: String) {
        return sdgs[+key];
    }

    function toggleDropdown(open: boolean) {
        searchContent = open;
    }

    function handleBlur() {
        setTimeout(() => {
            searchContent = false;
        }, 150);
    }

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

    $: {
        if (browser) {
            if (isDropdownOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

</script>

<nav id="topBar" class="top-bar fixed flex flex-row items-center top-0 w-full h-[60px] bg-black text-white border-b border-amber-50 z-[1000]">
    <div class="flex flex-row items-center w-full h-full">
        <a target="_self" href="/" aria-label="Page Title" class="px-4 py-[10px] title-content flex items-center" onmouseenter={triggerAnimation}>
            <div class="relative flex items-center gap-2">
                <h3 id="pilipinuts-text" class="hidden sm:block text-2xl tracking-[-1%]">PilipiNuts</h3>
                <div class="flex flex-row text-black text-lg font-bold gap-1">
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
        <div class="flex-grow"></div>
        <div class="flex items-center h-full font-mono transition duration-300 ease-in ">
            <div class="dropdown dropdown-end h-full">
    
                <div class="hidden sm:flex hover:bg-[rgb(255,255,255,0.3)] serch-input flex-row h-full border-l-1 border-l-amber-50 gap-4 sm:gap-6 px-4 sm:px-6">
                    <input 
                    type="text" 
                    placeholder="Search by Project Name" 
                    class="w-[23ch] p-0 bg-transparent text-sm text-white placeholder-[rgb(255,255,255,0.3)] border-none focus:ring-0"
                    bind:value={searchTerm}
                    onfocus={() => toggleDropdown(true)}
                    onblur={handleBlur}
                    >
                    <button type = "button" 
                    aria-label="Search Button"
                    onclick={() => toggleDropdown(true)}
                    ><span class="size-4 nrk--search-active"></span></button>
                </div>
                <div class="flex sm:hidden hover:bg-[rgb(255,255,255,0.3)] serch-input flex-row h-full border-l-1 border-l-amber-50 gap-4 sm:gap-6 px-4 sm:px-6">
                    <input 
                    type="text" 
                    placeholder="Search"
                    class="w-[6ch] p-0 bg-transparent text-xs text-white placeholder-[rgb(255,255,255,0.3)] border-none focus:ring-0"
                    bind:value={searchTerm}
                    onfocus={() => toggleDropdown(true)}
                    onblur={handleBlur}
                    >
                    <button type = "button" 
                    aria-label="Search Button"
                    onclick={() => toggleDropdown(true)}
                    ><span class="size-3 sm:size-4 nrk--search-active"></span></button>
                </div>
                {#if searchContent && Object.keys(filteredProjects).length > 0}
                    <div id = "input-text" class="dropdown-content z-50 w-[250px] sm:w-[350px] max-h-[60dvh] overflow-y-auto flex flex-col m-auto bg-black shadow-[0_4px_15px_rgba(194,_218,_253,_0.5)] border border-white/50">
                        {#each Object.entries(filteredProjects) as [key, projects]}
                            {#each projects as project, index}
                                <a
                                    data-sveltekit-reload
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class= {`sdg-header-${key}-${index} sdg-item flex flex-row w-full items-center gap-3 py-2 pl-2 border-b-[0.5] border-t border-amber-50`}
                                    onmouseenter={() => changeSDGBGColor("input-text", getSDG(key).color, `${key}-${index}`)}
                                    onmouseleave={() => changeSDGBGColor("input-text", '', `${key}-${index}`)}
                                >
                                    <div class="min-w-[50px] max-w-[50px]">
                                    <img
                                        src={getSDG(key).image}
                                        alt={getSDG(key).title}
                                        class="sdg-img p-2 w-full h-[50px] object-contain {getSDG(key).color}"
                                    />
                                    </div>
                                    <div class="flex flex-col h-full justify-center break-words overflow-hidden p-2">
                                        <h6 class="font-normal">{project.title}</h6>
                                    </div>
                                </a>
                            {/each}
                        {/each}
                    </div>
                {:else if (searchContent && searchTerm != '') && Object.keys(filteredProjects).length === 0 }
                    <div id = "input-text" class="dropdown-content z-50 w-[250px] sm:w-[350px] overflow-y-auto flex flex-col m-auto bg-black shadow-[0_4px_15px_rgba(194,_218,_253,_0.5)] border border-white/50">
                        <div class = "sdg-item flex flex-row w-full items-center gap-4 py-2 pl-2 border-b-[0.5] border-t border-amber-50">
                            <div class="flex flex-col h-full justify-center break-words overflow-hidden p-4">
                                <h6 class="font-normal">No Data Found!</h6>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            <div class="dropdown dropdown-end h-full"
                onfocusin={handleFocusIn}
                onfocusout={handleFocusOut}
            >

                <div 
                    id="view-sdg"
                    role="button"
                    tabindex="0" 
                    class="hover:bg-[rgb(255,255,255,0.3)] flex flex-row items-center h-full border-l-1 border-l-amber-50 text-xs sm:text-sm px-4 sm:px-6 gap-4 sm:gap-6 cursor-pointer"

                >View SDGs <span class="size-3 sm:size-4 nrk--category-active"></span></div>
                {#if isDropdownOpen}
                    <div
                        class="fixed inset-0 bg-black opacity-60 z-40"
                        onclick={() => isDropdownOpen = false}
                        aria-hidden="true"
                    ></div>
                {/if}
                <div id = "sdg-drop" class="dropdown-content z-50 max-h-[60dvh] w-[350px] sm:w-auto overflow-y-auto flex flex-col m-auto bg-black
                shadow-[0_4px_15px_rgba(194,_218,_253,_0.5)] border border-white/50
                ">
                    <!-- NOTE: projectList function -->
                    <!-- sdgs -> JSON File -->
                    {#each sdg_entries as [number, sdg]}
                        <a data-sveltekit-reload href="/sdg-{number}">
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div
                                class="sdg-header-{number} sdg-item flex flex-row w-full items-center gap-4 py-2 pl-2 border-b-[0.5] border-t border-amber-50"
                                onmouseenter={()=>changeSDGBGColor("sdg-drop", sdg.color, number)}
                                onmouseleave={()=>changeSDGBGColor("sdg-drop", "", number)}
                            >
                                <div class="min-w-[50px] max-w-[50px]">
                                    <img src={sdg.image} alt="{sdg.title}" class="sdg-img p-2 w-full h-[50px] object-contain {sdg.color}"/>
                                </div>
                                <div class="flex flex-col w-[350px] h-[100%] justify-center">
                                    <h6 class="font-semibold flex flex-wrap">{sdg.title}</h6>
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

<style>
    .num-buttons {
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }

    .spin {
        animation: spinY 1.5s linear;
    }

    @keyframes spinY {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
    }
</style>