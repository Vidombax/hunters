<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const id_user = ref(localStorage.getItem('id'));
  const route = useRoute();
  const id = ref(route.params.id);
  const user = ref({});

  onMounted(async () => {

  });
</script>

<template>
  <div class="user">
    <div class="info">
      <img src="../assets/default_profile_photo.png" alt="Logo">
      <p class="text-2xl"></p>
    </div>
    <div class="classified_tags">

    </div>
    <div class="invite" v-if="id_user !== id">
      <button>Инвайт на переписку</button>
    </div>
    <div class="exit" v-else>
      <button>Выйти из аккаунта</button>
    </div>
  </div>
</template>

<style scoped>
  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #1A1A1A;
    border-radius: 12px;
    width: 50%;
    height: auto;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .info img {
    width: 50px;
    height: 50px;
  }
</style>