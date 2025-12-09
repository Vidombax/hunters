import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../api/api.js'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      user.value = await api.loginUser(credentials.name, credentials.password);

      localStorage.setItem('id', user.value.id);
      localStorage.setItem('token', user.value.token);

      return user
    }
    catch (err) {
      error.value = err.response?.data?.message || 'Ошибка авторизации'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null
    try {
      user.value = await api.registrationUser(userData)

      localStorage.setItem('id', user.value.id);
      localStorage.setItem('token', user.value.token);

      return user
    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка регистрации'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  }
})
