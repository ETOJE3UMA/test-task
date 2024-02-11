<script setup lang="ts">
import InfoIcon from '@/components/icons/InfoIcon.vue'
import BaseToggle from '@/components/shared/BaseToggle.vue'
import { computed, ref, watchEffect } from 'vue'
import TakeProfitTable from '@/components/modules/order/TakeProfitTable.vue'
import { TComputedStyle } from '@/types/ui.ts'
import { store } from '@/store'

const isTakeProfit = ref<boolean>(false)

const classProfitText = computed((): TComputedStyle => {
	return [
		{
			'text-sm text-base-600': !isTakeProfit.value,
			'text-md text-base-1000': isTakeProfit.value
		}
	]
})

function handleHideTable(): void {
	isTakeProfit.value = false
}

watchEffect(() => {
	if (!isTakeProfit.value) {
		store.error = ''
	}
})

</script>
<template>
  <div class="grid gap-4 bg-base-100 p-3">
    <div class="flex items-center gap-2">
      <InfoIcon class="size-4 flex-none" />
      <span :class="classProfitText">Take Profit</span>
      <BaseToggle
        v-model="isTakeProfit"
        class="flex grow justify-end"
      />
    </div>
    <TakeProfitTable
      v-if="isTakeProfit"
      @hide="handleHideTable"
    />
  </div>
</template>
