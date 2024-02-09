<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import { store } from '@/store'
import TakeProfitRow, { ITarget } from '@/components/modules/order/TakeProfitRow.vue'

const emit = defineEmits(['hide'])


const targets = ref<Array<Array<ITarget>>>([
	[
		{
			id: 'profit-1',
		},
		{
			id: 'price-1',
		},
		{
			id: 'amount-1',
		}
	]
])

const getOrderButtonLabel = computed((): string => {
	return `Add profit target ${targets.value.length}/5`
})

function handleAddOrder(): void {
	const items = [
		{
			id: `profit-${targets.value.length + 1}`
		},
		{
			id: `price-${targets.value.length + 1}`
		},
		{
			id: `amount-${targets.value.length + 1}`
		}
	]
	targets.value.push(items)
}

function handleDeleteOrder(index: number): void {
	targets.value.splice(index, 1)

	targets.value = targets.value.map((_, index) => {
		return [
			{
				id: `profit-${index + 1}`
			},
			{
				id: `price-${index + 1}`
			},
			{
				id: `amount-${index + 1}`
			}
		]
	})

	if (!targets.value.length) {
		emit('hide')
	}
}

</script>

<template>
  <div class="table border-collapse">
    <div class="text-xs text-base-600 table-header-group">
      <p class="table-cell pr-7">
        Profit
      </p>
      <p class="table-cell pr-7">
        Target price
      </p>
      <p class="table-cell">
        Amount to {{ store.activeOrderSide }}
      </p>
    </div>
    <div class="table-row-group">
      <div
        v-for="(target, index) in targets"
        :key="index"
        class="table-row border-b border-base-400"
      >
        <TakeProfitRow
          :target-profit="target[0]"
          :target-price="target[1]"
          :target-amount="target[2]"
          :index="index"
          @delete-order="handleDeleteOrder"
        />
      </div>
    </div>
  </div>
  <BaseButton
    v-if="targets.length < 5"
    :label="getOrderButtonLabel"
    variant="transparent"
    @click="handleAddOrder"
  >
    <template #iconLeft>
      <AddIcon />
    </template>
  </BaseButton>
</template>

<style scoped>

</style>
