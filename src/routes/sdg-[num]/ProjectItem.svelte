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

<p class="text-white">{group}</p>
<p class="text-white">{name}</p>
<p class="text-white">{title}</p>
<p class="text-white">{desc}</p>
{#each authors as author}
    <p class="text-white">{author}</p>
{/each}
<p class="text-white">{plot}</p>
<p class="text-white">{website}</p>
<p class="text-white">{class_type}</p>