<script lang="ts">

    let { 
        project_data = $bindable(),
        sdg_num = $bindable()
    } = $props();

    import ProjectListItem from './ProjectListItem.svelte';

</script>

<div class="container mx-auto">
    <div class="flex flex-col items-center">
        {#each project_data as project}
            <ProjectListItem
                group={project.group}
                name={project.name}
                title={project.title}
                desc={project.desc}
                authors={project.authors}
                plot={project.plot}
                website={project.website}
                class_type={project.class}
                related_sdg={project.related_sdg}
                sdg_num={sdg_num}
            />
        {/each}
    </div>
</div>
