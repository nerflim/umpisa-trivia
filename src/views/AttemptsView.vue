<script setup lang="ts">
import AttemptItem from '@/components/AttemptItem.vue'
import { useAttemptStore } from '@/stores/attempts'
import { useCategoryStore } from '@/stores/categories'

const attemptStore = useAttemptStore()
const { categories } = useCategoryStore()

const attempts = attemptStore.attempts
</script>

<template>
  <div class="container bg-blue-grey-darken-4">
    <div class="d-flex justify-space-between align-center mb-10">
      <div class="text-h5">My Attempts - {{ attempts.length }}</div>
      <div>
        <v-btn variant="outlined" to="/dashboard">
          Go to Dashboard
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>

    <v-data-iterator :items="attempts">
      <template v-for="(attempt, index) in attempts" :key="attempt.id">
        <AttemptItem :index="index" :attempt="attempt" :categories="categories" />
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
