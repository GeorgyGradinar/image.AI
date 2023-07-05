export default function requestsProjects() {
    function getAllProjects() {
        let projects = process.client && localStorage.getItem('projects');
        console.log(JSON.parse(projects))
    }

    function saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    return {getAllProjects, saveProjects}
}
