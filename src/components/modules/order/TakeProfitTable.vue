<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import { store } from '@/store'
import TakeProfitRow from '@/components/modules/order/TakeProfitRow.vue'
import { QUOTE_CURRENCY } from '@/constants.ts'
import BaseError from '@/components/shared/BaseError.vue'

const emit = defineEmits(['hide'])

const getOrderButtonLabel = computed((): string => {
	return `Add profit target ${store.targets.length}/5`
})

function handleAddOrder(): void {
	store.targets.push({
		profit:'0',
		price: '0',
		amount: '0'
	})
}

onMounted(() => {
	handleAddOrder()
})

onUnmounted(() => {
	store.targets = []
})

function handleDeleteOrder(index: number): void {
	store.targets.splice(index, 1)

	if (!store.targets.length) {
		emit('hide')
	}
}

</script>

<template>
  <div class="grid gap-3">
    <div class="table border-collapse">
      <div class="text-xs text-base-600 table-header-group">
        <p class="table-cell pr-7">
          Profit
        </p>
        <p class="table-cell pr-7">
          Target price
        </p>
        <p class="table-cell whitespace-nowrap">
          Amount to {{ store.activeOrderSide }}
        </p>
      </div>
      <div class="table-row-group">
        <div
          v-for="(_, index) in store.targets"
          :key="index"
          class="table-row border-b border-base-400"
        >
          <TakeProfitRow
            :index="index"
            @delete-order="handleDeleteOrder"
          />
        </div>
      </div>
    </div>
    <BaseError v-if="store.error" />
    <BaseButton
      v-if="store.targets.length < 5"
      :label="getOrderButtonLabel"
      variant="transparent"
      @click="handleAddOrder"
    >
      <template #iconLeft>
        <AddIcon />
      </template>
    </BaseButton>
  </div>

  <div class="flex items-end">
    <p class="text-base-600 text-sm whitespace-nowrap font-normal">
      Projected profit
    </p>
    <span class="border-b border-dotted border-base-500 w-full h-0" />
    <p class="flex text-sm whitespace-nowrap font-medium">
      <span class="text-base-1000">{{ store.projectedProfit() }}</span>
      &nbsp;
      <span class="text-base-600">{{ QUOTE_CURRENCY }}</span>
    </p>
  </div>
</template>

<style scoped>

</style>
