<script lang="ts">
	let { 
        group, 
        name, 
        title, 
        desc, 
        authors, 
        plot, 
        website, 
        class_type 
    } = $props();
    
</script>

<div class="grid grid-cols-2">
    <div>
        <p class="text-white">{title}</p>
        {#await import(`$lib/assets/plots/${plot}.png`) then { default: src }}
        <img {src} class="h-auto w-full" alt="Profile">
        {/await}
        <p class="text-white">{desc}</p>
    </div>
    <div>
        <p class="text-white">{group}</p>
        <p class="text-white">{name}</p>
        {#each authors as author}
            <p class="text-white">{author}</p>
        {/each}
        <p class="text-white">{class_type}</p>
        <p class="text-white">{website}</p>
    </div>
</div>




