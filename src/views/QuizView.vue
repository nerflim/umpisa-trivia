<script setup lang="ts">
import MultipleChoice from '@/components/MultipleChoice.vue'
import QuizActions from '@/components/QuizActions.vue'
import TrueFalse from '@/components/TrueFalse.vue'
import router from '@/router'
import { useAttemptStore, type Attempt } from '@/stores/attempts'
import { watchEffect } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const attemptId = ref(route.params.id as string)
const questionId = ref(route.params.question as string)
const isClosing = ref(false)
const initialValue = ref('')

const attemptStore = useAttemptStore()

const question = ref(attemptStore.getQuestion(attemptId.value, questionId.value))
const attempt = attemptStore.getAttempt(attemptId.value) as Attempt

watchEffect(() => {
  const paramsId = route.params.id as string
  const paramsQuestion = route.params.question as string
  const storeQuestion = attemptStore.getQuestion(paramsId, paramsQuestion)

  attemptId.value = paramsId
  questionId.value = paramsQuestion
  question.value = storeQuestion
  initialValue.value = storeQuestion.answer
})

const setAnswer = () => {
  // save the answer to the store
  attemptStore.setAnswer(attemptId.value, questionId.value, initialValue.value)
  // set the initial value back to empty
  initialValue.value = ''
}

const onPrevious = () => {
  if (Number(questionId.value) !== 1) {
    setAnswer()
    router.push(`/quiz/${attemptId.value}/${Number(questionId.value) - 1}`)
  }
}

const onNext = () => {
  setAnswer()
  // go to the next question
  router.push(`/quiz/${attemptId.value}/${Number(questionId.value) + 1}`)
}

const onClose = () => {
  setAnswer()
  // go to the dashboard
  router.push('/dashboard')
}

const onValueChange = (value: string) => {
  initialValue.value = value
}

const onSubmit = () => {
  setAnswer()
  // set the attempt status to completed
  attemptStore.setAttemptStatus(attemptId.value, 'completed')
  // go to the result page
  router.push(`/quiz/${attemptId.value}/review`)
}
</script>

<template>
  <div class="container bg-blue-grey-darken-4">
    <div class="d-flex justify-space-between align-end mb-8">
      <div>Question #{{ questionId }}</div>
      <v-btn icon="mdi-window-close" variant="text" @click="isClosing = true"></v-btn>
    </div>

    <MultipleChoice
      v-if="question.type === 'multiple'"
      v-bind="question"
      :key="questionId"
      @change="onValueChange"
    />
    <TrueFalse
      v-if="question.type === 'boolean'"
      v-bind="question"
      :key="questionId"
      @change="onValueChange"
    />

    <QuizActions
      :attempt="attempt"
      :question-id="questionId"
      :initial-value="initialValue"
      @next="onNext"
      @previous="onPrevious"
      @submit="onSubmit"
    />
  </div>

  <v-dialog v-model="isClosing" width="auto">
    <v-card class="pa-4">
      <v-card-title class="text-h6">Are you sure you want to close this quiz?</v-card-title>
      <v-card-text class="text-body-2">
        You can still continue the quiz later or create a new one.
      </v-card-text>
      <v-card-actions class="mt-8">
        <v-btn color="grey-lighten-1" @click="isClosing = false">Cancel</v-btn>
        <v-spacer />
        <v-btn color="red" @click="onClose" variant="tonal">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100dvh;
  padding: 150px 200px;
}
</style>
