import axios from 'axios';

const BackEnd_URL = process.env.REACT_APP_BackEnd_URL || 'http://localhost:3000';

export const register = ({ name, email, password, image }) => {
    return axios.post(`${BackEnd_URL}/api/users/register`, { name, email, password, image }).then(res => res.data);
}
export const login = ({ email, password }) => {
    return axios.post(`${BackEnd_URL}/api/users/login`, { email, password }).then(res => res.data)
}