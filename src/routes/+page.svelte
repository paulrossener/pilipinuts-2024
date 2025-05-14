<script>
    import { triggerTypingAnimation, proceedProject } from '$lib/animation.js';
    import { projectList, featuredProjects } from '$lib/script.js';
    import { onMount } from 'svelte';
    
    import sdg from "$lib/data/sdg.json";
    
    onMount(() => {
        triggerTypingAnimation();
        projectList();
        featuredProjects();
        // proceedProject();
    });

    let homeButton = [
        {id: "projects", content: "View Projects", width: "w-[180px]", spanList: ['T', 'A', 'K', 'E', ' ', 'M', 'E', '!']},
        {id: "nutshell", content: "What is PilipiNuts?", width: "w-[200px]", spanList: ['I', ' ', 'W', 'A', 'N', 'N', 'A', ' ', 'K', 'N', 'O', 'W', '!']}
    ]

    let num = [
        {num: "2", color: "bg-yellow-500"},
        {num: "0", color: "bg-red-500"},
        {num: "2", color: "bg-blue-500"},
        {num: "4", color: "bg-pink-500"}
    ]

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (id === "nutshell") {
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            if (el) proceedProject();
        }
    }

</script>

<div id="home" class = "relative flex w-full h-[calc(100dvh-25px)] p-[50px] text-white">
    <div class="home-container flex flex-row w-full h-full gap-[10px]">
        <div class="home-content flex flex-col w-[50%] h-full justify-center items-center p-[10px]">
            <div class="container h-[40%]"></div>
            <div class="container h-[60%] flex flex-col gap-[10px] px-[10px]">
                <h1 class = "text-7xl">Lorem ipsum dolor sit amet</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div class="buttons flex flex-row gap-[20px]">
                    {#each homeButton as btn}
                        <button class = {`home-btn relative flex flex-row items-center justify-center ${btn.width} border border-white 
                        overflow-hidden rounded-[5px] px-[20px] py-[10px] text-[15px] `} 
                        type="button" on:click={() => scrollToSection(btn.id)}>
                            <div class="original absolute flex justify-center items-center bg-black text-white gap-[10px] inset-0 ">{btn.content} <i class="fa-solid fa-arrow-right"></i></div>
                            <div class="inline-flex bg-transparent" role="button" aria-label="Hover effect button" tabindex = 0>
                                {#each btn.spanList as n, i} 
                                    {#if n === ' '}
                                        <span style="--i: {i + 1}">&nbsp;</span>
                                    {:else}
                                        <span style="--i: {i + 1}">{n}</span>
                                    {/if}
                                {/each}
                            </div>
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        <div class="home-pic w-[50%] h-full">
            put home picture here
        </div>
    </div>
</div>

<div id="nutshell" class = "relative flex w-full h-[100dvh] px-[50px] pt-[100px] text-white ">
    <div class="nutshell-container flex flex-row w-full h-full gap-[10px] ">
        <div class="nutshell-pic w-[50%] h-[95%] relative">
            <div class="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-[10px]">
                <div class="nutshell-change bg-gray-400/50"></div>
                <div class="nutshell-change bg-gray-400/50"></div>
                <div class="nutshell-change bg-gray-400/50"></div>
                <div class="nutshell-change bg-gray-400/50"></div>
            </div>
            <div class="absolute inset-0 z-10 bg-[url('/nutshell-pic.png')] bg-no-repeat bg-size-[100%] bg-position-[50%_20%]"></div>
            <div class=" absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 gap-[10px] text-white">
                <div class="nutshell-hover flex flex-col justify-start bg-transparent p-[30px] text-4xl">
                    <span>42</span>
                    <span>Projects</span>
                </div>
                <div class="nutshell-hover flex flex-col ml-auto right-0 bg-transparent p-[30px] text-4xl text-right">
                    <span>17</span>
                    <span>SDGs</span>
                </div>
                <div class="nutshell-hover flex flex-col justify-start bg-transparent p-[30px] text-4xl">
                    <span>1</span>
                    <span>Country</span>
                </div>
                <div class="nutshell-hover flex bg-transparent"></div>
            </div>
        </div> 
        <div class="nutshell-content flex flex-col w-[50%] h-full ">
            <div class="container w-[90%] h-full flex flex-col gap-[10px] px-[10px] mb-[5%] border-b border-white/60 ">
                <div class = "flex flex-col w-[60%] h-[50%] gap-[10px]">
                    <h3>WHAT IS PILIPINUTS?</h3>
                    <div class="relative flex h-[20px]">
                        <div class="absolute inset-0 grid grid-cols-4">
                            <div class="bg-yellow-400"></div>
                            <div class="bg-red-400"></div>
                            <div class="bg-blue-400"></div>
                            <div class="bg-pink-400"></div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col h-[50%] gap-[20px]">
                    <h1 class="text-6xl" aria-label="Pilipinuts in A Nutshell">
                        <span class="typing-text"><span class="cursor">Pilipinuts</span></span>
                        <span class="typing-text delay ml-2"><span class="cursor">in A Nutshell</span></span>
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et orci sem. Maecenas pharetra venenatis est, non rutrum odio dignissim ac. 
                        Duis fermentum eleifend turpis. Donec viverra mi in odio varius fringilla. Fusce lacinia vehicula fringilla. 
                        Integer enim arcu, bibendum suscipit tortor quis, scelerisque tempor nulla. Vivamus scelerisque elit vitae sem tristique, fermentum faucibus urna maximus.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="projects" class = "relative flex flex-col w-full min-h-[295dvh] px-[50px] text-white">
    <div class="flex justify-center items-center w-full h-[100dvh] px-[150px] pb-[135px]">
        <div id="projectIntro" class="relative flex flex-col justify-center items-center text-center w-full h-full">
            <div class="flex flex-col justify-center items-center w-[50%] gap-[20px]">
                <div class = "w-[150px]">
                    <div class="relative flex h-[10px]">
                        <div class="absolute inset-0 grid grid-cols-4">
                            <div class="bg-yellow-400"></div>
                            <div class="bg-red-400"></div>
                            <div class="bg-blue-400"></div>
                            <div class="bg-pink-400"></div>
                        </div>
                    </div>
                </div>
                <p>WHEN POWERED BY PURPOSE, <br> — DATA SCIENCE DOESN’T JUST REVEAL THE TRUTH —</p>
                <h2 class="text-4xl">It sparks action, drives change, and helps build a better future for all.</h2>
            </div>
            <div class = "absolute bottom-0 flex flex-col gap-[10px]">
                <p>PROCEED TO THE PROJECTS</p>
                <i class="proceed fa-solid fa-arrow-down"></i>
            </div>  
        </div>
    </div>
    <div id="startProject" class="w-full pt-[75px]">
        <div class = "flex flex-col justify-between w-[250px] h-[90px]">
            <h1 class="text-5xl break-words">PROJECTS</h1>
            <div class="relative flex h-[20px]">
                <div class="absolute inset-0 grid grid-cols-4">
                    <div class="bg-yellow-400"></div>
                    <div class="bg-red-400"></div>
                    <div class="bg-blue-400"></div>
                    <div class="bg-pink-400"></div>
                </div>
            </div>
        </div>
        <p class="w-full my-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et orci sem. Maecenas pharetra venenatis est, non rutrum odio dignissim ac. 
            Duis fermentum eleifend turpis. Donec viverra mi in odio varius fringilla. Fusce lacinia vehicula fringilla. 
            Integer enim arcu, bibendum suscipit tortor quis, scelerisque tempor nulla. Vivamus scelerisque elit vitae sem tristique, fermentum faucibus urna maximus.
        </p>
        <div class="flex flex-col w-full h-full gap-[75px]">
            <div class="flex flex-col gap-[30px]">
                <div class="flex justify-between w-full">
                    <h3>FEATURED WORKS</h3>
                    <div class="flex gap-[30px] text-xl">
                        <button id="prev" class="styleButton flex justify-center items-center px-[10px] py-[5px]" type="button" aria-label="Previous">
                            <span class="button-content"><i class="fa-solid fa-arrow-left"></i></span>
                        </button>
                        <button id="next" class="styleButton flex justify-center items-center px-[10px] py-[5px]" type="button" aria-label="Next">
                            <span class="button-content"><i class="fa-solid fa-arrow-right"></i></span>
                        </button>
                    </div>
                </div>
                <div class="relative h-[400px]">
                    <div class="absolute inset-y-0 left-0 w-[150px] h-full bg-gradient-to-l from-transparent to-[#080808] pointer-events-none z-10"></div>
                    <div class="absolute inset-y-0 right-0 w-[150px] h-full bg-gradient-to-r from-transparent to-[#080808] pointer-events-none z-10"></div>
                    <div id="featuredProjects" class="feature grid grid-flow-col h-full place-items-center border-y border-white/60 overflow-hidden">
                        <!-- Features Project List -->
                    </div>
                </div>
            </div>
            <div class="flex flex-col flex-grow w-full gap-[20px]">
                <h3>ALL PROJECTS BY SDG</h3>
                <div class="relative flex h-full">
                    <div class="w-[95%] absolute inset-0 grid grid-cols-2 gap-[10px] m-auto">
                        <!-- projectList function -->
                        <div id="col-1" class="flex flex-col border-t border-white"></div>
                        <div id="col-2" class="flex flex-col border-t border-white"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="inquiries" class = "relative flex flex-col w-full min-h-[45dvh] px-[50px] text-white">
    <div class="flex flex-col mt-[75px] justify-center items-center gap-[15px]">
        <div class = "w-[150px]">
            <div class="relative flex h-[10px]">
                <div class="absolute inset-0 grid grid-cols-4">
                    <div class="bg-yellow-400"></div>
                    <div class="bg-red-400"></div>
                    <div class="bg-blue-400"></div>
                    <div class="bg-pink-400"></div>
                </div>
            </div>
        </div>
        <h3>GOT QUESTIONS?</h3>
        <div class="flex flex-col flex-grow gap border-y mt-[10px] w-[280px] text-white">
            <button type = "button" class = "inquiry-btn flex justify-between items-center w-full px-[2px] py-[15px] border-b ">
                <p class='text-xl'>Google Form</p>    
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button type = "button" class = "inquiry-btn flex justify-between items-center w-full px-[2px] py-[10px]">
                <p class='text-xl'>Dev Team</p>    
                <i class="fa-solid fa-code"></i>
            </button>
        </div>
    </div>
</div>

<style>
    #home {
        background: linear-gradient(170deg, gray 0%,  rgb(89, 89, 89) 8%, black 20%);
    }

    .home-btn {
        transition: box-shadow 0.3s ease-in-out;
    }

    .home-btn .original {
        transition: transform 0.3s cubic-bezier(0.87, 0, 0.13, 1);
    }

    .home-btn:hover {
        box-shadow: 0 0 20px #c2dafd;
    }

    .home-btn:hover .original {
        transform: translateY(100%);
    }

    .home-btn span {
        opacity: 0;
        transform: translateY(-15px);
        transition: transform 0.3s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.3s;
    }

    .home-btn span:nth-child(2n) {
        transform: translateY(15px);
    }

    .home-btn:hover span {
        opacity: 1;
        transform: translateY(0);
        transition-delay: calc(0.05s * (var(--i) - 1));
    }

    #nutshell .container h1{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .typing-text {
        font-weight: 700;
        white-space: nowrap;
        display: inline-block;
    }

    .cursor {
        display: inline-block;
        border-right: 1px solid black;
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        0%, 100% { border-color: transparent; }
        50% { border-color: white; }
    }

    .proceed.animate {
        animation: hi 1s ease-in-out 2;
    }

    @keyframes hi {
        0%, 100% {transform: translateY(0px);}
        50% { transform: translateY(20px);}
    }

    .styleButton {
        transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    .styleButton:hover {
        background-color: white;
        color: black;
    }

    .button-content {
        transition: transform 0.3s ease; 
    }

    #prev:active .button-content {
        transform: rotateY(30deg) scale(0.95);  
    }

    #next:active .button-content {
        transform: rotateY(-30deg) scale(0.95); 
    }

    :global(.empty h3) {
        opacity: 0.5;
    }

    :global(.featured) {
        transition: background-color 0.5s ease, color 0.5s ease, transform 0.3s ease;
        perspective: 1000px;
    }

    :global(.rotating) {
        transition: transform 0.3s ease;
        transform-style: preserve-3d; 
    }

    :global(.featured:hover) {
        cursor: pointer;
        background-color: white;
        color: black;
    }

    :global(.featured:hover .rotating) {
        transform: rotateX(5deg) scale(0.98);
        transform-origin: center; 
    }

    :global(.sdg-img),
    :global(.sdg-item) {
        transition: background-color 0.2s ease-in-out;
    }

    :global(.sdg-item:hover) {
        cursor: pointer;
    }


    :global(.sdg-item:hover .sdg-img) {
        background-color: transparent;
    }

    .inquiry-btn {
        transition: background-color 0.3s ease, color 0.3s ease, padding 0.3s ease;
    }

    .inquiry-btn:hover {
        background-color: white;
        color: black;
        padding-inline: 10px;
    }

</style>

    <!-- import { onMount } from 'svelte';

    let pages = [
        { id: "home", color: "bg-black", height: "min-h-[100dvh]", content: "1" },
        { id: "nutshell", color: "bg-green-500", height: "min-h-[200dvh]", content: "2" },
        { id: "projects", color: "bg-blue-500", height: "min-h-[93dvh]", content: "3" },
        { id: "inquries", color: "bg-yellow-500", height: "min-h-[30dvh]", content: "4" },
        { id: "about-us", color: "bg-purple-500", height: "min-h-[30dvh]", content: "5" }
    ]; -->

<!-- bg-[url('/static/favicon.png')] -->
<!-- {#each pages as page}
    <div id="{page.id}" class={`page relative flex w-full ${page.height} mt-[25px] p-[50px] ${page.color}`}>
        {page.content}
    </div>
{/each} -->