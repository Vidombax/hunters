<script setup>
  import { ref, onMounted } from 'vue'

  import Profile from '@/components/Profile.vue'
  import Search from '@/components/Search.vue'


  let id = localStorage.getItem('id');
</script>

<template>
  <header class="p-4">
    <div class="name">
      <router-link to="/" v-if="id">
        <p class="text-4xl">Hunters</p>
      </router-link>
      <p class="text-4xl" v-else>Hunters</p>
    </div>
    <div class="actions" v-if="id">
      <Search />
      <Profile />
    </div>
  </header>
</template>

<style scoped>
  header {
    display: grid;
    width: 100%;
    box-sizing: border-box;
    background-color: #1A1A1A;
    grid-template-columns: 1.2fr 1fr;
    justify-items: end;
  }
  .name {
    display: flex;
    justify-items: end;
  }
  .name p {
    color: #B71C1C;
    font-family: "Cinzel", serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
  .actions {
    display: grid;
    gap: 24px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    .actions {
      gap: 6px;
    }
  }
</style>
