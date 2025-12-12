<script setup>
  import { ref, onMounted } from 'vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  import { useThreadStore } from '@/stores/thread_store.js'

  const threadStore = useThreadStore();

  const data = ref({
    header: '',
    description: '',
    tags: {},
    token: localStorage.getItem('token'),
    id: Number(localStorage.getItem('id'))
  });
  const tags = ref([]);

  const postThread = async () => {
    try {
      console.log(data.value.description.ops)
    }
    catch (e) {
      console.error(e);
    }
  }

  onMounted(async () => {

  })
</script>

<template>
  <p class="text-2xl">Создать тред</p>
  <div class="create_thread">
      <div class="header">
        <input
            type="text"
            v-model="data.header"
            required
            placeholder="Название треда"
            maxlength="50"
        />
      </div>
      <div class="description">
        <QuillEditor
            theme="snow"
            :content="data.description"
            @update:content="val => data.description = val"
        />
      </div>
      <div class="tags_choose">
        <div class="selected_tags">

        </div>
        <div class="carousel_of_tags">

        </div>
      </div>
      <div class="actions">
        <button @click="postThread">Запостить</button>
      </div>
  </div>
</template>

<style scoped>
  .create_thread {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .header input {
    background-color: #888888;
    padding: 1rem;
    margin: 1rem;
    height: 25px;
    border: 0;
    border-radius: 4px;
    width: 40%;
  }
  .description {
    width: 100%;
  }
  .tags_choose {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
</style>
