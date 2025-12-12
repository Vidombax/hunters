import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../api/api.js'

export const useThreadStore = defineStore('thread', () => {
    const thread = ref(null);
    const threads = ref(null);
    const message = ref('');
    const tags = ref(null);
    const loading = ref(false);
    const error = ref(null);

    async function createThread(data) {
        loading.value = true;
        error.value = null;

        try {
            thread.value = await api.createThread(data);

            return thread.value;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка создания треда';
            throw err
        }
        finally {
            loading.value = false;
        }
    }

    async function getThread(data) {
        loading.value = true;
        error.value = null;

        try {
            thread.value = await api.getThread(data);

            return thread.value.data;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка вывода треда';
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    async function getThreads(data) {
        loading.value = true;
        error.value = null;

        try {
            threads.value = await api.getThreads(data);

            return threads.value.threads;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка вывода тредов';
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    async function updateThread(data) {
        loading.value = true;
        error.value = null;

        try {
            message.value = await api.updateThread(data).message;

            return message.value;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка обновление треда';
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    async function setVisibilityThread(data) {
        loading.value = true;
        error.value = null;

        try {
            message.value = await api.setVisibilityThread(data);

            return message.value;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка обновление треда';
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    async function getTags(data) {
        loading.value = true;
        error.value = null;

        try {
            tags.value = await api.getTags(data);

            return tags.value.tags;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка вывода тэгов';
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    return {
        thread,
        threads,
        message,
        loading,
        error,
        createThread,
        getThread,
        getThreads,
        updateThread,
        setVisibilityThread,
        getTags
    }
})
