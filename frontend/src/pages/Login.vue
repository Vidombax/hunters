<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/user_store.js'

  const userStore = useUserStore();
  const isLoginModal = ref(true);
  const user = ref({
    name: '',
    password: ''
  });

  const handlerChooseModal = () => {
    isLoginModal.value = isLoginModal.value !== true;
    user.value.name = '';
    user.value.password = '';
  }

  const handleAuthorization = async () => {
    try {
      if (isLoginModal.value === true) {
        await userStore.login(user.value);
      }
      else {
        await userStore.register(user.value);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
</script>

<template>
  <div class="login" v-if="isLoginModal">
    <input type="text" placeholder="Логин" v-model="user.name" />
    <input type="password" placeholder="Пароль" v-model="user.password" />
    <button @click="handleAuthorization">Войти</button>
    <p class="choose_modal" @click="handlerChooseModal">Нету аккаунта</p>
  </div>
  <div class="registration" v-else>
    <input type="text" placeholder="Придумайте логин" v-model="user.name" />
    <input type="password" placeholder="Придумайте пароль" v-model="user.password" />
    <button style="width: 225px;" @click="handleAuthorization">Зарегистрироваться</button>
    <p class="choose_modal" @click="handlerChooseModal">Войти в существующий аккаунт</p>
  </div>
</template>

<style scoped>
  .login,
  .registration {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
  .login input,
  .registration input {
    width: 15%;
  }
  .choose_modal {
    color: gray;
    text-decoration: underline;
    cursor: pointer;
  }

  @media screen and (max-width: 1050px) {
    .login input,
    .registration input {
      width: 60%;
    }
  }
</style>
