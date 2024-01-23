<script setup lang="ts">
import type { Attempt } from '@/stores/attempts'

const { questionId, initialValue, attempt } = defineProps<{
  questionId: string
  initialValue: string
  attempt: Attempt
}>()

const emit = defineEmits<{
  previous: []
  next: []
  submit: []
}>()
</script>

<template>
  <div class="d-flex justify-space-between w-100 mt-10">
    <v-btn
      size="large"
      variant="outlined"
      width="170"
      @click="emit('previous')"
      class="previous"
      v-if="Number(questionId) !== 1"
    >
      <v-icon>mdi-arrow-left</v-icon>
      <span>Previous</span>
    </v-btn>
    <v-spacer v-else />
    <v-btn
      size="large"
      variant="flat"
      width="170"
      color="green-darken-1"
      @click="emit('next')"
      :disabled="!initialValue"
      class="next"
      v-if="Number(questionId) !== attempt.amount"
    >
      <span>Next</span>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
    <v-btn
      size="large"
      variant="flat"
      width="170"
      color="green-darken-1"
      @click="emit('submit')"
      class="submit"
      :disabled="!initialValue"
      v-else
    >
      <span>Submit</span>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>
