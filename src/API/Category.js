import axois from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export const getCategories = () => {
    return axois.get(`${BACKEND_URL}/api/categories`, {
    })
        .then(res => {
            return res.data;

        })
}

export const getCategoriesById = (id) => {
    return axois.get(`${BACKEND_URL}/api/categories/${id}`, {
    })
        .then(res => {
            return res.data;
        })
}

