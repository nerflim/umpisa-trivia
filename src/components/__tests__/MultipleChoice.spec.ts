import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { Question } from '@/stores/attempts'
import MultipleChoice from '../MultipleChoice.vue'

const question: Question = {
  type: 'multiple',
  difficulty: 'medium',
  category: 'Entertainment: Music',
  question: 'In what film was the Michael Jackson song ""ill You Be There" featured?',
  correct_answer: 'Free Willy',
  incorrect_answers: ['Sleepless in Seattle', 'Men in Black', 'Bad Boys'],
  id: 1,
  answer: 'Bad Boys'
}

const questionChoices = [question.correct_answer, ...question.incorrect_answers]

const vuetify = createVuetify({
  components,
  directives
})

const wrapper = mount(MultipleChoice, {
  props: question,
  global: {
    plugins: [vuetify]
  }
})

describe('MultipleChoice', () => {
  it('should render the question', () => {
    const questionEl = wrapper.find('.text-h2')
    expect(questionEl.text()).toBe(question.question)
  })

  it('should render the choices', () => {
    const choices = wrapper.findAll('.v-label')

    expect(choices.length).toBe(questionChoices.length)

    // loop through each choice and check if it's in the questionChoices array
    choices.forEach((choice) => {
      expect(questionChoices).toContain(choice.text())
    })
  })

  it('should emit an event when a button is clicked', async () => {
    const radio = wrapper.findAll('input[type="radio"]')

    await radio[0].setValue(true)
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
