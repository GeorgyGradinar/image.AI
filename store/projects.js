import {defineStore} from "pinia";

export const projectStore = defineStore('project', () => {
    let projects = ref([
        {
            id: '-efrefwf5wf',
            name: 'test',
            date: '12.03.2022',
        },
        {
            id: '-sdgvrghnyu5542',
            name: 'test1',
            date: '12.10.2022',
        },
        {
            id: '-qqqweert998874',
            name: 'test2',
            date: '03.03.2022',
        },
        {
            id: '-56cds48787',
            name: 'test3',
            date: '06.07.2022',
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
