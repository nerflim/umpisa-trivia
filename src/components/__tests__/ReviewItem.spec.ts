import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { Question } from '@/stores/attempts'
import ReviewItem from '../ReviewItem.vue'

const question: Question = {
  type: 'boolean',
  difficulty: 'medium',
  category: 'Entertainment: Television',
  question: 'Bob Ross was a US Air Force pilot.',
  correct_answer: 'False',
  incorrect_answers: ['True'],
  id: 3,
  answer: 'True'
}

const vuetify = createVuetify({
  components,
  directives
})

const wrapper = mount(ReviewItem, {
  props: question,
  global: {
    plugins: [vuetify]
  }
})

describe('ReviewItem', () => {
  it('should render the question number', () => {
    const questionEl = wrapper.find('.question-number')
    expect(questionEl.text()).toBe('Question #3')
  })

  it('should render the question', () => {
    const questionEl = wrapper.find('.question')
    expect(questionEl.text()).toBe(question.question)
  })

  it('should render the answer', () => {
    const answerEl = wrapper.find('.answer')
    expect(answerEl.text()).toBe(question.answer)
  })

  it('should render the correct answer when the answer is wrong', () => {
    const correctAnswer = wrapper.find('.correct-answer')
    expect(correctAnswer.text()).toBe(question.correct_answer)
  })
})
