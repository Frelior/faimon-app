<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getNews } from '@/services/getNews'
import type { News } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient'

const deletedItems = ref<number[]>([])
const savingError = ref(false)
const isSaved = ref(false)
const newsByType = reactive<{ news: News[]; descriptions: News[] }>({
  news: [],
  descriptions: [],
})
onMounted(async () => {
  await fetchNews()
})

async function fetchNews() {
  const data = await getNews()
  if (data) {
    const filteredNews = data.filter((news) => news.type === 'news') || []
    const filteredDescriptions = data.filter((news) => news.type === 'description') || []
    newsByType.news = setClientId(filteredNews)
    newsByType.descriptions = setClientId(filteredDescriptions)
    console.log(newsByType)
  }
}

function setClientId(data: News[]) {
  return data.map((skill) => ({
    ...skill,
    client_id: crypto.randomUUID(),
  }))
}

function addNewItem(array: News[], type: 'news' | 'description') {
  array.push({
    client_id: crypto.randomUUID(),
    text: '',
    type: type,
  })
  console.log(array)
}

function deleteItem(array: News[], item: News) {
  if (!item.client_id) {
    console.error('no client id')
    return
  }
  if (item.id) {
    deletedItems.value.push(item.id)
    console.log(deletedItems.value)
  }
  array.splice(
    array.findIndex((i) => i.client_id === item.client_id),
    1,
  )
  console.log(array)
}

async function saveChangesDB() {
  function stripClientFields(item: News) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { client_id, id, ...rest } = item
    if (id !== undefined && id !== null) {
      return { id, ...rest }
    }
    return { ...rest }
  }

  isSaved.value = true
  const itemsToUpdate: News[] = []
  const itemsToInsert: News[] = []
  let isError = false

  newsByType.news.forEach((item) => {
    if (!item.id) {
      itemsToInsert.push(stripClientFields(item))
    } else {
      itemsToUpdate.push(stripClientFields(item))
    }
  })

  newsByType.descriptions.forEach((item) => {
    if (!item.id) {
      itemsToInsert.push(stripClientFields(item))
    } else {
      itemsToUpdate.push(stripClientFields(item))
    }
  })

  console.log(itemsToUpdate)

  for (const item of itemsToUpdate) {
    const { id, ...rest } = item

    const { error } = await supabase.from('news').update(rest).eq('id', id)

    if (error) {
      console.error(error)
      isError = true
      break
    }
  }

  if (!isError && itemsToInsert.length) {
    const { error } = await supabase.from('news').insert(itemsToInsert)

    if (error) {
      console.error(error)
      isError = true
    }
  }

  if (deletedItems.value.length && !isError) {
    await supabase
      .from('news')
      .delete()
      .in('id', deletedItems.value)
      .then((res) => {
        console.log(res.data)

        if (res.error) {
          console.error(res.error)
          isError = true
          return
        }
      })
  }
  if (isError) {
    savingError.value = true
    return
  }
  deletedItems.value = []
  await fetchNews()
}
</script>

<template>
  <div class="view-container edit-info">
    <div class="edit-block">
      <h3>Блок с описанием</h3>
      <div class="block-items" v-if="newsByType.descriptions.length">
        <div class="text-editor" v-for="desc in newsByType.descriptions" :key="desc.client_id">
          <QuillEditor
            theme="snow"
            toolbar="full"
            :content-type="'html'"
            v-model:content="desc.text"
          />
          <button class="del-btn" @click="deleteItem(newsByType.descriptions, desc)">
            Удалить
          </button>
        </div>
      </div>
      <div>
        <button class="add-btn" @click="addNewItem(newsByType.descriptions, 'description')">
          Добавить
        </button>
      </div>
    </div>

    <div class="edit-block">
      <h3>Блок с новостями</h3>
      <div class="block-items" v-if="newsByType.news.length">
        <div class="text-editor" v-for="news in newsByType.news" :key="news.client_id">
          <QuillEditor
            theme="snow"
            toolbar="full"
            :content-type="'html'"
            v-model:content="news.text"
          />
          <button class="del-btn" @click="deleteItem(newsByType.news, news)">Удалить</button>
        </div>
      </div>
      <div>
        <button class="add-btn" @click="addNewItem(newsByType.news, 'news')">Добавить</button>
      </div>
    </div>

    <button @click="saveChangesDB">СОХРАНИТЬ</button>
    <p v-if="isSaved && !savingError">Изменения сохранены.</p>
    <p v-else-if="isSaved && savingError">
      Произошла ошибка, изменения НЕ сохранены: {{ savingError }}
    </p>
  </div>
</template>

<style scoped>
:deep(.ql-container) {
  background-color: rgba(0, 0, 0, 0.815);
  border-radius: 15px;
  color: white;

  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
:deep(.ql-toolbar) {
  /* background-color: rgba(0, 0, 0, 0.664); */
  color: white;
  border-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.edit-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  color: black;

  & button {
    padding: 0.5rem 2rem;
    width: fit-content;
    &.del-btn {
      background-color: red;
    }
    &.add-btn {
      background-color: green;
      color: white;
    }
  }

  .edit-block {
    padding: 1rem 2rem;
    width: 100%;
    border: 0.7rem solid var(--font-orange-05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .block-items {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 2rem;
    }

    .text-editor {
      display: flex;
      flex-direction: column;
      width: 100%;
      font-family: 'Unbounded', sans-serif;
    }
  }
}
</style>
