<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/users'
import NavigationBar from './components/NavigationBar.vue'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  window.location.href = '/'
}
</script>

<template>
  <v-app>
    <NavigationBar :user="userStore.user" @logout="logout" />
    <RouterView />
  </v-app>
</template>
