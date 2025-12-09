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

export default {
    loginUser,
    registrationUser,
}
