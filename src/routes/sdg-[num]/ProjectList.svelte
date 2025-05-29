<script lang="ts">

    let { 
        project_data,
    } = $props();

    import ProjectListItem from './ProjectListItem.svelte';

</script>

<div class="container mx-auto">
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
        />
    {/each}
</div>
