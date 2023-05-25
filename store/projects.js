import {defineStore} from "pinia";

export const projectStore = defineStore('project', () => {
    let projects = ref([
        {
            id: '-efrefwf5wf',
            name: 'test',
            data: '12.03.2022',
        },
        {
            id: '-sdgvrghnyu5542',
            name: 'test1',
            data: '12.10.2022',
        },
        {
            id: '-qqqweert998874',
            name: 'test2',
            data: '03.03.2022',
        },
        {
            id: '-56cds48787',
            name: 'test3',
            data: '06.07.2022',
        }
    ])

    return {projects}
})
