<script setup>
  const props = defineProps({
    name: String,
  });
</script>

<template>
  <div class="cheap">
    <p>{{ name }}</p>
  </div>
</template>

<style scoped>
  .cheap {
    border-radius: 12px;
    background-color: #B71C1C;
    padding: 2px;
  }
  .cheap p {
    font-size: x-small;
    color: #FFFFF0;
  }
</style>
