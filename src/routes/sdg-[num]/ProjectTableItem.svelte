<script lang="ts">

    import FacebookShare from "$lib/components/FacebookShare.svelte";
    import TwitterShare from "$lib/components/TwitterShare.svelte";
    
    import sdg from "$lib/data/sdg.json";
    interface SDG {
        [key: string]: { 
            title: string;
            description: string;
            image: string;
            color: string;
        };
    }
    const sdgs: SDG = sdg;

	let { 
        group, 
        name, 
        title, 
        desc, 
        authors, 
        plot, 
        website, 
        class_type,
        view_item,
        related_sdg
    } = $props();
</script>

<tr class="border-b border-b-amber-50">
    <td class="w-[200px] py-2 pr-2 align-top">
        <p class="text-[8pt] md:text-xs font-mono">
            {#each authors as author, i}
                {#if i > 0},{/if}
                {author}
            {/each}
        </p>
    </td>
    <td class="w-md py-2 font-medium text-xs md:text-xl/6">
        {title}
    </td>
    <td class="w-[160px] py-2 flex-row flex-wrap gap-2 items-center hidden md:flex">
        {#each related_sdg as sdg_num }
            <img 
                src="{sdgs[sdg_num].image}"
                class="sdg-img p-1 w-[40px] h-[40px] object-contain {sdgs[sdg_num].color} mb-2"
                alt="sdg">
        {/each}
    </td>
    <td class="py-2">
        <button class="float-right flex items-center gap-3 font-dmsans hover:bg-[rgb(255,255,255,0.3)] px-4 py-2 transition duration-150" onclick={view_item}>
            <span class="hidden md:inline-block">
                View
            </span>
            <span class="nrk--fullscreen size-4"></span>
        </button>
    </td>
</tr>