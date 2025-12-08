<script setup>
  import { ref } from 'vue'

  const isLoginModal = ref(true);
</script>

<template>
  <div class="login" v-if="isLoginModal">
    <input type="text" placeholder="Логин">
    <input type="password" placeholder="Пароль">
    <button>Войти</button>
  </div>
  <div class="registration" v-else>
    <input type="text" placeholder="Придумайте логин">
    <input type="password" placeholder="Придумайте пароль">
    <button>Зарегистрироваться</button>
  </div>
</template>

<style scoped>
  .login,
  .registration {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
