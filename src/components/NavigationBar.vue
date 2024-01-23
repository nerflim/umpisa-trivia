<script setup lang="ts">
import type { User } from '@/stores/users'

const { user } = defineProps<{
  user: User | null
}>()

const emit = defineEmits<{
  logout: []
}>()
</script>

<template>
  <v-app-bar :elevation="2" v-if="user" color="blue-grey-darken-3 px-8">
    <v-icon>mdi-account-circle-outline</v-icon>

    <v-toolbar-title> {{ user.firstName }} {{ user.lastName }} </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn
      variant="plain"
      size="small"
      append-icon="mdi-logout"
      @click="emit('logout')"
      class="logout"
    >
      Logout
    </v-btn>
  </v-app-bar>
</template>
