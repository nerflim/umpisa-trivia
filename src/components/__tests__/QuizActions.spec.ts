import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QuizActions from '../QuizActions.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { Question } from '@/stores/attempts'

const question: Question = {
  type: 'boolean',
  difficulty: 'medium',
  category: 'Entertainment: Television',
  question: 'Bob Ross was a US Air Force pilot.',
  correct_answer: 'False',
  incorrect_answers: ['True'],
  id: 3,
  answer: 'False'
}

const vuetify = createVuetify({
  components,
  directives
})

const wrapper = (questionId: string) =>
  mount(QuizActions, {
    props: {
      questionId,
      attempt: {
        id: 'attempt-1',
        amount: 10,
        status: 'completed',
        questions: []
      },
      initialValue: 'test'
    },
    global: {
      plugins: [vuetify]
    }
  })

describe('QuizActions', () => {
  it('should render the previous button when it has a previous question', () => {
    const prevEl = wrapper('2').find('.previous')
    expect(prevEl).toBeTruthy()
  })

  it('should render the next button when there is a next question', () => {
    const nextEl = wrapper('2').find('.next')
    expect(nextEl).toBeTruthy()
  })

  it('should render the submit button when it is the last question', () => {
    const submitEl = wrapper('10').find('.submit')
    expect(submitEl).toBeTruthy()
  })

  it('should emit previous event when previous button is clicked', async () => {
    const wrapperEl = wrapper('2')
    const prevEl = wrapperEl.find('.previous')
    await prevEl.trigger('click')

    expect(wrapperEl.emitted('previous')).toBeTruthy()
  })

  it('should emit next event when next button is clicked', async () => {
    const wrapperEl = wrapper('2')
    const nextEl = wrapperEl.find('.next')
    await nextEl.trigger('click')

    expect(wrapperEl.emitted('next')).toBeTruthy()
  })

  it('should emit submit event when submit button is clicked', async () => {
    const wrapperEl = wrapper('10')
    const submitEl = wrapperEl.find('.submit')
    await submitEl.trigger('click')

    expect(wrapperEl.emitted('submit')).toBeTruthy()
  })
})
