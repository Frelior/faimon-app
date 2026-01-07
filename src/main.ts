import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabaseClient'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('QuillEditor', QuillEditor)



const authStore = useAuthStore()
// Получаем текущую сессию при старте
await authStore.fetchUser()
// Подписка на изменения авторизации
supabase.auth.onAuthStateChange((event, session) => {
  authStore.user = session?.user ?? null
  authStore.isAuthenticated = !!session
})


app.mount('#app')
