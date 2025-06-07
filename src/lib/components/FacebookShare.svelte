<script lang="ts">
    let { 
        project_title,
        sdg_color
    } = $props();

    const encoded_url = $state(encodeURIComponent(project_title));

    import { base } from '$app/paths';
    import { page } from '$app/state';

</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
 <a 
    href="https://www.facebook.com/sharer/sharer.php?u=https://pilipinuts-2024.vercel.app{base}{page.url.pathname}/#{encodeURIComponent(encoded_url)}"
    target="_blank"
    class="flex items-center justify-between w-1/2 {sdg_color}  hover:opacity-[0.5] text-black font-medium py-2 px-4 transition duration-150">
    Share to
    <span class="icon-[uiw--facebook] text-[24px]"></span>
</a>
<!-- <a 
    class="text-inherit font-medium px-4 rounded inline-block transition duration-150"
    href="https://www.facebook.com/sharer/sharer.php?u={base}{page.url.pathname}/#{encodeURIComponent(encoded_url)}"
    target="_blank"
>
    <span class="icon-[uiw--facebook] text-[36px]"></span>
</a> -->