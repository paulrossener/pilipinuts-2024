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

    function changeSDGBGColor(newColor: String, target_sdg: String){
        const color = newColor.replace(/^bg-|\[|\]/g, '');
        const target_element = document.getElementById(`sdg-header-${target_sdg}`) as HTMLDivElement;
        target_element.style.backgroundColor = color;
    }

</script>

<nav id="topBar" class="top-bar fixed flex flex-row items-center top-0 w-full h-[60px] bg-black text-white border-b border-amber-50 z-[1000]">
    <div class="flex flex-row items-center w-full h-full ">
        <a target="_self" href="/" aria-label="Page Title" class="px-4 py-[10px] title-content flex items-center" onmouseenter={triggerAnimation}>
            <div class="relative flex items-center gap-2">
                <h3 class="text-2xl tracking-[-1%]">PilipiNuts</h3>
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
        <div class=flex-grow></div>
        <div class="flex items-center h-full font-mono transition duration-300 ease-in">
            <div class="hover:bg-[rgb(255,255,255,0.3)] serch-input relative flex flex-row h-full border-l-1 border-l-amber-50 gap-6 px-6">
                <input type="text" placeholder="Search by Project Name" class="flex field-sizing-content p-0 bg-transparent text-sm text-white placeholder-white border-none focus:ring-0">
                <button type = "button" aria-label="Search Button"><span class="size-4 nrk--search-active"></span></button>
            </div>
            <div class="dropdown dropdown-end h-full">
                <div tabindex="0" class="hover:bg-[rgb(255,255,255,0.3)] flex flex-row items-center h-full border-l-1 border-l-amber-50 text-sm px-6 gap-6 cursor-pointer">View SDGs <span class="size-4 nrk--category-active"></span></div>
                <div class="dropdown-content z-1 h-[calc(100dvh-60px)] overflow-y-auto flex flex-col m-auto bg-black">
                    <!-- NOTE: projectList function -->
                    <!-- sdgs -> JSON File -->
                    {#each sdg_entries as [number, sdg]}
                        <a data-sveltekit-reload href="/sdg-{number}">
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div
                                id="sdg-header-{number}"
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