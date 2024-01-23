<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import router from '@/router'
import { v4 as uuid } from 'uuid'
import { useAttemptStore, type Attempt } from '@/stores/attempts'
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { api } from '@/api'

const attemptStore = useAttemptStore()

const { isCategoriesLoading, setIsCategoriesLoading, categories, setCategories, difficulty } =
  useCategoryStore()

const attempts = attemptStore.attempts

const isCreateError = ref(false)

const validationSchema = z.object({
  amount: z.coerce
    .number({
      required_error: 'Number of questions is required'
    })
    .max(50, 'Number of questions must be less than 50')
    .default(10),
  category: z.number().nullable().default(null),
  difficulty: z.string().nullable().default(null)
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const amountField = useField('amount')
const categoryField = useField('category')
const difficultyField = useField('difficulty')

const onSubmit = handleSubmit(async (values) => {
  try {
    const payload = {
      amount: values.amount,
      category: values.category || undefined,
      difficulty: values.difficulty || undefined
    }

    const response = await api.getQuestions(payload)

    const data = response.data

    const attemptPayload: Attempt = {
      id: uuid(),
      ...payload,
      status: 'in_progress',
      questions: data.results.map((question, index) => ({
        ...question,
        id: index + 1,
        answer: ''
      }))
    }

    attemptStore.addAttempt(attemptPayload)

    router.push(`/quiz/${attemptPayload.id}/1`)
  } catch (error) {
    isCreateError.value = true
  }
})

onMounted(async () => {
  try {
    setIsCategoriesLoading(true)

    const response = await api.getCategories()

    setCategories([
      { title: 'Any Category', value: null },
      ...response.data.trivia_categories.map((item: { id: number; name: string }) => ({
        value: item.id,
        title: item.name
      }))
    ])
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    setIsCategoriesLoading(false)
  }
})
</script>

<template>
  <div class="container bg-blue-grey-darken-4">
    <main>
      <div class="text-center text-green-lighten-1 mb-10">
        <div class="text-h2 mb-4">Welcome to Umpisa Trivia</div>
      </div>
      <div class="mb-12 d-flex justify-end">
        <v-btn color="green-darken-1" variant="outlined" to="/attempts">
          View my attempts - ({{ attempts.length }})
        </v-btn>
      </div>
      <v-form @submit.prevent="onSubmit" class="d-flex flex-column ga-4">
        <v-text-field
          label="Number of Questions"
          v-model="amountField.value.value"
          :error-messages="amountField.errorMessage.value"
          type="number"
          color="green"
        />
        <v-select
          label="Category"
          :items="categories"
          v-model="categoryField.value.value"
          :error-messages="categoryField.errorMessage.value"
          color="green"
          :loading="isCategoriesLoading"
        />
        <v-select
          label="Difficulty"
          :items="difficulty"
          v-model="difficultyField.value.value"
          :error-messages="difficultyField.errorMessage.value"
          color="green"
        />

        <v-btn class="startBtn mx-auto mt-8" color="green-darken-3" variant="flat" type="submit">
          LET'S START!
        </v-btn>
      </v-form>
    </main>
  </div>

  <v-dialog v-model="isCreateError" width="auto">
    <v-card class="pa-4">
      <v-card-title class="text-h6"> Error creating quiz </v-card-title>
      <v-card-text class="text-body-2">
        There was an error creating the quiz. Please try again.
      </v-card-text>
      <v-card-actions class="mt-8">
        <v-btn color="red" variant="tonal" block @click="isCreateError = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100dvh;
  padding: 150px;

  main {
    max-width: 1280px;
    margin: 0 auto;
    .startBtn {
      width: 300px;
      height: 100px;
      font-size: 30px;
    }
  }
}
</style>
