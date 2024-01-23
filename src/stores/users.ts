import { ref } from 'vue'
import { defineStore } from 'pinia'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface UserWithPassword extends User {
  password: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null>(null)

    const setUser = (data: User) => {
      user.value = data
    }

    const logout = () => {
      user.value = null
    }

    return { user, setUser, logout }
  },
  { persist: true }
)
