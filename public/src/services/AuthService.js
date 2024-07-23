import axios from 'axios';

const API_URL = 'https://electronic-medical-record-uqm3.onrender.com/api/uac';

//Login
export const login = () => {
    return axios.get(`${API_URL}/google`);
};
