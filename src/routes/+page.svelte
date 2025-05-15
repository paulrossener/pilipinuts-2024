<script>
    import { triggerTypingAnimation, proceedProject } from '$lib/animation.js';
    import { projectList, featuredProjects, icons } from '$lib/script.js';
    import { onMount } from 'svelte';
    
    import sdg from "$lib/data/sdg.json";
    
    onMount(() => {
        triggerTypingAnimation();
        projectList();
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

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (id === "nutshell") {
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            if (el) proceedProject();
        }
    }

</script>


<div id="home" class = "relative flex w-full h-[100dvh] p-[50px] pt-[55px] text-white">
    <div class="home-container flex flex-row w-full h-full gap-[10px] max-[950px]:justify-center max-[950px]:items-center">
        <div class="home-content flex flex-col w-[60%] h-full justify-center items-center p-[10px] max-[950px]:w-[70%]">
            <div class="container flex flex-grow max-[700px]:w-full"></div>
            <div class="container min-h-[60%] flex flex-col gap-[20px] px-[10px] max-[700px]:w-full">
                <h3 class = "w-[80%] text-7xl">Can Numbers Change a Nation?</h3>
                <p class = "text-sm w-[65%] max-[700px]:w-full max-[700px]:justify-center max-[700px]:items-center">Dive into data science projects that expose the truths, trends, and turning points in the Philippines’ path to sustainable development.</p>
                <div class="buttons flex flex-row gap-[20px] mt-[5px] max-[700px]:flex-col max-[700px]:justify-center max-[700px]:items-center">
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
        <div class="home-pic w-[40%] h-full max-[950px]:hidden">
            put home picture here
        </div>
    </div>
</div>



<div id="nutshell" class = "relative flex flex-col justify-center items-center w-full min-h-[200dvh] pt-[55px] text-white gap-[50px]">
    <div class="flex flex-col justify-center items-center w-[90%] h-[80dvh] gap-[20px]">
        <div class = "flex flex-col justify-between w-[90%] gap-[10px] ">
            <h3 class="text-3xl break-words">PILIPINUTS 2024</h3>
            <div class="relative flex h-[10px] w-[250px]">
                <div class="absolute inset-0 grid grid-cols-4">
                    <div class="bg-yellow-400"></div>
                    <div class="bg-red-400"></div>
                    <div class="bg-blue-400"></div>
                    <div class="bg-pink-400"></div>
                </div>
            </div>
        </div>
        <div class="flex flex-row h-[60%] w-[90%] gap-[20px]">
            <div class="flex w-[45%] justify-center text-left pt-[10px]">
                <h3 class="text-6xl">Where Data Meets the Nation’s <br> Most Urgent <br> Questions</h3>
            </div>
            <div class="flex flex-col gap-[20px] w-[55%] border-t">
                <div></div>
                <p class = "text-sm mt-[20px]">PilipiNuts 2024 is the culminating showcase of CS 132: Introduction to Data Science at UP Diliman, guided by Asst. Prof. Paul Regonia. This year’s symposium brings together powerful student-led projects that harness data science to investigate and address the Philippines’ most pressing social, economic, and environmental challenges.</p>
                <p class = "text-sm mt-[20px]">From climate resilience to education equity, from poverty trends to public health — PilipiNuts 2025 transforms raw data into meaningful insights and action-driven narratives rooted in the United Nations Sustainable Development Goals (SDGs).</p>
            </div>
        </div>
        <div id = "iconList" class="flex flex-wrap h-[55px] gap-[20px]"></div>
        <div class="absolute bottom-0 top-[45%] flex flex-col w-full mt-[10px]">
            <div class="relative flex justify-center items-center left-0 h-[18px] w-[55%] bg-yellow-500 text-yellow-500">
                g
            </div>
            <div class="relative flex justify-center items-center left-[15%] h-[18px] w-[55%] bg-red-500 text-red-500">
                g
            </div>
            <div class="relative flex justify-center items-center left-[30%] h-[18px] w-[55%] bg-blue-500 text-blue-500">
                g
            </div>
            <div class="relative flex justify-center items-center left-[45%] h-[18px] w-[55%] bg-pink-500 text-pink-500">
                g
            </div>
        </div>
    </div>
    <div class="nutshell-container flex flex-row w-full h-[93dvh] gap-[30px] p-[50px] max-[1200px]:flex-col">
        <div class="nutshell-c-child flex w-[50%] h-full items-center justify-center max-[1200px]:w-full">
            <div class="nutshell-pic w-full h-[100%] relative ">
                <div class="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-[10px]">
                    <div class="nutshell-change bg-gray-400/50 "></div>
                    <div class="nutshell-change bg-gray-400/50 "></div>
                    <div class="nutshell-change bg-gray-400/50 "></div>
                    <div class="nutshell-change bg-gray-400/50 "></div>
                </div>
                <div class="absolute inset-0 z-10 bg-[url('/nutshell-pic.png')] bg-no-repeat bg-size-[100%] bg-position-[50%_20%] max-[1200px]:bg-size-[60%]"></div>
                <div class=" absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 gap-[10px] text-white">
                    <div class="nutshell-hover flex flex-col justify-start bg-transparent p-[30px] text-4xl aspect-square">
                        <span>42</span>
                        <span>Projects</span>
                    </div>
                    <div class="nutshell-hover flex flex-col bg-transparent p-[30px] text-4xl text-right aspect-square">
                        <span>17</span>
                        <span>SDGs</span>
                    </div>
                    <div class="nutshell-hover flex flex-col justify-start bg-transparent p-[30px] text-4xl aspect-square">
                        <span>1</span>
                        <span>Country</span>
                    </div>
                    <div class="nutshell-hover flex bg-transparent aspect-square"></div>
                </div>
            </div>
        </div>
        <div class="nutshell-content flex flex-col w-[50%] h-full max-[1200px]:flex-row max-[1200px]:w-full max-[1200px]:h-[50%] ">
            <div class="container w-[100%] h-full flex flex-col px-[10px] border-b border-white/60">
                <div class = "flex flex-col w-full h-[50%] gap-[10px] max-[1200px]:h-[80%]">
                    <h3>WHY PILIPINUTS?</h3>
                    <div class="relative flex h-[20px] w-[250px]">
                        <div class="absolute inset-0 grid grid-cols-4">
                            <div class="bg-yellow-400"></div>
                            <div class="bg-red-400"></div>
                            <div class="bg-blue-400"></div>
                            <div class="bg-pink-400"></div>
                        </div>
                    </div>
                    <p class = "text-sm mt-[10px]">Each project in PilipiNuts 2025 draws inspiration from the United Nations Sustainable Development Goals (SDGs) — 
                        a global framework for ending poverty, protecting the planet, and ensuring peace and prosperity for all.
                    </p>
                    <p class = "text-sm mt-[10px]">Grounded in the realities of the Philippine context, these data science projects tackle urgent challenges such 
                        as climate change, gender inequality, and poverty. More than just academic work, they represent informed, data-driven 
                        contributions to shaping a more just, resilient, and sustainable future.
                    </p>
                </div>
                <div class="flex flex-col w-full h-[50%] gap-[20px]">
                    <div class="text-container text-5xl mt-[20px] gap-[10px] flex flex-col max-[1200px]:flex-row max-[1200px]:gap-[0px] max-[1200px]:text-base">
                        <span class="typing-text"><span class="cursor font-medium">This is the story of the</span></span>
                        <span class="typing-text ml-2"><span class="cursor font-medium">Philippines, told</span></span>
                        <span class="typing-text ml-2"><span class="cursor font-medium">through data —</span></span>
                        <span class="typing-text ml-2"><span class="cursor font-medium">one SDG at a time.</span></span>
                    </div>
                    <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et orci sem. Maecenas pharetra venenatis est, non rutrum odio dignissim ac. 
                        Duis fermentum eleifend turpis. Donec viverra mi in odio varius fringilla. Fusce lacinia vehicula fringilla. 
                        Integer enim arcu, bibendum suscipit tortor quis, scelerisque tempor nulla. Vivamus scelerisque elit vitae sem tristique, fermentum faucibus urna maximus.
                    </p> -->
                </div>
            </div>
        </div>
    </div>
</div>

<div id="projects" class = "relative flex flex-col w-full min-h-[295dvh] px-[50px] text-white">
    <div class="flex justify-center items-center w-full h-[100dvh] pb-[135px]">
        <div id="projectIntro" class="relative flex flex-col justify-center items-center text-center w-full h-full">
            <div class="flex flex-col justify-center items-center w-[100%] gap-[20px]">
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
                <div class="w-full max-w-[800px]">
                    <span class="text-5xl">It sparks 
                        <span class = "underline decoration-red-500">action</span>, drives 
                        <span class = "underline decoration-yellow-500">change</span>, and helps build a 
                        <span class = "underline decoration-pink-500">better future</span>
                        <span class = "underline decoration-blue-500">for all.</span>
                    </span>
                </div>
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