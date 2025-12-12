<script setup>
  import Arrow from '@/components/svg/Arrow.vue'

  const props = defineProps({
    votes: Number
  })
</script>

<template>
  <div class="votes">
    <div class="up"><Arrow/></div>
    <div v-if="votes > 0" class="positive">{{ props.votes }}</div>
    <div v-else-if="votes === 0" class="passive">{{ props.votes }}</div>
    <div v-else class="negative">{{ props.votes }}</div>
    <div class="down"><Arrow /></div>
  </div>
</template>

<style scoped>
  .votes {
    display: flex;
    gap: 4px;
    align-items: center;
    background-color: gray;
    border-radius: 4px;
    padding: 4px;
  }
  .positive,
  .negative,
  .passive {
    padding: 0.2rem;
    border-radius: 4px;
  }
  .up {
    transform: rotate(180deg);
  }
</style>
