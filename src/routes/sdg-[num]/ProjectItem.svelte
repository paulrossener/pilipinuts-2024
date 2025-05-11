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

<div class="grid grid-cols-[80%_20%]">
    <div class="border-2 border-indigo-600">
        <h1>{title}</h1>
        {#await import(`$lib/assets/plots/${plot}.png`) then { default: src }}
        <img {src} class="h-auto w-auto" alt="Profile">
        {/await}
        <p>{desc}</p>
    </div>
    <div class="border-2 border-indigo-600">
        <p>{group}</p>
        <p>{name}</p>
        {#each authors as author}
            <p>{author}</p>
        {/each}
        <p>{class_type}</p>
        <p>{website}</p>
    </div>
</div>




