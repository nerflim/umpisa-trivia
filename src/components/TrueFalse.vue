<script setup lang="ts">
import { ref } from 'vue'
import type { Question } from '@/stores/attempts'
import { computed } from 'vue'

const { question, correct_answer, incorrect_answers, answer } = defineProps<Question>()

const initialAnswer = ref(answer)

const emit = defineEmits<{
  change: [value: string]
}>()

const choices = computed(() => {
  const initialChoices = [correct_answer, ...incorrect_answers]

  // sort the choices alphabetically but descending
  return initialChoices.sort((a, b) => {
    if (a < b) return 1
    if (a > b) return -1

    return 0
  })
})

const onChange = (data: string) => {
  emit('change', data)
}
</script>

<template>
  <div>
    <h1 v-html="question" class="text-h2 mb-8" />

    <v-radio-group v-model="initialAnswer">
      <v-col v-for="choice in choices" :key="choice">
        <v-radio
          :label="choice"
          :value="choice"
          color="green"
          @change="() => onChange(initialAnswer)"
        >
          <template v-slot:label>
            <div v-html="choice" class="text-h5"></div>
          </template>
        </v-radio>
      </v-col>
    </v-radio-group>
  </div>
</template>
