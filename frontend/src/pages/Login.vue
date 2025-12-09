<script setup>
  import { ref } from 'vue'

  const isLoginModal = ref(true);

  const handlerChooseModal = () => {
    isLoginModal.value = isLoginModal.value !== true;
  }
</script>

<template>
  <div class="login" v-if="isLoginModal">
    <input type="text" placeholder="Логин" />
    <input type="password" placeholder="Пароль" />
    <button>Войти</button>
    <p class="choose_modal" @click="handlerChooseModal">Нету аккаунта</p>
  </div>
  <div class="registration" v-else>
    <input type="text" placeholder="Придумайте логин" />
    <input type="password" placeholder="Придумайте пароль" />
    <button style="width: 225px;">Зарегистрироваться</button>
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
