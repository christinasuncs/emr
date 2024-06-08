import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

// Get all users
export const getAllUsers = () => {
    return axios.get(`${API_URL}/`);
};

// Get all patients
export const getPatients = () => {
    return axios.get(`${API_URL}/patients`);
};

// Add drug to user
export const addDrugToUser = (userId, drugData) => {
    return axios.put(`${API_URL}/${userId}/addDrug`, drugData);
};
