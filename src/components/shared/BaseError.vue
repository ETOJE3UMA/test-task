<script setup lang="ts">
import { store } from '@/store'

</script>

<template>
  <div class="py-2 px-3 text-red-500 bg-red-100 border-red-500 border w-full">
    <p class="text-xs">
      {{ store.error }}
    </p>
  </div>
</template>

<style scoped>

</style>
