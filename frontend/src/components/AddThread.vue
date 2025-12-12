<script setup>

</script>

<template>
  <router-link to="/make-thread">
    <p class="info">Добавить тред</p>
    <div class="add_button">
      <p>+</p>
    </div>
  </router-link>
</template>

<style scoped>
  a {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    gap: 8px;
  }
  .add_button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #B71C1C;
    color: #FFFFF0;
    border-radius: 24px;
    padding: 12px;
    width: 75px;
  }
  .info {
    display: flex;
    justify-content: center;
    border-radius: 8px;
    opacity: 0;
    transition: .1s linear;
    width: 130px;
    align-items: center;
    color: #888888;
    background-color: #1A1A1A;
    padding: 4px;
  }
  a:hover .info {
    opacity: 1;
  }
  .add_button p {
    font-size: x-large;
  }
</style>
