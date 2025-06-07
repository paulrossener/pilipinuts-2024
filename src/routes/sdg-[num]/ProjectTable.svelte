<script lang="ts">
    interface ProjectData {
        group: string;
        name: string;
        title: string;
        desc: string;
        authors: string[];
        plot: string;
        website: string;
        class: string;
        related_sdg: Number[];
    }

    let { 
        project_data = $bindable(),
        sdg_num = $bindable()
    } = $props();

    let theModal = $state() as HTMLDivElement;
    let modalProjectData = $state(project_data[0]) as ProjectData;

    import ProjectTableItem from './ProjectTableItem.svelte';
    import ProjectListItem from './ProjectListItem.svelte';

    function showModal(project_data: ProjectData) {
        theModal.classList.remove('hidden')
        modalProjectData = project_data
        console.log(project_data)
    }

    function hideModal(){
        theModal.classList.add('hidden')
    }


</script>

<div class="container mx-auto">
    <table class="w-full text-left border-collapse">
        <thead class="border-b border-b-amber-50">
            <tr class="uppercase  text-xs mb-4 font-mono font-medium">
                <th class="py-4">Project by</th>
                <th class="py-4">Title</th>
                <th class="py-4 hidden md:table-cell">Related SDGs</th>
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
                    related_sdg={project.related_sdg}
                    view_item={()=>showModal(project)}
                />
            {/each}
        </tbody>
    </table>
</div>


<div bind:this={theModal}  tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-1000 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900/50">

    <!-- Catcher -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={hideModal} class="h-full w-full z-50 fixed"></div>

    <div class="max-w-7xl my-20 bg-black p-10 mx-auto z-51 relative border-1 border-white/30">
        <button onclick={hideModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="progress-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
        </button>
        <ProjectListItem
            group={modalProjectData.group}
            name={modalProjectData.name}
            title={modalProjectData.title}
            desc={modalProjectData.desc}
            authors={modalProjectData.authors}
            plot={modalProjectData.plot}
            website={modalProjectData.website}
            class_type={modalProjectData.class}
            related_sdg={modalProjectData.related_sdg}
            sdg_num={sdg_num}
        />
    </div>
</div>
    