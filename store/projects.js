import {defineStore} from "pinia";
import {ref} from "vue";

export const projectStore = defineStore('project', () => {
    let projects = ref([
        {
            id: '2983',
            name: 'test proj',
            date: '20.03.2022'
        }
    ])

    function addNewProject(newProject) {
        projects.value = [newProject, ...projects.value];
    }

    function deleteProject(id) {
        let currentId = projects.value.findIndex(project => project.id = id);
        projects.value.splice(currentId, 1);
        projects.value = [...projects.value]
    }

    function updateParameters(payload) {
        const id = projects.value.findIndex(project => project.id === payload.id)
        projects.value[id] = {
            ...projects.value[id],
            name: payload.name
        }
        projects.value = [...projects.value]
    }

    return {projects, addNewProject, deleteProject, updateParameters}
})
