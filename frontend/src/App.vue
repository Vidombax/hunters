<script setup>
  import Header from '@/components/Header.vue'
</script>

<template>
  <div class="main">
    <Header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
  .main {
    background-color: #0D0D0D;
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
    width: 100%;
  }

  main {
    background-color: #0D0D0D;
    padding: 2rem;
  }
</style>
