<script setup lang="ts">
import type { News } from '@/interfaces/interfaces'
import { getNews } from '@/services/getNews'
import { ref, onMounted, computed } from 'vue'
import { formatDate } from '@/services/formatDate'

const news = ref<News[]>([])
const newsGrouped = computed(() => {
  if (!news.value) return
  return {
    news: news.value.filter((news) => news.type === 'news'),
    description: news.value.filter((news) => news.type === 'description'),
  }
  {
  }
})
onMounted(async () => {
  const data = await getNews()
  if (data) {
    console.log(data)

    news.value = data
  }
})
</script>

<template>
  <div class="info-view view-container">
    <h1>FAIMON BLEACH SOUL RESONANCE</h1>
    <div class="description" v-if="newsGrouped?.description.length">
      <p v-for="description in newsGrouped.description" :key="description.id">
        {{ description.text }}
      </p>
    </div>

    <div class="news" v-if="newsGrouped?.news.length">
      <hr />
      <h2>Последние новости портала:</h2>
      <ul>
        <li v-for="news in newsGrouped.news" :key="news.id">
          <span>{{ news.text }}</span>
          <span class="date"> - {{ formatDate(news.created_at) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.info-view {
  gap: 4rem;

  h1 {
    font-size: 4rem;
  }

  .news {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        position: relative;

        & span {
          text-shadow: 0 0 1rem black;
        }

        &::before {
          content: '';
          width: 100%;
          height: 100%;
          background-color: var(--font-orange);
          filter: blur(0.2rem);
          margin-right: 1rem;
          position: absolute;
          left: 0;
          opacity: 0.2;
          z-index: -1;
        }

        .date {
          opacity: 0.5;
          font-size: 1.2rem;
        }
      }
    }
  }

  hr {
    width: 100%;
    border: none;
    height: 0.1rem;
    background-color: var(--font-orange);
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
