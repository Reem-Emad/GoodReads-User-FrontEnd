import axois from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export const getBooks = () => {
    return axois.get(`${BACKEND_URL}/api/books`, {
    })
        .then(res => {
            // console.log(res.data);
            return res.data;

        })
}

export const getBooksById = (id) => {
    return axois.get(`${BACKEND_URL}/api/books/${id}`, {
    })
        .then(res => {
            return res.data;
        })
}

