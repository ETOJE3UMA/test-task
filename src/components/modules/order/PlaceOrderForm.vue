<script setup lang="ts">
import { computed } from 'vue'
import BaseInputNumber from '@/components/shared/BaseInputNumber.vue'
import TakeProfit from '@/components/modules/order/TakeProfit.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { BASE_CURRENCY, QUOTE_CURRENCY } from '@/constants.ts'
import { store } from '@/store'
import PlaceOrderTypeSwitch from '@/components/modules/order/PlaceOrderTypeSwitch.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import {
	checkAmountSum,
	checkPriceMoreThanNull,
	checkProfitMin,
	checkProfitPrevious,
	checkProfitSum
} from '@/store/errors.ts'

const submitButtonText = computed((): string => {
	return store.activeOrderSide === 'buy'
		? `Buy ${BASE_CURRENCY}`
		: `Sell ${QUOTE_CURRENCY}`
})


function handleSubmit(): void {
	try {
		checkProfitSum()
		checkProfitMin()
		checkProfitPrevious()
		checkPriceMoreThanNull()
		checkAmountSum()

		store.error = ''

		console.log('submit', store)
	} catch (error: unknown) {
		if (error instanceof Error) {
			store.error = error.message
		}
	}
}

</script>

<template>
  <form
    method="post"
    class="grid gap-4"
    @submit.prevent="handleSubmit"
  >
    <div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-base-600">Market direction</span>
        <InfoIcon class="size-4" />
      </div>
      <PlaceOrderTypeSwitch
        v-model="store.activeOrderSide"
        class="mt-2"
      />
    </div>
    <div>
      <BaseInputNumber
        id="price"
        v-model="store.price"
        :label="`Price, ${QUOTE_CURRENCY}`"
        @update:model-value="store.setPrice()"
      />
    </div>
    <div>
      <BaseInputNumber
        id="amount"
        v-model="store.amount"
        :label="`Amount, ${BASE_CURRENCY}`"
      />
    </div>
    <div>
      <BaseInputNumber
        id="total"
        :label="`Total, ${QUOTE_CURRENCY}`"
        :model-value="store.total()"
        @update:model-value="store.setTotal($event)"
      />
    </div>

    <TakeProfit />

    <div>
      <BaseButton
        type="submit"
        variant="accent"
        class="py-3 px-5"
        full-width
        :label="submitButtonText"
      />
    </div>
  </form>
</template>
