import axios from 'axios';

const BACKEND_URL =process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

export const getBooks = () => {
    return axios.get(`${BACKEND_URL}/api/books`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => {
            return res.data;

        })
}

export const getBooksById = (id) => {
    return axios.get(`${BACKEND_URL}/api/books/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => {
            return res.data;
        })
}

export const searchForBooks = (name) => {

    return axios.post(`${BACKEND_URL}/api/books/search`, { name }, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data)
}