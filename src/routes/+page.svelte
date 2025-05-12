<script>
    import { triggerTypingAnimation, triggerAnimation, scrollToSection} from '$lib/animation.js';
    import { onMount } from 'svelte';
    
    onMount(() => {
        triggerTypingAnimation();
        triggerAnimation();
        scrollToSection(id);
    });

    let homeButton = [
        {id: "nutshell", content: "View Projects", width: "w-[180px]", spanList: ['T', 'A', 'K', 'E', ' ', 'M', 'E', '!']},
        {id: "project-list", content: "What is PilipiNuts?", width: "w-[200px]", spanList: ['I', ' ', 'W', 'A', 'N', 'N', 'A', ' ', 'K', 'N', 'O', 'W', '!']}
    ]

    let num = [
        {num: "2", color: "bg-yellow-500"},
        {num: "0", color: "bg-red-500"},
        {num: "2", color: "bg-blue-500"},
        {num: "4", color: "bg-pink-500"}
    ]

    let titleAnimation = false;
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

<div id="nutshell" class = "relative flex w-full h-[100dvh] mt-[50px] px-[50px] pt-[100px] text-white">
    <div class="nutshell-container flex flex-row w-full h-full gap-[10px]">
        <div class="nutshell-pic w-[50%] h-[95%] relative">
            <div class="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-[10px]">
                <div class="bg-blue-400/50"></div>
                <div class="bg-gray-400/50"></div>
                <div class="bg-gray-400/50"></div>
                <div class="bg-gray-400/50"></div>
            </div>
            <div class="absolute inset-0 z-10 bg-[url('/nutshell-pic.png')] bg-no-repeat bg-size-[100%] bg-position-[50%_20%]"></div>
            <div class="absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 gap-[10px] text-white">
                <div class="flex flex-col justify-start bg-transparent p-[30px] text-4xl">
                    <span>42</span>
                    <span>Projects</span>
                </div>
                <div class="flex flex-col ml-auto right-0 bg-transparent p-[30px] text-4xl text-right">
                    <span>12</span>
                    <span>SDGs</span>
                </div>
                <div class="flex flex-col justify-start bg-transparent p-[30px] text-4xl">
                    <span>1</span>
                    <span>Country</span>
                </div>
                <div class="flex bg-transparent"></div>
            </div>
        </div> 
        <div class="nutshell-content flex flex-col w-[50%] h-full">
            <div class="container w-[80%] h-[60%] flex flex-col gap-[10px] px-[10px]">
                <h1 class="text-6xl">
                    <span class="typing-text first">Pilipinuts</span>
                    <span class="typing-text second">in A Nutshell</span>
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    </div>
</div>

<div id="project-list" class = "relative flex w-full h-[100dvh] mt-[50px] px-[50px] pt-[100px] text-white">
    Project List
</div>


<style>
    #home {
        background: linear-gradient(170deg, gray 0%,  rgb(89, 89, 89) 8%, black 20%);
    }

    .num-buttons {
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }

    .spin {
        animation: spinY 1.5s linear;
    }

    @keyframes spinY {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
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
        width: 0ch;
        overflow: hidden;
        white-space: nowrap;
        border-right: 1px solid black;
    }

    .typing-text.first.animated {
        animation: typingFirst 2s steps(9) forwards, blink 1s step-end 2 forwards 0s;
    }

    .typing-text.second.animated {
        animation: typingSecond 3s steps(14) forwards 2s, blink 1s step-end infinite 2s;
    }

    @keyframes typingFirst {
        from {
            width: 0ch;
        }
        to {
            width: 8.5ch;
        }
    }

    @keyframes typingSecond {
        from {
            width: 0ch;
        }
        to {
            width: 11.5ch;
        }
    }

    @keyframes blink {
        0% {
            border-color: transparent;
        }
        50% {
            border-color: white;
        }
        100% {
            border-color: transparent;
        }
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