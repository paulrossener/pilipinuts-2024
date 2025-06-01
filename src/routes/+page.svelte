<script lang="ts">
    interface SDG {
        [key: string]: { 
            title: string;
            description: string;
            image: string;
            color: string;
        };
    }
    
    import { triggerTypingAnimation, proceedProject } from '$lib/animation.js';
    import { projectList, featuredProjects, icons } from '$lib/script.js';
    import { onMount } from 'svelte';
    
    import sdg from "$lib/data/sdg.json";
    
    const sdgs: SDG = sdg;

    onMount(() => {
        triggerTypingAnimation();
        // projectList();
        featuredProjects();
        icons();
        // proceedProject();
    });

    let homeButton = [
        {id: "projects", content: "View Projects", width: "w-[180px]", spanList: ['T', 'A', 'K', 'E', ' ', 'M', 'E', '!']},
        {id: "nutshell", content: "PilipiNuts 2024", width: "w-[180px]", spanList: ['I', ' ', 'W', 'A', 'N', 'N', 'A', ' ', 'K', 'N', 'O', 'W', '!']}
    ]

    let num = [
        {num: "2", color: "bg-yellow-500"},
        {num: "0", color: "bg-red-500"},
        {num: "2", color: "bg-blue-500"},
        {num: "4", color: "bg-pink-500"}
    ]

    function scrollToSection(id: any) {
        const el = document.getElementById(id);
        if (id === "nutshell") {
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            if (el) proceedProject();
        }
    }

    function goToSDG(sdg_num: Number){
        window.location.href = `/sdg-${sdg_num}`;
    }

    function changeSDGBGColor(newColor: String, target_sdg: Number){
        const color = newColor.replace(/^bg-|\[|\]/g, '');
        const target_element = document.getElementById(`sdg-${target_sdg}`) as HTMLDivElement;
        target_element.style.backgroundColor = color;
    }

</script>

<!-- NOTE: Snippet Area -->
{#snippet sdg_item(number: number)}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        id="sdg-{number}"
        class="sdg-item flex flex-row w-full items-center gap-4 py-[7px] border-b border-white/50"
        onclick={()=>goToSDG(number)}
        onmouseenter={()=>changeSDGBGColor(sdgs[number].color, number)}
        onmouseleave={()=>changeSDGBGColor("", number)}
    >
        <div class="min-w-[50px] max-w-[50px]">
            <img src={sdgs[number].image} alt="{sdgs[number].title}" class="sdg-img p-2 w-full h-[50px] object-contain {sdgs[number].color}"/>
        </div>
        <div class="flex flex-col h-[100%] justify-center truncate">
            <h3 class="font-semibold">{@html sdgs[number].title}</h3>
            <p class="truncate font-mono font-light text-sm">{@html sdgs[number].description}</p>
        </div>
    </div>
{/snippet}

<div id="home" class = "flex w-full h-[100dvh] p-[50px] pt-[55px] text-white">
    <div class="home-container flex flex-row w-full h-full gap-[10px] max-[950px]:justify-center max-[950px]:items-center">
        <div class="home-content flex flex-col w-[60%] h-full justify-center items-center p-[10px] max-[950px]:w-[70%]">
            <div class="container flex flex-grow max-[700px]:w-full"></div>
            <div class="container min-h-[60%] flex flex-col gap-[20px] px-[10px] max-[700px]:w-full">
                <h3 class = "w-[80%] text-8xl font-medium">Can Numbers<br>Change a Nation?</h3>
                <p class = "text-sm w-[65%] max-[700px]:w-full max-[700px]:justify-center max-[700px]:items-center">Dive into data science projects that expose the truths, trends, and turning points in the Philippines’ path to sustainable development.</p>
                <div class="buttons flex flex-row gap-[20px] mt-[5px] max-[700px]:flex-col max-[700px]:justify-center max-[700px]:items-center">
                    {#each homeButton as btn}
                        <button class = {`home-btn relative flex flex-row items-center justify-center ${btn.width} border border-white 
                        overflow-hidden rounded-none font-mono px-2 py-[10px] text-[15px] `} 
                        type="button" onclick={() => scrollToSection(btn.id)}>
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
        <div class="home-pic w-[40%] h-full max-[950px]:hidden">
        </div>
    </div>
</div>
<div id="nutshell" class = "flex flex-col justify-center items-center w-full pt-[55px] text-white gap-[50px]">
    <div class="flex flex-col items-center w-full h-[calc(100dvh-60px)] pt-[20vh] pb-[20vh]">
        <div class="flex flex-col w-[70%]">
            <div class="flex flex-row w-full gap-[20px] mb-24">
                <div class="w-full justify-start text-left">
                    <h3 class="text-5xl font-medium">Where Data Meets <br> the Philippines' <br> Most Urgent <br> Questions</h3>
                </div>
                <div class="">
                    <div class="mb-6">
                        <h3 class="break-words font-mono mb-3">PILIPINUTS 2024</h3>
                        <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
                    </div>
                    <p class = "text-sm mb-3">PilipiNuts 2024 is the culminating showcase of CS 132: Introduction to Data Science at UP Diliman, guided by Asst. Prof. Paul Regonia. This year’s symposium brings together powerful student-led projects that harness data science to investigate and address the Philippines’ most pressing social, economic, and environmental challenges.</p>
                    <p class = "text-sm">From climate resilience to education equity, from poverty trends to public health — PilipiNuts 2025 transforms raw data into meaningful insights and action-driven narratives rooted in the United Nations Sustainable Development Goals (SDGs).</p>
                </div>
            </div>
            <div id = "iconList" class="w-full flex flex-wrap justify-between h-[55px]"></div>
        </div>
        <div class="flex-grow"></div>
        <img src="/misc/accent-lg.svg" class="w-full" alt="Accent">
    </div>
    <div class="flex justify-center items-center w-full h-[calc(100dvh-60px)]">
        <div class="w-[70%] flex flex-row gap-12">
            <div class="nutshell-c-child flex w-[50%] aspect-square items-center justify-center max-[1200px]:w-full">
                <div class="nutshell-pic w-full h-[100%] relative ">
                    <div class="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-[10px] ">
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-blue">
                        </div>
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-red">
                        </div>
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-pink">
                        </div>
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-yellow">
                        </div>
                    </div>
                    <div class="absolute inset-0 z-10 bg-[url('/misc/map.svg')] bg-no-repeat bg-size-[100%] bg-position-[50%_20%] max-[1200px]:bg-size-[60%] pointer-events-none"></div>
                    <div class=" absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 gap-[10px] text-white pointer-events-none">
                        <div class="nutshell-hover  flex flex-col justify-start bg-transparent p-[30px] text-3xl aspect-square">
                            <span>42</span>
                            <span>Projects</span>
                        </div>
                        <div class="nutshell-hover flex flex-col items-end bg-transparent p-[30px] text-3xl aspect-square">
                            <span>15</span>
                            <span>Global Goals</span>
                        </div>
                        <div class="nutshell-hover flex flex-col justify-end bg-transparent p-[30px] text-3xl aspect-square">
                            <span>1</span>
                            <span>Country</span>
                        </div>
                        <div class="nutshell-hover z-10 flex flex-col justify-end items-end bg-transparent p-[30px] text-3xl aspect-square">
                            <span>All In</span>
                            <span>A Nutshell</span>
                        </div>
                    </div>
                    <!-- <div class="absolute inset-0 z-10 bg-[url('/misc/map.svg')] bg-no-repeat bg-size-[100%] bg-position-[50%_20%] max-[1200px]:bg-size-[60%]"></div> -->
                </div>
            </div>
            <div class="nutshell-content flex flex-col w-[50%] flex-grow max-[1200px]:flex-row max-[1200px]:w-full max-[1200px]:h-[50%] ">
                <div class="container w-[100%] h-full flex flex-col border-b border-white/60">
                    <div class = "flex flex-col w-full gap-[10px] max-[1200px]:h-[80%]">
                        <h3 class="font-mono">WHY PILIPINUTS?</h3>
                        <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
                        <p class = "text-sm mt-[10px]">Each project in PilipiNuts 2025 draws inspiration from the United Nations Sustainable Development Goals (SDGs) — 
                            a global framework for ending poverty, protecting the planet, and ensuring peace and prosperity for all.
                        </p>
                        <p class = "text-sm mt-[10px]">Grounded in the realities of the Philippine context, these data science projects tackle urgent challenges such 
                            as climate change, gender inequality, and poverty. More than just academic work, they represent informed, data-driven 
                            contributions to shaping a more just, resilient, and sustainable future.
                        </p>
                    </div>
                    <div class="flex-grow"></div>
                    <div class="flex flex-col w-full pb-12">
                        <div class="text-container text-5xl gap-[10px] flex flex-col max-[1200px]:flex-row max-[1200px]:gap-[0px] max-[1200px]:text-base font-medium">
                            <span class="typing-text"><span class="cursor font-medium">This is the story of the</span></span>
                            <span class="typing-text ml-2"><span class="cursor font-medium">Philippines, told</span></span>
                            <span class="typing-text ml-2"><span class="cursor font-medium">through data —</span></span>
                            <span class="typing-text ml-2"><span class="cursor font-medium">one SDG at a time.</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="projects" class = "flex flex-col items-center w-full min-h-[250dvh] px-[50px] text-white">
    <div class="flex justify-center items-center w-full h-[calc(100dvh)] pb-[135px]">
        <div id="projectIntro" class="relative flex flex-col justify-center items-center text-center w-full h-full">
            <div class="flex flex-col justify-center items-center w-[100%] gap-[20px]">
                <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
                <p class="font-mono">WHEN POWERED BY PURPOSE,<br>DATA SCIENCE DOESN’T JUST REVEAL THE TRUTH —</p>
                <div class="w-full max-w-[800px] font-medium">
                    <span class="text-5xl">It sparks 
                        <span class = "underline decoration-red-500">action</span>, drives 
                        <span class = "underline decoration-yellow-500">change</span>, and helps build a 
                        <span class = "underline decoration-pink-500">better future</span>
                        <span class = "underline decoration-blue-500">for all.</span>
                    </span>
                </div>
            </div>
            <div class = "absolute bottom-0 flex flex-col gap-[10px]">
                <p class=font-mono>PROCEED TO THE PROJECTS</p>
                <i class="proceed fa-solid fa-arrow-down"></i>
            </div>  
        </div>
    </div>
    <div id="startProject" class="w-[70%] pt-[75px]">
        <div class = "flex flex-col mb-4">
            <h1 class="text-5xl break-words font-medium mb-3">Our Projects</h1>
            <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
        </div>
        <p class="w-full my-[20px] mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et orci sem. Maecenas pharetra venenatis est, non rutrum odio dignissim ac. 
            Duis fermentum eleifend turpis. Donec viverra mi in odio varius fringilla. Fusce lacinia vehicula fringilla. 
            Integer enim arcu, bibendum suscipit tortor quis, scelerisque tempor nulla. Vivamus scelerisque elit vitae sem tristique, fermentum faucibus urna maximus.
        </p>
        <div class="flex flex-col w-full h-full gap-[75px]">
            <div class="flex flex-col gap-[30px]">
                <div class="flex justify-between w-full">
                    <h3 class="font-mono">FEATURED WORKS</h3>
                    <div class="flex gap-[30px] text-xl">
                        <button id="prev" class="styleButton flex justify-center items-center px-[10px] py-[5px]" type="button" aria-label="Previous">
                            <span class="button-content"><i class="fa-solid fa-arrow-left"></i></span>
                        </button>
                        <button id="next" class="styleButton flex justify-center items-center px-[10px] py-[5px]" type="button" aria-label="Next">
                            <span class="button-content"><i class="fa-solid fa-arrow-right"></i></span>
                        </button>
                    </div>
                </div>
                <div class="relative h-[400px] ">
                    <div class="absolute inset-y-0 left-0 w-[150px] h-full bg-gradient-to-l from-transparent to-[#080808] pointer-events-none z-10"></div>
                    <div class="absolute inset-y-0 right-0 w-[150px] h-full bg-gradient-to-r from-transparent to-[#080808] pointer-events-none z-10"></div>
                    <div id="featuredProjects" class="text-lg/2 font-medium feature grid grid-flow-col h-full place-items-center border-y border-white/60 overflow-hidden">
                        <!-- Features Project List -->
                    </div>
                </div>
            </div>
            <div class="flex flex-col flex-grow w-full gap-[20px]">
                <h3 class="font-mono">ALL PROJECTS BY SDG</h3>
                <div class="relative flex h-full">
                    <div class="absolute inset-0 grid grid-cols-2 gap-[10px] m-auto">
                        <!-- NOTE: projectList function -->
                        <!-- sdgs -> JSON File -->
                        <div id="col-1" class="flex flex-col border-t border-white">
                            <!-- SDGS 1 - 9 -->
                            {#each { length: 9 }, rank}
                                {@render sdg_item(rank + 1)}
                            {/each}
                        </div>
                        <div id="col-2" class="flex flex-col border-t border-white">
                            <!-- SDGS 10 - 17 -->
                            {#each { length: 8 }, rank}
                                {@render sdg_item(rank + 10)}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="flex items-center justify-center w-full h-[20dvh]">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><rect width="2.8" height="12" x="1" y="6" fill="#fff"><animate id="svgSpinnersBarsScale0" attributeName="y" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="5.8" y="6" fill="#fff"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="10.6" y="6" fill="#fff"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="15.4" y="6" fill="#fff"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="20.2" y="6" fill="#fff"><animate id="svgSpinnersBarsScale1" attributeName="y" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect></svg>
</div>
<div id="inquiries" class = "flex flex-col w-full min-h-[45dvh] px-[50px] text-white">
    <div class="flex flex-col mt-[75px] justify-center items-center gap-[15px]">
        <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
        <h3 class="font-mono">GOT QUESTIONS?</h3>
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
    .hello {
        text-decoration: underline;
    }
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
    
    #nutshell .container h3{
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

    /* @media (max-width: 950px) {
        .home-container {
            justify-content: center;
            align-items: center;
        }

        .home-content {
            width: 70%;
        }

        .home-pic {
            display: none;
        }
    }

    @media (max-width: 700px) {
        .home-content .container,
        .home-content .container p {
            justify-items: center;
            text-align: center;
            width: 100%;
        }

        .buttons{
            flex-direction: column;
            justify-items: center;
            align-items: center;
        }
    } */

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