import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TrueFalse from '../TrueFalse.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { Question } from '@/stores/attempts'
import NavigationBar from '../NavigationBar.vue'
import type { User } from '@/stores/users'

const user: User = {
  id: 1,
  username: 'atuny0',
  email: 'atuny0@sohu.com',
  firstName: 'Terry',
  lastName: 'Medhurst'
}

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

const wrapper = mount(
  {
    template: '<v-app><navigation-bar :user="user"></navigation-bar></v-app>',
    data: () => ({
      user
    })
  },
  {
    props: {
      user
    },
    global: {
      components: {
        NavigationBar
      },
      plugins: [vuetify]
    }
  }
)

describe('NavigationBar', () => {
  it('should render the name of the user', () => {
    expect(wrapper.text()).toContain(`${user.firstName} ${user.lastName}`)
  })

  it('should have a logout button', () => {
    const logoutButton = wrapper.find('.logout')
    expect(logoutButton).toBeTruthy()
  })
})
