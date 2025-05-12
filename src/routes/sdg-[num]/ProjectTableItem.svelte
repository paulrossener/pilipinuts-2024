<script lang="ts">
	let { 
        group, 
        name, 
        title, 
        desc, 
        authors, 
        plot, 
        website, 
        class_type,
    } = $props();
</script>

<tr class="border-b border-b-amber-50">
    <td class="w-xs py-4">
        <div>
            <p class="font-dmsans text-2xl">
                {name}
            </p>
        </div>
        <p>
            {#each authors as author, i}
                {#if i > 0},{/if}
                {author}
            {/each}
        </p>
    </td>
    <td class="w-lg py-4 font-dmsans text-2xl">
        {title}
    </td>
    <td class="py-4">

    </td>
    <td class="py-4">
        <button class="float-right flex font-dmsans">
            View
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd" />
            </svg>
        </button>
        
    </td>
</tr>