<script setup lang="ts">
import type { News } from '@/interfaces/interfaces'
import { getNews } from '@/services/news'
import { reactive, onMounted } from 'vue'
import { formatDate } from '@/services/utility'

const news = reactive<{ news: News[]; description: News[] }>({ news: [], description: [] })

onMounted(async () => {
  const data = await getNews()
  if (data) {
    console.log(data)

    news.news = data.news
    news.description = data.descriptions
  }
})
</script>

<template>
  <div class="info-view view-container">
    <h1>FAIMON BLEACH SOUL RESONANCE</h1>
    <div class="description" v-if="news.description">
      <p v-for="description in news.description" :key="description.client_id">
        {{ description.text }}
      </p>
    </div>

    <div class="news" v-if="news.news">
      <hr />
      <h2>Последние новости портала:</h2>
      <ul v-if="news.news">
        <li v-for="newsItem in news.news" :key="newsItem.client_id">
          <span>{{ newsItem.text }}</span>
          <span class="date" v-if="newsItem.created_at"> - {{ formatDate(newsItem.created_at) }}</span>
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
