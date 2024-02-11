<script setup lang="ts">
import { TOrderSide } from '@/types/profit.ts'
import BaseButton from '@/components/shared/BaseButton.vue'
import { PropType } from 'vue'

const activeOrderSide = defineModel('modelValue', {
	type: String as PropType<TOrderSide>,
	default: 'buy'
})

function handleToggle(orderType: TOrderSide): void {
	activeOrderSide.value = orderType
}
</script>

<template>
  <div class="flex items-center gap-2">
    <BaseButton
      size="small"
      full-width
      :outline="activeOrderSide !== 'buy'"
      label="Buy"
      @click="handleToggle('buy')"
    />
    <BaseButton
      size="small"
      full-width
      :outline="activeOrderSide === 'buy'"
      label="Sell"
      @click="handleToggle('sell')"
    />
  </div>
</template>
