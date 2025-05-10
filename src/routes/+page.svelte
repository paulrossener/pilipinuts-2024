<script>
    // import { onMount } from 'svelte';

    // let pages = [
    //     { id: "home", color: "bg-black", height: "min-h-[100dvh]", content: "1" },
    //     { id: "nutshell", color: "bg-green-500", height: "min-h-[200dvh]", content: "2" },
    //     { id: "projects", color: "bg-blue-500", height: "min-h-[93dvh]", content: "3" },
    //     { id: "inquries", color: "bg-yellow-500", height: "min-h-[30dvh]", content: "4" },
    //     { id: "about-us", color: "bg-purple-500", height: "min-h-[30dvh]", content: "5" }
    // ];

    let homeButton = [
        {content: "View the Projects", width: "180px"},
        {content: "What is Pilipinuts?", width: "200px"}
    ]

    let num = [
        {num: "2", color: "bg-yellow-500"},
        {num: "0", color: "bg-red-500"},
        {num: "2", color: "bg-blue-500"},
        {num: "4", color: "bg-pink-500"}
    ]

    let animating = false;

    function triggerAnimation() {
        if (animating) return;

        animating = true;
        setTimeout(() => {
            animating = false;
        }, 2000 + num.length * 100);
    }
</script>

<nav id="topBar" class="top-bar fixed flex flex-row items-center top-0 w-full h-[55px] bg-black text-white border-b border-white/30 z-[1000]">
    <div class="flex flex-row items-center bg-black-500 w-full h-full px-[50px] py-[10px]">
        <a target="_self" href="/" aria-label="Page Title" class="title-content flex items-center" on:mouseenter={triggerAnimation}>
            <div class="relative flex items-baseline gap-[10px]">
                <h3 class="font-[Fascinate_Inline,_system-ui] text-[20px] tracking-[1px]">PilipiNuts</h3>
                <div class="flex flex-row">
                    {#each num as n, i}
                        <div
                        class={`num-buttons inline-flex flex-row ${n.color} p-[5px] ${animating ? 'spin' : ''}`}
                        style={`animation-delay: ${i * 0.1}s`}
                        >
                        {n.num}
                        </div>
                    {/each}
                </div>
            </div>
        </a>
        <div class="flex flex-grow items-center justify-end h-full gap-[5px]">
            <div class="serch-input relative flex flex-row h-full">
                <input type="text" placeholder="Search by Project Name" class="flex bg-black h-full text-s p-[10px] pr-10 text-white border-gray-500">
                <button type = "button" aria-label="Search Button"><i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-white"></i></button>
            </div>
            <div class = "flex flex-row items-center bg-[#29282C] h-full p-[10px] gap-[10px]">View SDGs<i class="fa-solid fa-file"></i></div>
        </div>
    </div>
</nav>

<div id="home" class = "relative flex w-full h-[calc(100dvh-25px)] mt-[25px] p-[50px] text-white">
    <div class="home-container flex flex-row w-full h-full gap-[10px]">
        <div class="home-content flex flex-col w-[50%] h-full justify-center items-center p-[10px]">
            <div class="container h-[40%]"></div>
            <div class="container h-[60%] flex flex-col gap-[10px] px-[10px]">
                <h1 class = "text-7xl">Lorem ipsum dolor sit amet</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div class="buttons flex flex-row gap-[10px]">
                    {#each homeButton as btn}
                        <button class = {`home-btn flex flex-row items-center justify-center border border-white px-[15px] py-[5px] gap-[10px]`} type = "button">{btn.content}<i class="fa-solid fa-arrow-right"></i></button>
                    {/each}
                </div>
            </div>
        </div>
        <div class="home-pic w-[50%] h-full">
            put home picture here
        </div>
    </div>
</div>

<div id="nutshell" class = "relative flex w-full h-[140dvh] mt-[50px] p-[50px] text-white">
    <div class="nutshell-container flex flex-row w-full h-full gap-[10px]">
        <div class="nutshell-pic w-[50%] h-[60%] relative">
            <div class="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-[10px]">
                <div class="bg-blue-400/50"></div>
                <div class="bg-gray-400/50"></div>
                <div class="bg-gray-400/50"></div>
                <div class="bg-gray-400/50"></div>
            </div>
            <div class="absolute inset-0 z-10 bg-[url('/nutshell-pic.png')] bg-no-repeat bg-size-[90%] bg-position-[50%_20%]"></div>
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
                <h1 class = "text-7xl">Pilipinuts<br>in A Nutshell</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    </div>
</div>

<!-- bg-[url('/static/favicon.png')] -->
<!-- {#each pages as page}
    <div id="{page.id}" class={`page relative flex w-full ${page.height} mt-[25px] p-[50px] ${page.color}`}>
        {page.content}
    </div>
{/each} -->

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


</style>