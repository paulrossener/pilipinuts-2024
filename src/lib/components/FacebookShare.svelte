<script lang="ts">
    let { 
        project_title
    } = $props();

    const encoded_url = encodeURIComponent(project_title);

    import { base } from '$app/paths';
    import { page } from '$app/state';

</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<a 
    class="text-inherit font-medium px-4 rounded inline-block transition duration-150"
    href="https://www.facebook.com/sharer/sharer.php?u={base}{page.url.pathname}/#{encodeURIComponent(encoded_url)}"
    target="_blank"
>
    <span class="icon-[uiw--facebook] text-[36px]"></span>
</a>