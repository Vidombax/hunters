<script setup>
  import { ref } from 'vue'

  import { sortsArray } from '@/services/constants.js'

  const props = ref(defineProps({
    treadTypes: Array,
  }));
</script>

<template>
  <div class="filters">
    <div class="carousel_of_types">

    </div>
    <div class="sorts">

    </div>
  </div>
</template>

<style scoped>
  .filters {
    display: grid;
  }
</style>
