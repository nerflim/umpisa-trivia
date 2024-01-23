import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TrueFalse from '../TrueFalse.vue'
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

const wrapper = mount(TrueFalse, {
  props: question,
  global: {
    plugins: [vuetify]
  }
})

describe('TrueFalse', () => {
  it('should render the question', () => {
    const questionEl = wrapper.find('.text-h2')
    expect(questionEl.text()).toBe(question.question)
  })

  it('should render True or False buttons', () => {
    expect(wrapper.text()).toContain('True')
    expect(wrapper.text()).toContain('False')
  })

  it('should emit an event when a button is clicked', async () => {
    const radio = wrapper.find('input[type="radio"]')

    await radio.setValue(true)
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
