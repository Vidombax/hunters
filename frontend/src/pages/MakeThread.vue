<script setup>
  import { ref, onMounted } from 'vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  import { useThreadStore } from '@/stores/thread_store.js'

  const threadStore = useThreadStore();

  const data = ref({
    header: '',
    raw_description: '',
    description: '',
    tags: [],
    token: localStorage.getItem('token'),
    id_user: Number(localStorage.getItem('id'))
  });
  const tags = ref([]);
  const selectedTags = ref([]);

  const postThread = async () => {
    try {
      for (const text of data.value.raw_description.ops) {
        if (text.insert.image) {
          data.value.description += ' <img ' + `src="${text.insert.image}" alt="${text.insert.image}">` + '</img> ';
        }
        else {
          data.value.description += '<p> ' + text.insert + ' </p>';
        }
      }

      data.value.tags = selectedTags.value;
      const response = await threadStore.createThread(data.value);
    }
    catch (e) {
      console.error(e);
    }
  }

  const addTagToSelected = (tag) => {
    selectedTags.value.push(tag);
  }

  const removeTagFromSelected = (tag) => {
    const index = selectedTags.value.findIndex(item => item.id === tag.id);
    if (index !== -1) {
      selectedTags.value.splice(index, 1);
    }
  }

  onMounted(async () => {
    tags.value = await threadStore.getTags(data.value);
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
            :content="data.raw_description"
            @update:content="val => data.raw_description = val"
        />
      </div>
      <div class="tags_choose">
        <p v-if="selectedTags.length > 0">Выбранные тэги</p>
        <div class="selected_tags">
          <p
              v-if="selectedTags"
              v-for="item in selectedTags"
              class="selected_tag"
          >
            {{ item.name }}
            <button @click="removeTagFromSelected(item)">x</button>
          </p>
        </div>
        <p>Доступные тэги</p>
        <div class="carousel_of_tags">
          <button
              v-for="item in tags"
              :key="item.id"
              @click="addTagToSelected(item)"
          >
            {{ item.name }}
          </button>
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
    background-color: #1A1A1A;
    padding: 0.5rem;
    border-radius: 12px;
    margin: 0.5rem;
    width: 50%;
  }
  .selected_tags {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .selected_tag {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .selected_tag button {
    width: 35px;
    height: 35px;
  }
  .carousel_of_tags {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    width: 300px;
    gap: 12px;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #3498db;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #2980b9;
    }

    /* Для Firefox */
    scrollbar-width: thin;
    scrollbar-color: #3498db #f0f0f0;

    /* Включаем скролл */
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>
