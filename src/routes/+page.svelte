<script lang="ts">
    import { triggerTypingAnimation, proceedProject } from '$lib/animation.js';
    import { featuredProjects, icons } from '$lib/script.js';
    import { onMount } from 'svelte';

    interface SDG {
        [key: string]: { 
            title: string;
            description: string;
            image: string;
            color: string;
        };
    }

    import sdg from "$lib/data/sdg.json";
    const sdgs: SDG = sdg;
    const sdg_entries = Object.entries(sdgs);

    onMount(() => {
        triggerTypingAnimation();
        featuredProjects();
        icons();
    });

    let homeButton = [
        {id: "projects", content: "View Projects", width: "w-[180px]", spanList: ['T', 'A', 'K', 'E', ' ', 'M', 'E', '!']},
        {id: "nutshell", content: "PilipiNuts 2024", width: "w-[180px]", spanList: ['I', ' ', 'W', 'A', 'N', 'N', 'A', ' ', 'K', 'N', 'O', 'W', '!']}
    ]

    function scrollToSection(id: any) {
        const el = document.getElementById(id);
        console.log(el)
        if (id === "nutshell") {
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            if (el) proceedProject();
        }
    }

    function changeSDGBGColor(newColor: String, target_sdg: String){
        const color = newColor.replace(/^bg-|\[|\]/g, '');
        const target_element = document.getElementById(`sdg-${target_sdg}`) as HTMLDivElement;
        target_element.style.backgroundColor = color;
    }

	const colors = ['bg-blue-500', 'bg-red-500', 'bg-yellow-400', 'bg-pink-400'];
	let circles = Array.from({ length: 30 }, (_, i) => {
		const size = Math.floor(Math.random() * 10) + 4;
		const x = Math.random() * 100;
		const y = Math.random() * 100;
		const moveX = `${Math.random() * 100 - 50}px`;
		const moveY = `${Math.random() * 100 - 50}px`;
		const duration = `${Math.random() * 10 + 5}s`;

		return {
			id: i,
			color: colors[i % colors.length],
			size,
			x,
			y,
			moveX,
			moveY,
			duration,
		};
	});
    
    onMount(() => {
    function scrollToSectionLR(s: string) {
      const scrollContainer = document.querySelector<HTMLDivElement>('.i-chart-segment');

      if (scrollContainer) {
        const targets = scrollContainer.querySelectorAll<HTMLIFrameElement>('iframe');

        if (targets.length > 0) {
          const tw = targets[0].offsetWidth;

          if (s === 'L') {
            scrollContainer.scrollBy({ left: -tw, behavior: 'smooth' });
          } else {
            scrollContainer.scrollBy({ left: tw, behavior: 'smooth' });
          }
        }
      }
    }

    document.querySelector<HTMLButtonElement>('#btn1')?.addEventListener('click', () => scrollToSectionLR('L'));
    document.querySelector<HTMLButtonElement>('#btn2')?.addEventListener('click', () => scrollToSectionLR('R'));
  });
</script>

<div id="home" class = "relative bg-black flex items-center justify-center w-full h-[calc(100dvh-60px)] text-white">
    <div class="circles-container absolute block xl:hidden w-full h-[100dvh] mt-[60px] overflow-hidden pointer-events-none">
        <div class="relative">
            {#each circles as c (c.id)}
                <div
                    class={`circle absolute opacity-70 brightness-125 rounded-full ${c.color}`}
                    style="
                    width: {c.size}px;
                    height: {c.size}px;
                    left: {c.x}vw;
                    top: {c.y}vh;
                    --x: {c.moveX};
                    --y: {c.moveY};
                    z-index: 0;
                    animation-duration: {c.duration};
                    "
                >
                </div>
            {/each}
        </div>
        <div class="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black/90 to-transparent transition duration-500 ease-in-out pointer-events-none"></div>
    </div>
    <div class="home-container z-10 flex flex-row w-full xl:w-[70%] h-full gap-[10px] justify-center xl:justify-start items-center xl:items-start">
        <div class="flex flex-col h-full w-[70%] justify-center">
            <div class="flex flex-col gap-4 items-center xl:items-start">
                <h3 class = "text-4xl/8 sm:text-6xl md:text-7xl font-medium text-center xl:text-start">Can Numbers<br>Change a Nation?</h3>
                <p class = "text-sm w-[65%] max-[700px]:w-full max-[700px]:justify-center max-[700px]:items-center">Dive into data science projects that expose the truths, trends, and turning points in the Philippines’ path to sustainable development.</p>
                <p class = "text-sm w-[65%] max-[700px]:w-full max-[700px]:justify-center max-[700px]:items-center">Scroll to explore how data science is shaping the future of the Philippines.</p>
                <div class="buttons flex flex-row gap-[20px] mt-[5px] max-[700px]:flex-col max-[700px]:justify-center max-[700px]:items-center uppercase bg-black">
                    {#each homeButton as btn}
                        <button class = {`home-btn relative flex flex-row items-center justify-center ${btn.width} border border-white 
                        overflow-hidden rounded-none font-mono px-2 py-[10px] text-[15px] `} 
                        type="button" onclick={() => scrollToSection(btn.id)}>
                            <div class="original absolute flex justify-center items-center gap-[10px] inset-0 ">{btn.content} <i class="fa-solid fa-arrow-right-long"></i></div>
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
        <div class="hidden home-pic h-full xl:block bg-black">
            <img src="misc/map-colored.svg" class="map h-full object-cover " alt="pic">
        </div>
    </div>
</div>
<div id="nutshell" class = "flex flex-col justify-center items-center w-full pt-[0px] lg:pt-[55px] text-white gap-[50px]">
    <div class="flex flex-col items-center w-full pt-[10dvh] sm:pt-[13dvh] md:pt-[17dvh] lg:pt-[19dvh] sm:pb-[1dvh] md:pb-[5dvh] lg:pb-[10dvh] mb-[10%] xl:mb-0">
        <div class="flex flex-col w-[87%] sm:w-[83%] md:w-[76%] lg:w-[70%]">
            <div class="flex flex-col w-full gap-[20px] xl:flex-row mb-4 md:mb-8 xl:mb-24">
                <div class="mb-6 xl:hidden w-full flex flex-col items-center">
                    <h3 class="text-sm md:text-base break-words font-mono mb-3">PILIPINUTS 2024</h3>
                    <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
                </div>
                <div class="w-full text-center xl:text-left">
                    <h3 class="text-4xl md:text-5xl font-medium xl:hidden">
                        Where Data Meets the Philippines' Most Urgent Questions
                    </h3>

                    <h3 class="text-5xl font-medium hidden xl:block">
                        Where Data Meets <br> the Philippines' <br> Most Urgent <br> 
                        Questions
                    </h3>
                </div>
                
                <div class="flex flex-col items-center xl:items-start ">
                    <div class="mb-6 hidden xl:block">
                        <h3 class="break-words font-mono mb-3">PILIPINUTS 2024</h3>
                        <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
                    </div>
                    <p class = "text-sm mb-3">PilipiNuts 2024 is the culminating showcase of CS 132: Introduction to Data Science at UP Diliman, guided by Asst. Prof. Paul Regonia. This year brings powerful student-led projects that harness data science to investigate and address the Philippines’ most pressing social, economic, and environmental challenges.</p>
                    <p class = "text-sm mb-3">From climate resilience to education equity, from poverty trends to public health — <span class="font-mono">PilipiNuts 2024</span> transforms raw data into meaningful insights and action-driven narratives rooted in the United Nations Sustainable Development Goals (SDGs).</p>
                    <p class="text-sm mb-3">
                        Named as a portmanteau of <span class="font-mono">Pilipinas in a Nutshell</span>, PilipiNuts serves as a concise, data-driven visualization of the Philippines — a snapshot of the nation's most urgent issues in 2024, told through the lens of student-led data science projects.
                    </p>
                </div>
            </div>
            <div id = "iconList" class="w-full flex flex-wrap justify-center xl:justify-between pb-[2dvh] gap-1"></div>
        </div>
        <!-- <div class="flex-grow"></div> -->
        <img src="/misc/accent-lg.svg" class="mt-12 w-full" alt="Accent">
    </div>
    <div class="flex justify-center items-center w-full lg:h-[calc(100dvh-60px)] mb-[30%] xl:mb-0">
        <div class="w-[87%] sm:w-[83%] md:w-[76%] lg:w-[70%] flex flex-col lg:flex-row gap-8 pt-[1dvh]">
            <div class="mb-6 lg:hidden w-full flex flex-col items-center">
                <h3 class="text-sm md:text-base break-words font-mono mb-3">WHY PILIPINUTS?</h3>
                <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
            </div>
            <div class="nutshell-c-child flex w-full xl:w-1/2 aspect-square items-center justify-center">
                <div class="nutshell-pic w-full h-[100%] relative ">
                    <div class="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-[10px] ">
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-blue active:bg-blue">
                        </div>
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-red active:bg-red">
                        </div>
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-pink active:bg-pink">
                        </div>
                        <div class="nutshell-change bg-gray-400/50 transition duration-200 ease-in-out hover:bg-yellow active:bg-yellow">
                        </div>
                    </div>
                    <div class="absolute inset-0 z-10 bg-[url('/misc/map.svg')] bg-no-repeat xl:bg-size-[100%] bg-size-[60%] bg-position-[50%_20%] pointer-events-none"></div>
                    <div class=" absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 gap-[10px] text-white pointer-events-none">
                        <div class="nutshell-hover  flex flex-col justify-start bg-transparent p-[10px] sm:p-[15px] md:p-[20px] lg:p-[25px] text-xl sm:text-2xl md:text-3xl aspect-square ">
                            <span>18</span>
                            <span>Projects</span>
                        </div>
                        <div class="nutshell-hover flex flex-col items-end p-[10px] sm:p-[15px] md:p-[20px] lg:p-[25px] text-xl sm:text-2xl md:text-3xl aspect-square">
                            <span>15</span>
                            <span>Global</span>
                            <span>Goals</span>
                        </div>
                        <div class="nutshell-hover flex flex-col justify-end bg-transparent p-[10px] sm:p-[15px] md:p-[20px] lg:p-[25px] text-xl sm:text-2xl md:text-3xl aspect-square">
                            <span>1</span>
                            <span>Country</span>
                        </div>
                        <div class="nutshell-hover z-10 flex flex-col justify-end items-end bg-transparent p-[10px] sm:p-[15px] md:p-[20px] lg:p-[25px] text-xl sm:text-2xl md:text-3xl aspect-square">
                            <span>All In</span>
                            <span>A Nutshell</span>
                        </div>
                    </div>
                    <!-- <div class="absolute inset-0 z-10 bg-[url('/misc/map.svg')] bg-no-repeat bg-size-[100%] bg-position-[50%_20%] max-[1200px]:bg-size-[60%]"></div> -->
                </div>
            </div>
            <div class="nutshell-content flex flex-row w-full h-1/2 xl:flex-col xl:w-[60%]">
                <div class="nutshell-container w-[100%] h-full flex flex-col border-b border-amber-50 gap-10">
                    <div class="flex flex-col w-full gap-[10px] h-[80%] xl:h-auto">
                        <span class="hidden lg:block"><h3 class="font-mono">WHY PILIPINUTS?</h3></span>
                        <img src="/misc/accent-sm.svg" class="hidden lg:block w-[150px]" alt="Accent">
                        <p class = "text-sm mt-[10px]">
                            Each project in PilipiNuts 2024 draws inspiration from the United Nations Sustainable Development Goals (SDGs) — a global framework for ending poverty, protecting the planet, and ensuring peace and prosperity for all.
                        </p>
                        <p class = "text-sm mt-[10px]">
                            Grounded in the realities of the Philippine context, these data science projects tackle urgent challenges such as climate change, gender inequality, and poverty. More than just academic work, they represent informed, data-driven contributions to shaping a more just, resilient, and sustainable future.
                        </p>
                    </div>
                    <div class="flex flex-col w-full pb-[12px]">
                        <div class="text-container flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-0 xl:gap-[10px] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">
                            <span class="typing-text"><span class="cursor font-medium">This is the story of the</span></span>
                            <span class="typing-text ml-1 lg:ml-0"><span class="cursor font-medium">Philippines, told</span></span>
                            <div class="flex ml-1 w-full flex-wrap gap-[10px] lg:flex-nowrap lg:flex-col">
                                <span class="typing-text"><span class="cursor font-medium">through data —</span></span>
                                <span class="typing-text"><span class="cursor font-medium">one SDG at a time.</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="projects" class = "flex flex-col items-center w-full lg:px-[50px] text-white">
    <div class="flex justify-center items-center w-full h-[calc(100dvh)] pb-[135px]">
        <div id="projectIntro" class="relative flex flex-col justify-center items-center text-center w-[87%] sm:w-[83%] md:w-[76%] lg:w-[70%] h-full mb-[50%] xl:mb-0">
            <div class="flex flex-col justify-center items-center w-[100%] gap-[20px]">
                <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
                <p class="text-sm lg:text-base font-mono">WHEN POWERED BY PURPOSE,<br>DATA SCIENCE DOESN’T JUST REVEAL THE TRUTH —</p>
                <div class="w-full max-w-[800px] font-medium">
                    <span class="text-3xl sm:text-5xl">It sparks 
                        <span class = "underline decoration-red-500">action</span>, drives 
                        <span class = "underline decoration-yellow-500">change</span>, and helps build a 
                        <span class = "underline decoration-pink-500">better future</span>
                        <span class = "underline decoration-blue-500">for all.</span>
                    </span>
                </div>
            </div>
            <div class = "absolute bottom-10 sm:bottom-0 flex flex-col items-center gap-[10px]">
                <p class="text-sm lg:text-base font-mono">PROCEED TO THE PROJECTS</p>
                <span class="proceed nrk--arrow-down size-6"></span>
            </div>  
        </div>
    </div>
    <div id="startProject" class="w-[90%] sm:w-[80%] md:[70%] pt-[75px]">
        <div class = "flex flex-col mb-4 items-center lg:items-start">
            <h1 class="text-3xl md:text-5xl break-words font-medium mb-3">Our Projects</h1>
            <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
        </div>
        <p class="text-sm flex w-full my-[20px] mb-12 text-justify lg:text-start">
            Explore a collection of data-driven stories that decode real-world issues through the lens of student insight. From climate to health, every project here transforms raw numbers into meaningful narratives—interactive, insightful, and built to spark impact.
        </p>
        <div class="flex flex-col w-full h-full gap-[75px]">
            <div class="flex flex-col gap-[30px]">
                <div class="flex justify-between w-full">
                    <h3 class="text-sm lg:text-base font-mono hidden lg:block">FEATURED WORKS</h3>
                    <div class="flex gap-[30px] text-xl w-full lg:w-auto justify-between lg:justify-start">
                        <button id="prev" class="styleButton flex justify-center items-center px-[10px] py-[5px]" type="button" aria-label="Previous">
                            <span class="button-content"><span class="nrk--arrow-left size-5 lg:size-7"></span></span>
                        </button>
                        <h4 class="text-sm lg:text-base font-mono block lg:hidden">FEATURED WORKS</h4>
                        <button id="next" class="styleButton flex justwify-center items-center px-[10px] py-[5px]" type="button" aria-label="Next">
                            <span class="button-content"><span class="nrk--arrow-right size-5 lg:size-7"></span></span>
                        </button>
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 w-[150px] h-full bg-gradient-to-l from-transparent to-[#080808] pointer-events-none z-10"></div>
                    <div class="absolute inset-y-0 right-0 w-[150px] h-full bg-gradient-to-r from-transparent to-[#080808] pointer-events-none z-10"></div>
                    <div id="featuredProjects" class="text-lg/2 font-medium feature grid grid-flow-col h-full place-items-center border-y border-amber-50 overflow-hidden">
                        <!-- Features Project List -->
                    </div>
                </div>
            </div>

	    <!-- Added HTML for Interactive Charts -->
        <div class="hover-buttons">
            <h3 class="text-sm lg:text-base font-mono">INTERACTIVE CHARTS</h3>
            <button id="btn1" class="material-icons">arrow_back_ios</button>
            <button id="btn2" class="material-icons">arrow_forward_ios</button></div>
	    <div class="i-chart-segment">
            <iframe src="/ms-3.html"></iframe>
	        <iframe src="/ms-1.html"></iframe>
	        <iframe src="/ms-2.html"></iframe>
	    	<iframe src="/ms-4.html"></iframe>
	    	<iframe src="/ms-5.html"></iframe>
	    </div>

            <div id="sdgProjects" class="scroll-mt-20 flex flex-col flex-grow w-full gap-[20px] mt-8">
                <h3 class="text-sm lg:text-base font-mono">ALL PROJECTS BY SDG</h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-9 gap-x-4 m-auto">
                    <!-- NOTE: projectList function -->
                    <!-- sdgs -> JSON File -->
                    {#each sdg_entries as [number, sdg]}
                        <a href="/sdg-{number}">
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div
                                id="sdg-{number}"
                                class="sdg-item flex flex-row w-full items-center gap-4 py-[7px] border-b border-t border-amber-50"
                                onmouseenter={()=>changeSDGBGColor(sdg.color, number)}
                                onmouseleave={()=>changeSDGBGColor("", number)}
                            >
                                <div class="min-w-[50px] max-w-[50px]">
                                    <img src={sdg.image} alt="{sdg.title}" class="sdg-img p-2 w-full h-[50px] object-contain {sdg.color}"/>
                                </div>
                                <div class="flex flex-col h-[100%] justify-center truncate">
                                    <h3 class="font-semibold text-sm sm:text-lg">{sdg.title}</h3>
                                    <p class="truncate font-mono font-light text-xs">{sdg.description}</p>
                                </div>
                            </div>
                        </a>
                    {/each}
                    <!-- <div id="col-1" class="flex flex-col border-t border-white">
                        {#each { length: 9 }, rank}
                            {@render sdg_item(rank + 1)}
                        {/each}
                    </div>
                    <div id="col-2" class="flex flex-col border-t border-white">
                        {#each { length: 8 }, rank}
                            {@render sdg_item(rank + 10)}
                        {/each}
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>
<div id="inquiries" class = "flex flex-col w-full justify-center min-h-[60dvh] px-[50px] text-white">
    <div class="flex flex-col mt-[75px] justify-center items-center gap-[15px]">
        <img src="/misc/accent-sm.svg" class="w-[150px]" alt="Accent">
        <h3 class="text-sm lg:text-base font-mono">GOT QUESTIONS?</h3>
        <div class="flex flex-col flex-grow gap border-y mt-[10px] w-[280px] text-white cursor-pointer">
            <a href="https://forms.gle/NpJN26zYiJUeqJuQ9" target="_blank" class="pointer-events-auto">
                <button type = "button" class = "pointer-events-auto inquiry-btn flex justify-between items-center w-full px-[2px] py-[15px] border-b ">
                    <p class='text-xl'>Google Form</p>    
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
            </a>
            <a href="/bts" class="">
                <button type = "button" class = "pointer-events-auto inquiry-btn flex justify-between items-center w-full px-[2px] py-[10px]">
                    <p class='text-xl'>Dev Team</p>    
                    <i class="fa-solid fa-code"></i>
                </button>
            </a>
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

    .circle {
        animation: floatAround linear infinite;
        transition: transform 0.3s ease;
    }

    @keyframes floatAround {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(var(--x), var(--y));
		}
		100% {
			transform: translate(0, 0);
		}
    }
    
    #nutshell .nutshell-container h3{
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
        cursor: pointer;
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
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out, transform 0.5s ease-in-out;
        perspective: 1000px;
    }

    :global(.rotating) {
        transition: transform 0.3s ease-in-out;
        transform-style: preserve-3d; 
    }

    :global(.featured:hover) {
        cursor: pointer;
    }

    :global(.featured:hover .rotating) {
        transform: rotateX(5deg) scale(0.98);
        transform-origin: center; 
    }

    :global(.projectImage) {
        filter: brightness(0.5);
        transition: filter 0.5s ease-in-out;
    }

    :global(.featured:hover .projectImage) {
        filter: brightness(1.1);
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
    /* Added Styles for interactive charts */
   .i-chart-segment {
    width: auto;
    height: max-content;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    zoom: 0.70;
   }

   @media (max-width: 868px) {
	.i-chart-segment{
		zoom: 0.5;
	}
   }

  .i-chart-segment iframe {
    flex: 0 0 auto;
    width: 100%;
    height: 700px;
    overflow: none;
    border: 1px solid black;
  }

  .hover-buttons{
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: -60px;
  }
  .hover-buttons h3{
    flex: 2;
  }
  .hover-buttons button{
    font-size: small;
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
