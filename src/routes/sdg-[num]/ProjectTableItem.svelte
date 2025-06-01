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
    <td class="w-xs py-2">
        <div>
            <p class="text-xl font-medium">
                {name}
            </p>
        </div>
        <p class="text-xs font-mono">
            {#each authors as author, i}
                {#if i > 0},{/if}
                {author}
            {/each}
        </p>
    </td>
    <td class="w-lg py-2 font-medium text-xl/6">
        {title}
    </td>
    <td class="py-2 flex flex-row flex-wrap gap-2">
        {#each related_sdg as sdg_num }
            <img 
                src="{sdgs[sdg_num].image}"
                class="sdg-img p-1 w-[40px] h-[40px] object-contain {sdgs[sdg_num].color} mb-2"
                alt="sdg">
        {/each}
    </td>
    <td class="py-2">
        <button class="float-right flex font-dmsans hover:bg-white hover:text-black p-1 rounded-md transition duration-150" onclick={view_item}>
            View
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd" />
            </svg>
        </button>
        
    </td>
</tr>