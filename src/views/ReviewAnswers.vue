<script setup lang="ts">
import ReviewItem from '@/components/ReviewItem.vue'
import router from '@/router'
import { useAttemptStore, type Attempt } from '@/stores/attempts'
import { computed } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const attemptStore = useAttemptStore()

const attemptId = ref(route.params.id as string)

const attempt = attemptStore.getAttempt(attemptId.value) as Attempt

const score = computed(() => {
  return attempt.questions.filter((question) => question.answer === question.correct_answer).length
})

const passed = computed(() => {
  return score.value >= attempt.amount / 2
})

const onClose = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="container bg-blue-grey-darken-4">
    <div class="text-center text-green-lighten-1 mb-10" v-if="passed">
      <div class="text-h2 mb-4">Congratulations!</div>
      <div class="text-h4">You passed the quiz.</div>
    </div>
    <div class="text-center text-red-lighten-1 mb-10" v-else>
      <div class="text-h2 mb-4">Better luck next time!</div>
      <div class="text-h4">You failed the quiz.</div>
    </div>

    <div class="d-flex justify-space-between align-center mb-8">
      <div class="text-h5">
        Score:
        <span :class="passed ? 'text-green' : 'text-red'">{{ score }} / {{ attempt.amount }}</span>
      </div>
      <div>
        <v-btn variant="outlined" @click="onClose">
          Go to Dashboard
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>

    <v-data-iterator :items="attempt.questions">
      <template v-for="item in attempt.questions" :key="item.id">
        <ReviewItem v-bind="item" />

        <br />
      </template>
    </v-data-iterator>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100dvh;
  padding: 150px;
}
</style>
