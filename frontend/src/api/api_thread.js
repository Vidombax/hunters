import axios from 'axios'

async function createThread(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.post(`/api/thread`, data, config)).data;
}
async function getThread(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.get(`/api/thread/${data.id}`, config)).data;
}
async function getThreads(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.get(`/api/threads`, config)).data;
}
async function updateThread(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.put(`/api/thread`, data, config)).data;
}
async function setVisibilityThread(data) {
    const config = {
        headers: {
            Authorization: `${data.token}`
        }
    };

    return (await axios.put(`/api/visibility-thread`, data, config)).data;
}

export default {
    createThread,
    getThread,
    getThreads,
    updateThread,
    setVisibilityThread
}
