<script lang="ts">
    let { 
        project_title,
        sdg_color
    } = $props();

    

    const encoded_url = $state(encodeURIComponent(project_title));
    const tweet_text = $state(encodeURIComponent(project_title));

    import { base } from '$app/paths';
    import { page } from '$app/state';

    let current_url = page.url.pathname;

    console.log(current_url)
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<a 
    href="https://twitter.com/intent/post?text={tweet_text}&url=https://pilipinuts-2024.vercel.app{base}{page.url.pathname}/#{encodeURIComponent(encoded_url)}"
    target="_blank"
    class="flex items-center justify-between w-1/2 {sdg_color}  hover:opacity-[0.5] text-black font-medium py-2 px-4 transition duration-150">
    Share to
    <span class="icon-[line-md--twitter-x] text-[24px]"></span>
</a>
<!-- <a
    class="font-medium px-4 rounded inline-block transition duration-150"
    href="https://twitter.com/intent/post?text={tweet_text}&url={base}{page.url.pathname}/#{encodeURIComponent(encoded_url)}"
    target="_blank"
>
</a> -->