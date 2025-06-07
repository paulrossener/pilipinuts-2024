<script lang="ts">
	import { page } from "$app/state";
	import {onMount} from "svelte";
    import { getContext } from 'svelte';
    
    import FacebookShare from "$lib/components/FacebookShare.svelte";
    import TwitterShare from "$lib/components/TwitterShare.svelte";

    let { 
        group, 
        name, 
        title, 
        desc, 
        authors, 
        plot, 
        website, 
        class_type,
        related_sdg,
        sdg_num
    } = $props();

    import sdg from "$lib/data/sdg.json";

    interface SDG {
        [key: string]: { 
            title: string;
            description: string;
            image: string;
            color: string;
        };
    }
    // let sharingPanel = $state() as HTMLDivElement;

    const sdgs: SDG = sdg;
    const curr_sdg = sdgs[sdg_num];

    const showModalImage: Function = getContext('modal-image');

    // onMount(() => {
    //     const new_color = curr_sdg.color.replace(/^bg-|\[|\]/g, '');
    //     sharingPanel.style.color = new_color;
    // });


    console.log(curr_sdg);
</script>

{#snippet theSeparator()}
    <hr class="h-px border-0 bg-amber-50">
    <hr class="h-px border-0 bg-amber-50">
{/snippet}

<!-- If List View -->
<div class="mb-30">
    <h1 class="mb-4 text-3xl/7 sm:text-4xl font-medium">{title}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-[70%_auto] border-collapse gap-4">
        <!-- First Column -->
        <div class="flex">
            <!-- {#await import(`$lib/assets/plots/${plot}.png`) then { default: src }} -->
            <button onclick={()=>showModalImage(plot)} type="button" aria-haspopup="dialog" aria-expanded="false" data-melt-dialog-trigger="" data-dialog-trigger="">
                <img src="plots/{plot}.png" class="w-auto transition-all duration-200 hover:scale-[1.01] hover:brightness-125" alt="Profile">
            </button>
            <!-- {/await} -->
        </div>

        <!-- Description (Mobile) -->
        <p class="text-sm block lg:hidden whitespace-pre-line">{desc}</p>

        <!-- Second Column -->
        <!-- Flex is needed for a good reason.  -->
        <div class="flex flex-col">
            <div class="grid grid-cols-[45%_auto]">
                {@render theSeparator()}
                <!-- Related SDGs -->
                <div class="uppercase font-mono text-xs tracking-widest mb-2 py-2.5">
                    Related SDG
                </div>
                <div class="flex flex-row flex-wrap gap-2 py-2">
                    {#each related_sdg as sdg_num }
                        <img 
                            src="{sdgs[sdg_num].image}"
                            class="sdg-img p-1 w-[40px] h-[40px] object-contain {sdgs[sdg_num].color} mb-2"
                            alt="sdg">
                    {/each}
                </div>
                
                {@render theSeparator()}

                <!-- Class Description -->
                <div class="uppercase font-mono text-xs tracking-widest py-3.5">
                    Section
                </div>
                <p class="py-2 text-xl font-medium">{class_type}</p>

                {@render theSeparator()}

                <!-- Group Description -->
                <div class="uppercase font-mono text-xs tracking-widest mb-2 py-3.5">
                    Authors
                </div>
                <div class="py-2">
                    {#each authors as author}
                    <p class="text-sm font-mono">{author}</p>
                    {/each}
                </div>
                
                {@render theSeparator()}
            </div>

            <!-- Craziest hack to push to bottom. -->
            <!-- Why flex is needed. -->
            <div class="flex-grow"></div>

            <!-- Button Group -->
            <div class="">
                <div class="uppercase font-mono text-xs tracking-widest py-4">
                    EXTERNAL LINKS
                </div>
                <div class="space-y-3 mb-4">
                    <a href="{website}" class="flex items-center justify-between w-full {curr_sdg.color}  hover:opacity-[0.5] text-black font-medium py-2 px-4 transition duration-150">
                        Portfolio
                        <span class="nrk--media-programguide-active size-5"></span>
                    </a>
                    <div class="mx-auto flex items-center justify-center gap-3">
                        <FacebookShare project_title={title} sdg_color={curr_sdg.color}/>
                        <TwitterShare project_title={title} sdg_color={curr_sdg.color}/>
                    </div>
                    <!-- <div bind:this={sharingPanel} class="mx-auto flex items-center justify-center">
                    </div> -->
                    <!-- <a href="share" class="flex items-center justify-between w-full bg-pink-500 hover:bg-pink-600 text-black font-medium py-2 px-4 rounded">
                        Share
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </a> -->
                </div>
            </div>
            
            <!-- Thoughts? -->
            <div class="grid grid-cols-2 py-2">
                <div class="uppercase font-mono text-xs tracking-widest flex flex-row gap-4">
                    THOUGHTS?
                </div>
                <div class="flex items-center justify-end space-x-4">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <!-- svelte-ignore a11y_missing_attribute -->
                    <a>
                        <span class="nrk--star size-5"></span>
                    </a>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <!-- svelte-ignore a11y_missing_attribute -->
                    <a>
                        <span class="nrk--rotate size-5"></span>
                    </a>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <!-- svelte-ignore a11y_missing_attribute -->
                    <a>
                        <span class="nrk--some-tommelopp size-5"></span>
                    </a>
                </div>
            </div>

            <hr class="h-px border-0 bg-amber-50">

        </div>
    </div>

    <!-- Description (Not Mobile) -->
    <p class="text-sm py-6 hidden lg:block whitespace-pre-line">
        {@html desc}
    </p>
    <hr class="h-px border-0 bg-amber-50">
</div>

