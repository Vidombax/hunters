<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/stores/user_store.js'

  const id_user = ref(localStorage.getItem('id'));
  const route = useRoute();
  const id = ref(route.params.id);
  const user = ref({});
  const tags = ref([]);
  const data = ref(null);
  const userStore = useUserStore();

  onMounted(async () => {
    let data = {
      id: id.value,
      token: localStorage.getItem('token')
    }
    data.value = await userStore.getUser(data);

    user.value = data.value.user;
    tags.value = data.value.tags;
  });
</script>

<template>
  <div class="user">
    <div class="info">
      <img src="../assets/default_profile_photo.png" alt="Logo">
      <p class="text-2xl">{{ user.name }}</p>
    </div>
    <div class="classified_tags" v-if="tags.length > 0">
      <p class="text-xl">Интересуемые темы</p>
      <div class="tags">
        <button v-for="item in tags" :key="item.id">{{ item.name }}</button>
      </div>
    </div>
    <div class="invite" v-if="id_user !== id">
      <button>Инвайт на переписку</button>
    </div>
    <div class="exit" v-else>
      <button @click="userStore.logout()">Выйти из аккаунта</button>
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
    height: auto;
    padding: 1rem;
    gap: 24px;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .classified_tags {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
  .tags {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 400px;
    padding: 0.5rem;
  }
  .exit {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .exit button,
  .invite button {
    width: 200px;
  }
  .info img {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 768px) {
    .tags {
      width: 250px;
    }
  }
</style>