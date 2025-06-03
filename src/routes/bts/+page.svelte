<script lang="ts">
    import dev from "$lib/data/dev.json";
    import Profile from "./Profile.svelte";
    const devs = dev["devs"];
</script>

<div class="flex flex-col items-center bg-black w-full text-white p-10">
    <img src="/misc/logo-black.svg" class="sdg-img p-2 w-[50px] h-[50px] object-contain bg-white mb-2" alt="sdg">
    <h1 class="font-bold text-5xl text-center mb-4">About Us</h1>
    <p class="font-mono text-sm text-center">Get to know more about the developers of this website!</p>
</div>
<img src="/misc/accent-full.svg" class="w-full" alt="Accent">
<div class="flex flex-col w-full items-center mt-8">
    <div class="w-[80%] lg:w-[70%] grid grid-cols-6 gap-6">
        <div class="col-span-6 lg:col-span-2 flex flex-col">
            <span class="font-mono uppercase break-words font-medium mb-3">Team PilipiNuts 2024</span>
            <img src="/misc/accent-sm.svg" class="w-[150px] mb-6" alt="Accent">
            <p class="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non pretium mauris. Mauris quis congue elit, ut laoreet felis. Nam eget dui augue. Quisque congue accumsan urna ut sagittis. 
            </p>
        </div>
        <div class="col-span-6 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each devs as dev}
                <Profile dev={dev}/>
            {/each}
            
        </div>
    </div>
</div>