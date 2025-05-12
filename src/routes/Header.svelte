<script>

    let num = [
        {num: "2", color: "bg-yellow-500"},
        {num: "0", color: "bg-red-500"},
        {num: "2", color: "bg-blue-500"},
        {num: "4", color: "bg-pink-500"}
    ]

    let titleAnimation = false;

    function triggerAnimation() {
        if (titleAnimation) return;

        titleAnimation = true;
        setTimeout(() => {
            titleAnimation = false;
        }, 1500 + num.length * 100);
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
                        class={`num-buttons inline-flex flex-row ${n.color} p-[5px] ${titleAnimation ? 'spin' : ''}`}
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

<style>
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