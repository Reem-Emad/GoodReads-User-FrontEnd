import axios from 'axios';

const BackEnd_URL = process.env.REACT_APP_BackEnd_URL || 'http://localhost:3000';

export const register = ({ name, email, password, image }) => {
    return axios.post(`${BackEnd_URL}/api/users/register`, { name, email, password, image }).then(res => res.data);
}
export const login = ({ email, password }) => {
    return axios.post(`${BackEnd_URL}/api/users/login`, { email, password }).then(res => res.data)
}
export const getProfile = () => {
    return axios.get(`${BackEnd_URL}/api/users/profile`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);

}
export const getAllBooks = () => {
    return axios.get(`${BackEnd_URL}/api/users/books/all`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}

export const getReadingBooks = () => {
    return axios.get(`${BackEnd_URL}/api/users/books/currentlyreading`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}

export const getWantBooks = () => {
    return axios.get(`${BackEnd_URL}/api/users/books/wanttoread`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}

export const getReadBooks = () => {
    return axios.get(`${BackEnd_URL}/api/users/books/read`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}
export const editBookRate = ({ bookId, rate }) => {

    return axios.post(`${BackEnd_URL}/api/users/book/edit/${bookId}`, { rate }, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}
export const editBookStatus = ({ bookId, status }) => {

    return axios.post(`${BackEnd_URL}/api/users/book/edit/${bookId}`, { status }, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}
export const addBook = ({ bookId, status }) => {
    return axios.post(`${BackEnd_URL}/api/users/book/add`, { bookId, status }, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then(res => res.data);
}