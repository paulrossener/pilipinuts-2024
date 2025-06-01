<script lang="ts">
    import dev from "$lib/data/dev.json";
    import Profile from "./Profile.svelte";
    const devs = dev["devs"];
</script>

<div class="flex flex-col items-center bg-black w-full text-white p-10">
    <img src="/misc/logo-black.svg" class="sdg-img p-2 w-[50px] h-[50px] object-contain bg-white mb-2" alt="sdg">
    <h1 class="font-bold text-5xl mb-4">Team PilipiNuts 2024</h1>
    <p class="font-mono text-sm">Get to know more about the developers of this website!</p>
</div>
<img src="/misc/accent-full.svg" class="w-full" alt="Accent">
<div class="flex flex-col w-full items-center mt-8">
    <!-- <div class="w-[70%]">
        <div class="w-full flex flex-row gap-2 text-xs font-mono font-medium text-black items-center mb-6">
            <a href="/"><button class="uppercase bg-[rgb(255,255,255,0.3)] hover:bg-white h-full py-2 px-4">PilipiNuts 2024</button></a>
            <button class="uppercase bg-white h-full py-2 px-4">MEET THE TEAM</button>
        </div>
    </div> -->
    <div class="w-[60%]">
        <div class="w-full grid grid-cols-4 gap-6" style="">
            {#each devs as dev}
                <Profile dev={dev}/>
            {/each}
            
        </div>
    </div>
</div>