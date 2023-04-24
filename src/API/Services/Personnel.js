import axios from '../axios';

const PersonnelAPI = {
    GetAllPersonnels: () => {
        return axios.get(`/personnels`);
    },
    GetPersonnelByID: (id) => {
        return axios.get(`/personnels/${id}`);
    },
    UpdatePersonnelByID: (id, data) => {
        return axios.put(`/personnels/${id}`, data);
    }
}

export default PersonnelAPI;