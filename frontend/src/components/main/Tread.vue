<script setup>
  import Votes from '@/components/Votes.vue'
  import Cheap from '@/components/main/Cheap.vue'
  import Share from "@/components/svg/Share.vue";

  const props = defineProps({
    idTread: Number,
    header: String,
    date: Date,
    idUser: Number,
    userName: String,
    typesTread: Array,
    score: Number
  });
</script>

<template>
  <div class="tread">
    <div class="tread_types">
      <Cheap
          v-for="item in typesTread"
          :key="item.id"
          :name="item.name"
      />
    </div>
    <div class="tread_info">
      <router-link :to="'/thread/' + props.idTread">
        <p class="text-2xl header">{{ props.header }}</p>
      </router-link>
    </div>
    <div class="user">
      <router-link :to="'/user/' + props.idUser">
        <img src="../../assets/default_profile_photo.png" alt="default logo">
        <p class="ext-text">{{ props.userName }}</p>
      </router-link>
    </div>
    <div class="share_tread">
      <div>
        <p class="text-xs ext-text date">{{ props.date }}</p>
      </div>
      <Votes
          :votes="score"
          :id_tread="props.idTread"
          :vote-func="1"
      />
      <div class="share">
        <Share />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .tread {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 12px;
    padding: 1rem;
    background-color: #1A1A1A;
    transition: .3s linear;
    gap: 4px;
  }
  .header {
    transition: .1s linear;
  }
  .header:hover {
    color: #B71C1C;
  }
  .tread:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  .tread_info {
    display: flex;
    align-items: flex-end;
    gap: 4px;
  }
  .ext-text {
    color: gray;
    transition: .1s linear;
  }
  .ext-text:hover {
    color: #FFFFF0;
  }
  .user a {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 4px;
    width: 25px;
  }
  .user img {
    width: 15px;
    height: 15px;
  }
  .tread_types {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-bottom: 6px;
  }
  .share_tread {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 8px;
    align-items: center;
  }
  .date {
    grid-column: span 3 / span 3;
    width: 35px;
  }
  .votes {
    grid-column-start: 4;
  }
  .share {
    grid-column-start: 5;
  }
</style>
