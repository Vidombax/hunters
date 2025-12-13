import axios from 'axios'

async function loginUser(name, password) {
    return (await axios.post(`/api/login`, {
        name: name,
        password: password
    })).data;
}
async function registrationUser(data) {
    return (await axios.post(`/api/register`, {
        name: data.name,
        password: data.password
    })).data;
}
async function createComment(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.post(`/api/create-comment`, data, config)).data;
}
async function rateThread(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.post(`/api/rate-tread`, data, config)).data;
}

async function rateComment(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.post(`/api/rate-comment`, data, config)).data;
}

export default {
    loginUser,
    registrationUser,
    createComment,
    rateThread,
    rateComment
}
