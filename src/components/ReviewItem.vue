<script setup lang="ts">
import type { Question } from '@/stores/attempts'

const { id, question, answer, correct_answer } = defineProps<Question>()
</script>

<template>
  <v-card theme="light" color="grey-lighten-4">
    <v-card-item>
      <div>
        <div class="text-overline mb-1 question-number">Question #{{ id }}</div>
        <div class="text-h6 mb-1 question" v-html="question"></div>
        <div class="text-body-1 d-flex ga-2">
          <div>Your answer:</div>
          <div
            v-html="answer"
            class="font-weight-bold answer"
            :class="answer === correct_answer ? 'text-green' : 'text-red'"
          ></div>
        </div>
        <div class="text-body-1 d-flex ga-2" v-if="answer !== correct_answer">
          <div>Correct answer:</div>
          <div v-html="correct_answer" class="font-weight-bold text-green correct-answer"></div>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>
