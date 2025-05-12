<script lang="ts">
	let { 
        group, 
        name, 
        title, 
        desc, 
        authors, 
        plot, 
        website, 
        class_type 
    } = $props();
    
</script>

<div class="grid grid-cols-[80%_20%] border-collapse mb-20">
    <!-- First Column -->
    <div class="p-6 border-2 border-gray-500">
        <h1 class="mb-4">{title}</h1>
        {#await import(`$lib/assets/plots/${plot}.png`) then { default: src }}
        <img {src} class="mb-4 h-auto w-auto" alt="Profile">
        {/await}
        <p>{desc}</p>
    </div>

    <!-- Second Column -->
    <!-- Flex is needed for a good reason.  -->
    <div class="p-6 border-2 border-gray-500 flex flex-col">

        <!-- Button Group -->
        <div class="mb-10">
            <div class="uppercase text-gray-400 text-xs tracking-widest mb-4">
                LEARN MORE
            </div>
            <div class="space-y-3 mb-4">
                <a href="{website}" class="flex items-center justify-between w-full bg-pink-500 hover:bg-pink-600 text-black font-medium py-2 px-4 rounded">
                    Portfolio
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>

                </a>
                <a href="share" class="flex items-center justify-between w-full bg-pink-500 hover:bg-pink-600 text-black font-medium py-2 px-4 rounded">
                    Share
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>

                </a>
            </div>
        </div>
        
        <!-- Group Description -->
        <div class="mb-10">
            <div class="uppercase text-gray-400 text-xs tracking-widest mb-2">
                Group {group}
            </div>
            <p class="text-xl mb-1">{name}</p>
            {#each authors as author}
                <p class="text-sm">{author}</p>
            {/each}
        </div>
        
        <!-- Class Description -->
        <div class="uppercase text-gray-400 text-xs tracking-widest mb-2">
            Class
        </div>
        <p>{class_type}</p>

        <!-- Craziest hack to push to bottom. -->
        <!-- Why flex is needed. -->
        <div class="flex-grow"></div>

        <!-- Thoughts? -->
        <div class="grid grid-cols-2">
            <div class="uppercase text-gray-400 text-xs tracking-widest py-2">
                THOUGHTS?
            </div>
            <div class="flex items-center justify-start space-x-4">
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </a>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    
                </a>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>

                </a>
            </div>
        </div>
    </div>
</div>




