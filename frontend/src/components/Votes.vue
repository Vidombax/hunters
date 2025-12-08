<script setup>
  const props = defineProps({
    votes: Number
  })
</script>

<template>
  <div class="votes">
    <div></div>
    <div>{{ props.votes }}</div>
    <div></div>
  </div>
</template>

<style scoped>

</style>
