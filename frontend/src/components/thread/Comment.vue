<script setup>
  import { ref } from 'vue'

  import Votes from '@/components/Votes.vue'

  const props = defineProps({
    idUser: Number,
    nameUser: String,
    comment: String,
    votes: Number
  })
</script>

<template>
  <div class="comment">
    <div class="user">
      <p>{{ props.nameUser }}</p>
    </div>
    <div class="text">
      <p>{{ props.comment }}</p>
    </div>
    <div class="actions">
      <Votes />
    </div>
  </div>
</template>

<style scoped>

</style>
