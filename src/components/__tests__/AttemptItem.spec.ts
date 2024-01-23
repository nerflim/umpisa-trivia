import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AttemptItem from '../AttemptItem.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const wrapper = mount(AttemptItem, {
  props: {
    index: 1,
    attempt: {
      id: 'attempt-1',
      amount: 3,
      status: 'completed',
      category: 9,
      difficulty: 'easy',
      questions: [
        {
          type: 'boolean',
          difficulty: 'medium',
          category: 'Science: Mathematics',
          question:
            'The proof for the Chinese Remainder Theorem used in Number Theory was NOT developed by its first publisher, Sun Tzu.',
          correct_answer: 'True',
          incorrect_answers: ['False'],
          id: 1,
          answer: 'True'
        },
        {
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge',
          question: 'On a dartboard, what number is directly opposite No. 1?',
          correct_answer: '19',
          incorrect_answers: ['20', '12', '15'],
          id: 2,
          answer: '20'
        },
        {
          type: 'multiple',
          difficulty: 'easy',
          category: 'Entertainment: Video Games',
          question: 'Which psychopath(s) in Dead Rising 1 gave you the small chainsaw?',
          correct_answer: 'Adam the Clown',
          incorrect_answers: ['Cliff Hudson', 'The convicts', 'Larry the butcher'],
          id: 3,
          answer: 'Adam the Clown'
        }
      ]
    },
    categories: [{ value: 9, title: 'General Knowledge' }]
  },
  global: {
    plugins: [vuetify]
  }
})

describe('AttemptItem', () => {
  it('should render the attempt number', () => {
    const attemptEl = wrapper.find('.attempt-number')
    expect(attemptEl.text()).toBe('Attempt #2')
  })

  it('should render the attempt status', () => {
    const status = wrapper.find('.status')
    expect(status.text()).toBe('Completed')
  })

  it('should render if attempt passed or failed when attempt is completed', () => {
    const passed = wrapper.find('.passed')
    expect(passed.text()).toBe('Passed')
  })

  it('should render the score when attempt is completed', () => {
    const score = wrapper.find('.score')
    expect(score.text()).toBe('2 / 3')
  })

  it('should render the amount of questions', () => {
    const amount = wrapper.find('.amount')
    expect(amount.text()).toBe('3 Questions')
  })

  it('should render the category', () => {
    const category = wrapper.find('.category')
    expect(category.text()).toBe('General Knowledge')
  })

  it('should render the difficulty', () => {
    const difficulty = wrapper.find('.difficulty')
    expect(difficulty.text()).toBe('easy')
  })

  it('should render the review button when attempt is completed', () => {
    const review = wrapper.find('.review')
    expect(review.exists()).toBe(true)
  })
})
