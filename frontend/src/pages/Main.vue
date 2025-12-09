<script setup>
  import { ref, onMounted } from 'vue'
  import TreadsFilters from '@/components/main/TreadsFilters.vue'
  import Tread from '@/components/main/Tread.vue'

  import { useTreadStore } from '@/stores/tread_store.js'

  const treadStore = useTreadStore();

  const treads = ref([]);
  const filters = ref([]);
  const isLoaded = ref(false);
  const isTreadsOpen = ref(true);

  let filter_test = {
    id_filter: 1,
    name: 'Вампиры'
  }
  let filter_test2 = {
    id_filter: 2,
    name: 'Охотники'
  }
  let tread = {
    idTread: 1,
    header: 'Тестовый тред',
    date: '09.12.2025',
    idUser: 1,
    userName: 'admin'
  }

  onMounted(async () => {
    filters.value.push(filter_test)
    filters.value.push(filter_test2)
    filters.value.push(filter_test)
    filters.value.push(filter_test2)
  });
</script>

<template>
  <div class="blocks_selector">
    <p class="block block_selected">Треды</p>
    <p class="block">Чаты</p>
  </div>
  <transition name="block" v-if="isTreadsOpen">
    <div class="treads_block">
      <TreadsFilters :tread-types="filters" />
      <div class="treads">
        <Tread
            v-for="item in 10"
            :key="item.id"
            :id-tread="tread.idTread"
            :header="tread.header"
            :date="tread.date"
            :id-user="tread.idUser"
            :user-name="tread.userName"
            :types-tread="filters"
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
