<script setup>
  import { ref, onMounted } from 'vue'

  import Comment from '@/components/thread/Comment.vue'
  import Votes from '@/components/Votes.vue'

  const tread = ref({});

  onMounted(async () => {

  });
</script>

<template>
  <div class="tread">
    <div class="user">
      <p></p>
      <p></p>
    </div>
    <div class="header">
      <p></p>
    </div>
    <div class="description">
      <p></p>
    </div>
    <div class="action_block">
      <Votes />
    </div>
    <div class="comments">
      <Comment />
    </div>
  </div>
</template>

<style scoped>

</style>
