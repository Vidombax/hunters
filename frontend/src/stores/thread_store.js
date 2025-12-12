import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../api/api.js'

export const useThreadStore = defineStore('thread', () => {
    const thread = ref(null);
    const threads = ref(null);
    const message = ref('');
    const loading = ref(false);
    const error = ref(null);

    async function createThread(data) {
        loading.value = true;
        error.value = null;

        try {
            thread.value = await api.createThread(data);

            return thread;
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

            return thread;
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

            return message;
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

            return message;
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Ошибка обновление треда';
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
        setVisibilityThread
    }
})
