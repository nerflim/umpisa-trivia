<script setup lang="ts">
import router from '@/router'
import { useUserStore, type UserWithPassword } from '@/stores/users'
import { api } from '@/api'
import { onMounted } from 'vue'
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const isLoading = ref(false)
const isLoginInvalid = ref(false)

const users = ref<UserWithPassword[]>([])

const userStore = useUserStore()

const login = () => {
  isLoginInvalid.value = false
  isLoading.value = true

  api
    .login({
      username: username.value,
      password: password.value
    })
    .then(({ data }) => {
      userStore.setUser(data)
      router.push('/dashboard')
    })
    .catch(() => {
      isLoginInvalid.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  userStore.logout()

  api.getUsers().then(({ data }) => {
    users.value = data.users
  })
})
</script>

<template>
  <div class="container bg-blue-grey-darken-4">
    <v-card width="450" class="mx-auto px-4 py-2 mb-4" variant="flat">
      <v-card-item>
        <v-card-title class="text-center">Welcome to Umpisa Trivia</v-card-title>
        <v-card-subtitle class="text-center">Login</v-card-subtitle>
      </v-card-item>
      <v-card-item>
        <v-alert
          v-if="isLoginInvalid"
          type="error"
          text="Please check your username and password."
          density="compact"
        >
        </v-alert>
      </v-card-item>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="username"
            label="Username"
            required
            color="green-darken-3"
            :disabled="isLoading"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            color="green-darken-3"
            :disabled="isLoading"
          />
          <v-btn
            @click="login"
            variant="flat"
            block
            color="green-darken-3"
            class="mt-4"
            size="large"
            :loading="isLoading"
            :disabled="!username || !password"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card width="450" class="mx-auto py-2" variant="flat">
      <v-card-item>
        <v-card-title class="text-center sticky-title">Users</v-card-title>
        <v-card-subtitle class="text-center">
          Use any login credentials from the available users below
        </v-card-subtitle>
      </v-card-item>
      <v-card-item>
        <v-list height="400">
          <v-list-item v-for="user in users" :key="user.id" class="mb-3">
            <v-list-item-content>
              <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
              <v-list-item-subtitle>
                Username: <span class="ml-3">{{ user.username }}</span>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Password: <span class="ml-3">{{ user.password }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100dvh;
  padding-top: 150px;
}
</style>
