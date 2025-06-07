<script lang="ts">
    import dev from "$lib/data/dev.json";
    import Profile from "./Profile.svelte";
    const devs = dev["devs"];
</script>

<svelte:head>
	<title>Hi! We Are Team PilipiNuts 2024</title>
</svelte:head>

<div class="flex flex-col items-center bg-black w-full text-white p-10">
    <img src="/misc/logo-black.svg" class="sdg-img p-2 w-[50px] h-[50px] object-contain bg-white mb-2" alt="sdg">
    <h1 class="font-bold text-5xl text-center mb-4">About Us</h1>
    <p class="font-mono text-sm text-center">Get to know more about the developers of this website!</p>
</div>
<img src="/misc/accent-full.svg" class="hidden xl:block w-full" alt="Accent">
<div class="flex flex-col w-full items-center mt-8">
    <div class="w-[70%] lg:w-[70%] grid grid-cols-6 gap-6">
        <div class="col-span-6 lg:col-span-2 flex flex-col">
            <span class="font-mono uppercase break-words font-medium mb-3">Team PilipiNuts 2024</span>
            <img src="/misc/accent-sm.svg" class="w-[150px] mb-6" alt="Accent">
            <p class="text-sm mb-4">
                We’re the team behind <span class="font-mono">PILIPINUTS 2024</span>, dedicated to bringing this platform to life. Tasked with curating, organizing, and presenting the collective data-driven projects of our batch, we built this space to showcase the incredible work of our peers—including our own.
            </p>
            <p class="text-sm mb-4">
                Our goal is simple: to transform valuable student insights into an accessible, interactive experience that demonstrates how data can raise awareness and inspire real-world impact.
            </p>
            <p class="text-sm">
                Thanks for stopping by—we hope you enjoy exploring the work as much as we enjoyed creating the space for it! 😊
            </p>
        </div>
        <div class="col-span-6 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each devs as dev}
                <Profile dev={dev}/>
            {/each}
            
        </div>
    </div>
</div>