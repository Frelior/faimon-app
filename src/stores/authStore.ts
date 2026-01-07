import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<unknown>(null)
  const isAuthenticated = ref(false)

  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    user.value = session?.user ?? null
    isAuthenticated.value = !!session
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    logout,
  }
})
