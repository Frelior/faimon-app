<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const menuItems = [
  { label: 'Персонажи', to: '/characters' },
  { label: 'Тир-лист', to: '/tierlist' },
  { label: 'Инфо', to: '/info' },
]
const activeIndex = ref(0)
const itemRefs = ref<(HTMLElement | null)[]>([])
const indicatorY = ref(0)

function setActive(index: number) {
  activeIndex.value = index

  nextTick(() => {
    const el = itemRefs.value[index]
    if (!el) return

    indicatorY.value = el.offsetTop
    // indicatorY.value = el.offsetTop + el.offsetHeight / 2
  })
}

watch(
  () => route.path,
  (path) => {
    const index = menuItems.findIndex((i) => i.to === path)
    if (index !== -1) setActive(index)
  },
  { immediate: true },
)

const onResize = () => {
  indicatorY.value = itemRefs.value[activeIndex.value]?.offsetTop ?? 0
}

window.addEventListener('resize', onResize)

onMounted(() => {
  setActive(0)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="menu-component">
    <div class="menu">
      <ul class="menu-list">
        <RouterLink
          tabindex="1"
          v-for="(item, index) in menuItems"
          :key="item.to"
          :to="item.to"
          custom
          v-slot="{ navigate }"
        >
          <li
            :class="{ active: activeIndex === index }"
            :ref="(el) => (itemRefs[index] = el as HTMLElement)"
            @click="
              () => {
                setActive(index)
                navigate()
              }
            "
          >
            {{ item.label }}
          </li>
        </RouterLink>
      </ul>

      <div
        class="indicator"
        :style="{
          transform: `translateY(${indicatorY}px)`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.menu-component {
  position: absolute;
  right: 0;
  top: 0rem;
  display: flex;
  flex-direction: column;
  /* outline: 1px solid white; */

  .menu {
    display: flex;
    color: var(--font-orange);
    position: relative;

    .menu-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      li {
        font-family: 'Unbounded', sans-serif;
        font-weight: 400;
        transition:
          transform 0.2s ease,
          font-variation-settings 0.2s ease,
          opacity 0.2s ease;

        font-size: 2.5rem;
        opacity: 0.9;
        line-height: 5rem;
        text-align: right;
        margin-right: 1rem;
        cursor: pointer;
        transform-origin: right center;

        &.active {
          transform: scale(1.4);
          font-weight: 600;
          opacity: 1;
        }

        &:hover {
          text-shadow: 0 0 1px var(--font-orange);
        }
      }
    }

    .indicator {
      margin-top: 2.5rem;
      width: 4rem;
      height: 0.5rem;
      background-color: var(--font-orange);
      transform: translateY(-50%);
      transition: transform 0.2s ease;
    }
  }
}
</style>
