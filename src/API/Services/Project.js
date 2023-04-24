import axios from '../axios';

const ProjectAPI = {
    GetAllProject: () => {
        return axios.get(`/projects`);
    },
    CreateProject: (data) => {
        return axios.post(`/projects`, data);
    },
    GetProjectByID: (id) => {
        return axios.get(`/projects/${id}`);
    },
    UpdateProjectByID: (id, data) => {
        return axios.put(`/projects/${id}`, data);
    },
    DeleteProjectByID: (id) => {
        return axios.delete(`/projects/${id}`);
    },
    GetProjectPersonnelByID: (id) => {
        return axios.get(`/projects/${id}/personnels`);
    },
    AddProjectPersonnelByID: (id, data) => {
        return axios.post(`/projects/${id}/personnels`, data);
    }
}

export default ProjectAPI;