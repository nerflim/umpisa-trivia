<script setup lang="ts">
import router from '@/router'
import type { Attempt } from '@/stores/attempts'
import type { Category } from '@/stores/categories'
import { computed } from 'vue'

const { attempt, index, categories } = defineProps<{
  attempt: Attempt
  index: number
  categories: Category[]
}>()

const status = {
  in_progress: 'In Progress',
  completed: 'Completed'
}

const score = computed(() => {
  return attempt.questions.filter((question) => question.answer === question.correct_answer).length
})

const passed = computed(() => {
  return score.value >= attempt.amount / 2
})

const completed = computed(() => {
  return attempt.status === 'completed'
})

const category = computed(() => {
  return categories.find((item) => item.value === attempt.category)?.title || ''
})

const onContinue = () => {
  const unansweredQuestions = attempt.questions.filter((question) => !question.answer)

  if (unansweredQuestions.length) {
    return router.push(`/quiz/${attempt.id}/${unansweredQuestions[0].id}`)
  }
}
</script>

<template>
  <v-card>
    <v-card-item class="position-absolute w-100">
      <v-btn
        icon
        class="float-right review"
        variant="text"
        v-if="completed"
        :to="`/quiz/${attempt.id}/review`"
      >
        <v-icon>mdi-open-in-new</v-icon>
        <v-tooltip activator="parent" location="bottom">Review Attempt</v-tooltip>
      </v-btn>
      <v-btn icon class="float-right continue" variant="text" v-else @click="onContinue">
        <v-icon>mdi-play</v-icon>
        <v-tooltip activator="parent" location="bottom">Continue</v-tooltip>
      </v-btn>
    </v-card-item>
    <v-card-item>
      <div>
        <div class="text-h6 mb-1 attempt-number">Attempt #{{ index + 1 }}</div>
        <div class="text-button d-flex ga-4">
          <span :class="completed ? 'text-green' : 'text-red'" class="status">
            {{ status[attempt.status] }}
          </span>
          <template v-if="completed">
            <v-divider inset vertical />
            <span :class="passed ? 'text-green' : 'text-red'" class="passed">
              {{ passed ? 'Passed' : 'Failed' }}
            </span>
            <v-divider inset vertical />
            <span :class="passed ? 'text-green' : 'text-red'" class="score">
              {{ score }} / {{ attempt.amount }}
            </span>
          </template>
        </div>
        <div class="text-button d-flex ga-4">
          <div class="amount">{{ attempt.amount }} Questions</div>
          <template v-if="attempt.category">
            <v-divider inset vertical />
            <div class="category">{{ category }}</div>
          </template>
          <template v-if="attempt.difficulty">
            <v-divider inset vertical />
            <div class="difficulty">{{ attempt.difficulty }}</div>
          </template>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>
