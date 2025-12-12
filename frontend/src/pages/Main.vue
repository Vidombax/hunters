<script setup>
  import { ref, onMounted } from 'vue'
  import TreadsFilters from '@/components/main/TreadsFilters.vue'
  import Tread from '@/components/main/Tread.vue'

  import { useThreadStore } from '@/stores/thread_store.js'
  import AddThread from "@/components/AddThread.vue";

  const threadStore = useThreadStore();

  const threads = ref([]);
  const filters = ref([]);
  const isLoaded = ref(false);
  const isTreadsOpen = ref(true);
  const token = ref(localStorage.getItem('token'));
  const id = Number(localStorage.getItem('id'));
  const data = ref({});

  onMounted(async () => {
    const data = {
      token: token.value
    }

    threads.value = await threadStore.getThreads(data);
    filters.value = await threadStore.getTags(data);
  });
</script>

<template>
  <AddThread
      v-if="id"
  />
  <div class="blocks_selector">
    <p class="block block_selected">Треды</p>
    <p class="block">Чаты</p>
  </div>
  <transition name="block" v-if="isTreadsOpen">
    <div class="treads_block">
      <TreadsFilters :tread-types="filters" />
      <div class="treads">
        <Tread
            v-if="threads"
            v-for="item in threads"
            :key="item.id"
            :id-tread="item.id_thread"
            :header="item.header"
            :date="item.date_publish"
            :id-user="item.id_user"
            :user-name="item.name"
            :types-tread="item.tags"
            :score="item.score"
        />
      </div>
    </div>
  </transition>
  <transition name="block" v-else>
    <div class="chats_block">
      <div class="all_chats">

      </div>
      <div class="open_chat">

      </div>
    </div>
  </transition>
</template>

<style scoped>
  .treads {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    padding: 1rem;
  }
  .blocks_selector {
    display: flex;
    justify-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-bottom: 1rem;
  }
  .block {
    font-size: larger;
    cursor: pointer;
  }
  .block_selected {
    border-bottom: #B71C1C solid 4px;
  }
</style>
