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
    let sharingPanel = $state() as HTMLDivElement;

    const sdgs: SDG = sdg;
    const curr_sdg = sdgs[sdg_num];

    const showModalImage: Function = getContext('modal-image');

    onMount(() => {
        const new_color = curr_sdg.color.replace(/^bg-|\[|\]/g, '');
        sharingPanel.style.color = new_color;
    });


    console.log(curr_sdg);
</script>

<!-- If List View -->
<div class="mb-10">
    <h1 class="mb-4 text-4xl font-medium">{title}</h1>

    <div class="grid grid-cols-[70%_auto] border-collapse gap-4 mb-4">
        <!-- First Column -->
        <div class="">
            {#await import(`$lib/assets/plots/${plot}.png`) then { default: src }}
            <button onclick={()=>showModalImage(plot)} type="button" aria-haspopup="dialog" aria-expanded="false" data-melt-dialog-trigger="" data-dialog-trigger="">
                <img {src} class="mb-4 h-auto w-auto transition-all duration-200 hover:scale-[1.01] hover:brightness-125" alt="Profile">
            </button>
            {/await}
        </div>
        <!-- Second Column -->
        <!-- Flex is needed for a good reason.  -->
        <div class="flex flex-col">

            <div class="grid grid-cols-2">
                <!-- Related SDGs -->
                <div class="uppercase font-mono text-xs tracking-widest mb-2 py-2">
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
                <!-- Class Description -->
                <div class="uppercase font-mono text-xs tracking-widest mb-2 py-2">
                    Section
                </div>
                <p class="py-2 text-xl font-medium">{class_type}</p>
                <!-- Group Description -->
                <div class="uppercase font-mono text-xs tracking-widest mb-2">
                    Group {group}
                </div>
                <div>
                    <p class="text-xl mb-1 font-medium">{name}</p>
                    {#each authors as author}
                    <p class="text-sm font-mono">{author}</p>
                    {/each}
                </div>
                
            </div>
            
            <!-- Craziest hack to push to bottom. -->
            <!-- Why flex is needed. -->
            <div class="flex-grow"></div>

            <!-- Button Group -->
            <div class="">
                <div class="uppercase font-mono text-xs tracking-widest mb-4">
                    LEARN MORE
                </div>
                <div class="space-y-3 mb-4">
                    <a href="{website}" class="flex items-center justify-between w-full {curr_sdg.color}  hover:opacity-[0.5] text-black font-medium py-2 px-4">
                        Portfolio
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        
                    </a>
                    <div class="uppercase text-gray-400 text-xs tracking-widest mb-4">
                        SHARE
                    </div>
                    <div bind:this={sharingPanel} class="mx-auto flex items-center justify-center">
                        <FacebookShare project_title={title}/>
                        <TwitterShare project_title={title}/>
                    </div>
                    <!-- <a href="share" class="flex items-center justify-between w-full bg-pink-500 hover:bg-pink-600 text-black font-medium py-2 px-4 rounded">
                        Share
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </a> -->
                </div>
            </div>
            
            <!-- Thoughts? -->
            <div class="grid grid-cols-2">
                <div class="uppercase font-mono text-xs tracking-widest py-2">
                    THOUGHTS?
                </div>
                <div class="flex items-center justify-end space-x-4">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <p class="text-sm">{desc}</p>
</div>

