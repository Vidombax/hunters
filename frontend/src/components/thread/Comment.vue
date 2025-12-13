<script setup>
  import Votes from '@/components/Votes.vue'

  const props = defineProps({
    idComment: Number,
    idUser: Number,
    nameUser: String,
    comment: String,
    votes: Number,
    date_publish: String,
  })
</script>

<template>
  <div class="comment">
    <div class="user">
      <router-link :to="'/user/' + props.idUser">
        <p><img src="../../assets/default_profile_photo.png" alt="Logo"></p>
        <p>{{ props.nameUser }}</p>
      </router-link>
    </div>
    <div class="text">
      <p>{{ props.comment }}</p>
    </div>
    <div class="actions">
      <div class="date">
        <p>{{ props.date_publish }}</p>
      </div>
      <div>
        <Votes
            :votes="votes"
            :id_comment="props.idComment"
            :vote-func="2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }
  .user a p img {
    width: 15px;
    height: 15px;
  }
  .user a {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .user a p {
    transition: .1s linear;
  }
  .user a p:hover {
    color: #B71C1C;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: space-between;
    width: 100%;
  }
  .date p {
    font-size: small;
    color: #888888;
  }
</style>
