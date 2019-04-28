import axois from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export const getCategories = () => {
    return axois.get(`${BACKEND_URL}/api/categories`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => {
            return res.data;

        })
}

export const getCategoriesById = (id) => {
    return axois.get(`${BACKEND_URL}/api/categories/${id}`,
    
     { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => {
            return res.data;
        })
}

