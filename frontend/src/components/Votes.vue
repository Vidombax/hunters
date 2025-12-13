<script setup>
  import { ref } from 'vue'
  import Arrow from '@/components/svg/Arrow.vue'
  import { useUserStore } from '@/stores/user_store.js'

  const props = defineProps({
    votes: Number,
    id_tread: Number,
    id_comment: Number,
    voteFunc: Number,
  });
  const votes = ref(props.votes);
  const id_user = ref(Number(localStorage.getItem('id')));
  const token = ref(localStorage.getItem('token'));
  const userStore = useUserStore();

  const voteHandler = async (typeVote, voteFunc) => {
    try {
      const data = {
        id_user: id_user.value,
        id_tread: props.id_tread,
        id_comment: props.id_comment,
        score: 0,
        token: token.value
      }

      switch (voteFunc) {
        case 1:
          if (typeVote === true) {
            data.score = 1;
            await userStore.rateThread(data);
            votes.value += 1;
          }
          else {
            data.score = -1;
            await userStore.rateThread(data);
            votes.value -= 1;
          }
          break;
        case 2:
          if (typeVote === true) {
            data.score = 1;
            await userStore.rateComment(data);
            votes.value += 1;
          }
          else {
            data.score = -1;
            await userStore.rateComment(data);
            votes.value -= 1;
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
    <div class="up"><Arrow @click="voteHandler(true, props.voteFunc)" /></div>
    <div v-if="votes > 0" class="positive">{{ votes }}</div>
    <div v-else-if="votes === 0" class="passive">{{ votes }}</div>
    <div v-else class="negative">{{ votes }}</div>
    <div class="down"><Arrow @click="voteHandler(false, props.voteFunc)" /></div>
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
