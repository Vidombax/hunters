<script setup>
  import { ref } from 'vue'
  import Arrow from '@/components/svg/Arrow.vue'
  import { useUserStore } from '@/stores/user_store.js'

  const props = defineProps({
    votes: Number
  });
  const votes = ref(props.votes);
  const userStore = useUserStore();

  const voteHandler = async (typeVote, voteFunc) => {
    try {
      switch (voteFunc) {
        case "thread":
          if (typeVote === true) {
            votes.value += 1;
          }
          else {
            votes.value -= 1;
          }
          break;
        case "comment":
          if (typeVote === true) {

          }
          else {

          }
      }
    }
    catch (e) {
      console.error(e);
    }
  }
</script>

<template>
  <div class="votes">
    <div class="up"><Arrow @click="voteHandler(true, 'thread')" /></div>
    <div v-if="votes > 0" class="positive">{{ votes }}</div>
    <div v-else-if="votes === 0" class="passive">{{ votes }}</div>
    <div v-else class="negative">{{ votes }}</div>
    <div class="down"><Arrow @click="voteHandler(false, 'thread')" /></div>
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
