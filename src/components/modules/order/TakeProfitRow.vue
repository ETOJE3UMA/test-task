<script setup lang="ts">
import BaseInputNumber from '@/components/shared/BaseInputNumber.vue'
import { QUOTE_CURRENCY } from '@/constants.ts'
import BaseButton from '@/components/shared/BaseButton.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import { store } from '@/store'
import { onBeforeMount } from 'vue'

interface IProps {
  index: number
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'deleteOrder', value: number): void
}>()

const currentTarget = store.targets[props.index]
const previousTarget = store.targets[props.index - 1]

function handleDeleteOrder(index: number): void {
	store.targets[0].amount += store.targets[index].amount

	emit('deleteOrder', index)
}

onBeforeMount(() => {
	if (!props.index) {
		currentTarget.profit = 2
		currentTarget.amount = 100
	} else {
		currentTarget.profit = previousTarget.profit + 2
		currentTarget.amount = 20
		handleAmountCount()
	}

	handleBlurProfit()
})

function handleAmountCount(): void {
	let maxAmount

	store.targets.map((item) => {
		maxAmount = Math.max(0, item.amount)

		if (item.amount === maxAmount && item.amount !== 20) {
			maxAmount -= 20
			item.amount = maxAmount
		}
	})
}


function handleBlurPrice(): void {
	currentTarget.profit = (currentTarget.price / store.price - 1) * 100
}

function handleBlurProfit(): void {
	currentTarget.price = store.price * (1 + currentTarget.profit / 100)
}
</script>

<template>
  <div class="table-cell max-w-0.5 pt-3 pr-7 pb-1">
    <BaseInputNumber
      :id="`targetProfit-${index}`"
      v-model.number="currentTarget.profit"
      variant="small"
      @blur="handleBlurProfit"
    >
      %
    </BaseInputNumber>
  </div>
  <div class="table-cell w-full pt-3 pr-7 pb-1">
    <BaseInputNumber
      :id="`targetPrice-${index}`"
      v-model.number="currentTarget.price"
      variant="small"
      @blur="handleBlurPrice"
    >
      {{ QUOTE_CURRENCY }}
    </BaseInputNumber>
  </div>
  <div class="table-cell max-w-3 pt-3 pb-1">
    <div class="flex justify-between gap-x-7">
      <BaseInputNumber
        :id="`targetAmount-${index}`"
        v-model.number="currentTarget.amount"
        variant="small"
      >
        %
      </BaseInputNumber>
      <BaseButton
        variant="transparent"
        @click="handleDeleteOrder(index)"
      >
        <template #iconLeft>
          <WarningIcon />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>

</style>
