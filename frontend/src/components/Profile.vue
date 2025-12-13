<script setup>
  const id = localStorage.getItem('id');
</script>

<template>
  <div class="cursor-pointer">
    <router-link v-if="id" :to="'/user/' + id">
      <img src="../assets/default_profile_photo.png" alt="ProfilePicture">
    </router-link>
  </div>
</template>

<style scoped>
  img {
    width: 35px;
    height: 35px;
  }
</style>