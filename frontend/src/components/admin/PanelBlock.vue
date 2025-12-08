<script setup>
  import { ref } from 'vue'

  const props = ref(defineProps({
    idPanel: Number,
    panelName: String
  }));
</script>

<template>
  <div class="block">
    <p>{{ props.panelName }}</p>
  </div>
</template>

<style scoped>

</style>
