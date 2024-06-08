import axios from 'axios';

const API_URL = 'http://localhost:3000/api/uac';

//Login
export const login = () => {
    return axios.get(`${API_URL}/google`);
};
