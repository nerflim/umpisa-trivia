<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "@/stores/attempts";
import { computed } from "vue";

const { id, question, correct_answer, incorrect_answers, answer } =
  defineProps<Question>();

const emit = defineEmits<{
  change: [value: string];
}>();

const initialAnswer = ref(answer);

const choices = computed(() => {
  return [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);
});

const onChange = (data: string) => {
  emit("change", data);
};
</script>

<template>
  <div>
    <h1 v-html="question" class="text-h2 mb-8" />

    <v-radio-group inline v-model="initialAnswer" :key="id">
      <v-col v-for="choice in choices" :key="choice" cols="6">
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

<style scoped lang="scss">
.choices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
