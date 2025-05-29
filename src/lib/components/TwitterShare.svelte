<script lang="ts">
    let { 
        project_title
    } = $props();

    const encoded_url = encodeURIComponent(project_title);
    const tweet_text = encodeURIComponent("Lets get this started.")

    import { base } from '$app/paths';
    import { page } from '$app/state';
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<a
    class="text-pink-500 hover:text-pink-600 font-medium px-4 rounded inline-block transition duration-150"
    href="https://twitter.com/intent/post?text={tweet_text}&url=https://www.wallahi.com{page.url.pathname}/#{encodeURIComponent(encoded_url)}"
    target="_blank"
>
    <span class="icon-[line-md--twitter-x] text-[36px]"></span>
</a>