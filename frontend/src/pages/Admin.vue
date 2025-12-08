<script setup>
  import { ref } from 'vue'

  import PanelBlock from '@/components/admin/PanelBlock.vue'

  const isLogin = ref(false);
</script>

<template>
  <div class="adminPanel" v-if="isLogin">
    <div class="aside_panel">
      <PanelBlock />
      <div>Выход</div>
    </div>
    <div class="info">

    </div>
  </div>
  <div class="login" v-else>
    <input type="text" placeholder="Логин">
    <input type="password" placeholder="Пароль">
    <button>Войти</button>
  </div>
</template>

<style scoped>
  .aside_panel {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
  }
</style>
