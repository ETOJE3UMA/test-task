<script setup lang="ts">
import BaseInputNumber from '@/components/shared/BaseInputNumber.vue'
import { QUOTE_CURRENCY } from '@/constants.ts'
import BaseButton from '@/components/shared/BaseButton.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import { ref } from 'vue'


export interface ITarget {
  id: string
}

interface IProps {
  targetProfit: ITarget,
  targetPrice: ITarget,
  targetAmount: ITarget,
  index: number
}

defineProps<IProps>()

const emit = defineEmits<{
  (e: 'deleteOrder', value: number): void
}>()

const profit = ref<Record<string, number>>({})
const price = ref<Record<string, number>>({})
const amount = ref<Record<string, number>>({})

function handleDeleteOrder(index: number): void {
	emit('deleteOrder', index)
}
</script>

<template>
  <div class="table-cell w-1 pt-3 pr-7 pb-1">
    <BaseInputNumber
      :id="targetProfit.id"
      v-model.number="profit[targetProfit.id]"
      variant="small"
    >
      %
    </BaseInputNumber>
  </div>
  <div class="table-cell pt-3 pr-7 pb-1">
    <BaseInputNumber
      :id="targetPrice.id"
      v-model.number="price[targetPrice.id]"
      variant="small"
    >
      {{ QUOTE_CURRENCY }}
    </BaseInputNumber>
  </div>
  <div class="table-cell pt-3 pb-1">
    <div class="flex justify-between gap-x-7">
      <BaseInputNumber
        :id="targetAmount.id"
        v-model.number="amount[targetAmount.id]"
        variant="small"
        class="w-8"
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
