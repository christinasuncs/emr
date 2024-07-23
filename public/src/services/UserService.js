import axios from 'axios';

const API_URL = 'https://electronic-medical-record-uqm3.onrender.com/api/user';

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
