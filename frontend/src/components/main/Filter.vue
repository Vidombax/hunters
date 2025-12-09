<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    id: Number,
    name: String,
  });
</script>

<template>
  <button>
    {{ props.name }}
  </button>
</template>

<style scoped>

</style>
