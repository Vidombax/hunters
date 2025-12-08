<script setup>
  import { ref, onMounted } from 'vue'
  import TreadsFilters from '@/components/main/TreadsFilters.vue'
  import Tread from '@/components/main/Tread.vue'

  import { useTreadStore } from '@/stores/tread_store.js'

  const treadStore = useTreadStore();

  const treads = ref([]);
  const isLoaded = ref(false);
  const isTreadsOpen = ref(true);

  onMounted(async () => {

  });
</script>

<template>
  <div class="blocks_selector">
    <p>Треды</p>
    <p>Чаты</p>
  </div>
  <transition name="block">
    <div class="treads_block" v-if="isTreadsOpen">
      <TreadsFilters />
      <div class="treads">
        <Tread />
      </div>
    </div>
  </transition>
  <transition name="block">
    <div class="chats_block" v-else>
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
</style>
