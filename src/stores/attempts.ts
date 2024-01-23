import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './users'

export type Question = {
  id: number
  type: 'multiple' | 'boolean'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  answer: string
}

export type Attempt = {
  id: string
  questions: Question[]
  status: 'in_progress' | 'completed'
  amount: number
  category?: number
  difficulty?: string
}

export const useAttemptStore = defineStore(
  'attempt',
  () => {
    const userStore = useUserStore()

    const allAttempts = ref<Record<number, Attempt[]>>({})

    const attempts = computed(() => {
      const userId = userStore.user?.id

      return userId ? allAttempts.value[userId] || [] : []
    })

    const addAttempt = (attempt: Attempt) => {
      if (userStore.user) {
        const userId = userStore.user.id

        allAttempts.value[userId] = allAttempts.value[userId] || []
        allAttempts.value[userId].push(attempt)
      }
    }

    const getAttempt = (id: string) => {
      if (userStore.user) {
        const userId = userStore.user.id

        return (allAttempts.value[userId] || []).find((attempt) => attempt.id === id) as Attempt
      }
    }

    const getQuestion = (id: string, questionId: string) => {
      return getAttempt(id)?.questions.find((item) => item.id.toString() === questionId) as Question
    }

    const setAnswer = (id: string, questionId: string, answer: string) => {
      return (getQuestion(id, questionId).answer = answer)
    }

    const setAttemptStatus = (id: string, status: Attempt['status']) => {
      const attempt = getAttempt(id)

      if (attempt) {
        attempt.status = status
      }
    }

    return {
      allAttempts,
      attempts,
      addAttempt,
      getAttempt,
      getQuestion,
      setAnswer,
      setAttemptStatus
    }
  },
  { persist: true }
)
