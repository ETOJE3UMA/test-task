<script setup lang="ts">
import BaseInputNumber from '@/components/shared/BaseInputNumber.vue'
import { QUOTE_CURRENCY } from '@/constants.ts'
import BaseButton from '@/components/shared/BaseButton.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import { store } from '@/store'
import { onBeforeMount } from 'vue'
import BigNumber from 'bignumber.js'

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
	store.targets[0].amount = new BigNumber(store.targets[0].amount).plus(store.targets[index].amount).toString()

	emit('deleteOrder', index)
}

onBeforeMount(() => {
	if (!props.index) {
		currentTarget.profit = '2'
		currentTarget.amount = '100'
	} else {
		currentTarget.profit = new BigNumber(previousTarget.profit).plus(2).toString()
		currentTarget.amount = '20'
		handleAmountCount()
	}

	handleBlurProfit()
})

function handleAmountCount(): void {
	let maxAmount

	store.targets.map((item) => {
		maxAmount = Math.max(0, new BigNumber(item.amount).toNumber()).toString()

		if (new BigNumber(item.amount).eq(maxAmount) && !(new BigNumber(item.amount).eq(20))) {
			maxAmount = new BigNumber(maxAmount).minus(20).toString()
			item.amount = maxAmount
		}
	})
}

function handleBlurPrice(): void {
	currentTarget.profit = new BigNumber(100).mul((new BigNumber(currentTarget.price || 0).div(store.price).minus(1))).toString()
}

function handleBlurProfit(): void {
	currentTarget.price = new BigNumber(store.price || 0).mul((new BigNumber(currentTarget.profit || 0).div(100).plus(1))).toString()
}
</script>

<template>
  <div class="table-cell max-w-0.5 pt-[11px] pr-7 pb-1">
    <BaseInputNumber
      :id="`targetProfit-${index}`"
      v-model="currentTarget.profit"
      variant="small"
      @blur="handleBlurProfit"
    >
      %
    </BaseInputNumber>
  </div>
  <div class="table-cell w-full pt-[11px] pr-7 pb-1">
    <BaseInputNumber
      :id="`targetPrice-${index}`"
      v-model="currentTarget.price"
      variant="small"
      @blur="handleBlurPrice"
    >
      {{ QUOTE_CURRENCY }}
    </BaseInputNumber>
  </div>
  <div class="table-cell max-w-3 pt-[11px] pb-1">
    <div class="flex justify-between gap-x-7">
      <BaseInputNumber
        :id="`targetAmount-${index}`"
        v-model="currentTarget.amount"
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
