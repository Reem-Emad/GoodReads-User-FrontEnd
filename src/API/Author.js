import axois from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export const getAuthors = () => {
    return axois.get(`${BACKEND_URL}/api/authors`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => {

            return res.data;

        })

}

export const getAuthorById = (id) => {
    return axois.get(`${BACKEND_URL}/api/authors/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => {
            return res.data;
        })
}

