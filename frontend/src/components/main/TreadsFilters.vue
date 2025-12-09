<script setup>
  import { ref } from 'vue'

  import Filter from '@/components/main/Filter.vue'
  import { sortsArray } from '@/services/constants.js'

  const props = defineProps({
    treadTypes: Array,
  });
</script>

<template>
  <div class="filters">
    <div class="types_of_tread">
      <p class="text-xl p-2">Тематика тредов</p>
      <div class="carousel_of_types">
        <Filter
            v-for="item in props.treadTypes"
            :key="item.id"
            :id="item.id_filter"
            :name="item.name"
        />
      </div>
    </div>
    <div>
      <p class="text-xl p-2">Сортировать треды</p>
      <div class="sorts">
        <select class="sorts_select">
          <option v-for="item in sortsArray" :value="item.value">{{ item.text }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .filters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
  }
  .carousel_of_types {
    display: flex;
    gap: 1rem;
  }
  .sorts_select {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #0D0D0D;
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 4px;
  }
  .sorts_select:active {
    border-color: #B71C1C;
  }

  @media screen and (max-width: 1050px) {
    .filters {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    .carousel_of_types {
      width: 300px;
      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
      overflow-y: scroll;
      padding: 0.8rem;

      &::-webkit-scrollbar {
        display: block;
        height: 8px;
      }
    }
  }
</style>
