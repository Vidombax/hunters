<script setup>
  import { ref } from 'vue'

  import Votes from '@/components/Votes.vue'

  const props = ref(defineProps({
    idTread: Number,
    header: String,
    date: Date,
    idUser: Number,
    userName: String,
  }));
</script>

<template>
  <div class="tread">
    <router-link :to="'/tread/' + props.idTread">
      <div class="tread_info">
        <p>{{ props.header }}</p>
        <p>{{ props.date }}</p>
      </div>
    </router-link>
    <router-link :to="'/user/' + props.idUser">
      <p>{{ props.userName }}</p>
    </router-link>
    <div class="share_tread">
      <Votes />
      <div class="share"></div>
    </div>
  </div>
</template>

<style scoped>
  .tread {
    display: flex;
    flex-direction: column;
    background-color: #1A1A1A;
  }
  .tread_info {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
