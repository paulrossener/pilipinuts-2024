<script lang="ts">
    let { 
        project_data
    } = $props();

    import ProjectTableItem from './ProjectTableItem.svelte';
</script>

<div class="container mx-auto">
    <table class="w-full text-left border-collapse">
        <thead class="border-b border-b-amber-50">
            <tr class="uppercase text-gray-400 text-xs tracking-widest mb-4 font-robotomono">
                <th class="py-4">Project by</th>
                <th class="py-4">Title</th>
                <th class="py-4">Related SDGs</th>
                <th class="py-4"></th>
            </tr>
        </thead>
        <tbody>
            {#each project_data as project}
                <ProjectTableItem
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
        </tbody>
    </table>
</div>