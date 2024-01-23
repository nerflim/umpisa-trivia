import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Category = { title: string; value: number }

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categories = ref<Category[]>([])
    const isCategoriesLoading = ref(false)

    const difficulty = [
      { title: 'Any Difficulty', value: null },
      { title: 'Easy', value: 'easy' },
      { title: 'Medium', value: 'medium' },
      { title: 'Hard', value: 'hard' }
    ]

    const setCategories = (data: Category[]) => {
      categories.value = data
    }

    const setIsCategoriesLoading = (value: boolean) => {
      isCategoriesLoading.value = value
    }

    return { categories, isCategoriesLoading, difficulty, setCategories, setIsCategoriesLoading }
  },
  { persist: true }
)
