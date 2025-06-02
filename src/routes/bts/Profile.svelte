<script lang="ts">
    let { dev } = $props();
</script>

<div class="border-b-1 border-amber-50 flex flex-col">
    <img src={dev.img} class="aspect-square object-cover mb-2" alt="Profile">
        <div class="w-full flex flex-row-reverse items-end uppercase text-xs mb-4">
            {#if dev.role.length == 2}
                <span class="font-mono">{dev.role[1]}</span>
                <span class="flex-grow"></span>
            {/if}
            <span class="font-mono">{dev.role[0]}</span>
            
        </div>
        <h2 class="text-4xl sm:hidden font-medium mb-2">{dev.name}</h2>
        <h2 class="hidden sm:block text-4xl font-medium" style="margin-bottom: -8pt;">
            {dev.name.split(" ")[0]}
        </h2>
        <h2 class="hidden sm:block text-4xl font-medium mb-2">
            {dev.name.split(" ")[1]}
        </h2>
        <p class="text-xs mb-2">
            {dev.description}
        </p>
        <div class="flex-grow"></div>
        <div class="flex flex-row justify-end gap-2 pb-4 text-xl">
            <a href={dev.github} target="_blank"><i class="fa-brands fa-github"></i></a>
            <a href={dev.linkedin} target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
    </div>