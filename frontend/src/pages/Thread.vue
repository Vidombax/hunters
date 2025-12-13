<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import Comment from '@/components/thread/Comment.vue'
  import Votes from '@/components/Votes.vue'

  import { useThreadStore } from '@/stores/thread_store.js'
  import { useUserStore } from '@/stores/user_store.js'

  const threadStore = useThreadStore();
  const userStore = useUserStore();
  const thread = ref({});
  const score = ref(0);
  const comments = ref([]);
  const token = ref(localStorage.getItem('token'));
  const idUser = ref(Number(localStorage.getItem('id')));
  const route = useRoute();
  const id = ref(route.params.id);
  const data = ref(null);
  const newComment = ref('');

  const addComment = async () => {
    try {
      if (newComment.value !== '') {
        const data = {
          token: token.value,
          id_user: idUser.value,
          comment: newComment.value,
          id_thread: id.value
        }

        const response = await userStore.createComment(data);

        comments.value.unshift(response);

        newComment.value = '';
      }
      else {
        alert('Нельзя отправить пустое сообщение');
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  onMounted(async () => {
    data.value = {
      token: token.value,
      id: id.value
    }

    data.value = await threadStore.getThread(data.value);
    thread.value = data.value.thread;
    score.value = data.value.score;
    comments.value = data.value.comments;
  });
</script>

<template>
  <div class="thread" v-if="thread">
    <div class="user">
      <router-link :to="'/user/' + thread.id_user">
        <p><img src="../assets/default_profile_photo.png" alt="logo"></p>
        <p>{{ thread.name }}</p>
      </router-link>
    </div>
    <div class="header">
      <p class="text-3xl">{{ thread.header }}</p>
    </div>
    <div class="description">
      <p class="text-xl" v-html="thread.description"></p>
    </div>
    <div class="action_block">
      <Votes :votes="score" />
    </div>
    <div class="comments">
      <p class="text-2xl">Комментарии</p>
      <div class="add_comment">
        <input type="text" v-model="newComment" placeholder="Текст..." />
        <button
            v-if="newComment"
            @click="addComment"
        >
          Отправить
        </button>
      </div>
      <div class="comments_block">
        <Comment
            v-for="item in comments"
            :key="item.id"
            :id-user="item.id_user"
            :name-user="item.name"
            :comment="item.text"
            :date_publish="item.date_publish"
            :votes="item.comment_score"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .thread {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }
  .user a {
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
  }
  .user a p {
    transition: .1s linear;
  }
  .user a p:hover {
    color: #B71C1C;
  }
  .user img {
    width: 15px;
    height: 15px;
  }
  .action_block {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
  }
  .comments {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #1A1A1A;
    border-radius: 6px;
    flex-direction: column;
    padding: 1rem;
  }
  .add_comment {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    align-items: center;
  }
  .add_comment input {
    background-color: #888888;
    padding: 0.5rem;
    margin: 0.5rem;
    height: 25px;
    border: 0;
    border-radius: 4px;
    width: auto;
  }
  .add_comment button {
    background-color: #888888;
    height: 35px;
  }
  .comments_block {
    display: flex;
    width: 100%;

    padding: 1rem;
    justify-content: space-between;
    flex-direction: column;
    gap: 1rem;
  }
</style>
