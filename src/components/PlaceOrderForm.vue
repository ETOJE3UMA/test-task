<script setup lang="ts">
import { computed } from "vue";
import NumberInput from "@/shared/components/NumberInput/NumberInput.vue";
import TakeProfit from "@/components/TakeProfit.vue";
import Button from "@/shared/components/Button/Button.vue";
import { BASE_CURRENCY, QUOTE_CURRENCY } from "@/constants.ts";
import { store } from "@/store";
import PlaceOrderTypeSwitch from "@/components/PlaceOrderTypeSwitch.vue";
import InfoIcon from "@/shared/icons/InfoIcon/InfoIcon.vue";

const submitButtonText = computed(() => {
  return store.activeOrderSide === "buy"
    ? `Buy ${BASE_CURRENCY}`
    : `Sell ${QUOTE_CURRENCY}`;
});

const submit = () => {
  console.log("submit");
};
</script>

<template>
  <form method="post" @submit.prevent="submit" class="grid gap-4">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-base-600">Market direction</span>
        <InfoIcon class="size-4" />
      </div>
      <PlaceOrderTypeSwitch
        class="mt-2"
        v-model="store.activeOrderSide"
      />
    </div>
    <div>
      <NumberInput
        id="price"
        :label="`Price, ${QUOTE_CURRENCY}`"
        v-model.number="store.price"
        autofocus
      />
    </div>
    <div>
      <NumberInput
        id="amount"
        :label="`Amount, ${BASE_CURRENCY}`"
        v-model.number="store.amount"
      />
    </div>
    <div>
      <NumberInput
        id="total"
        :label="`Total, ${QUOTE_CURRENCY}`"
        :modelValue="store.total()"
        @update:modelValue="store.setTotal($event)"
      />
    </div>

    <TakeProfit />

    <div>
      <Button type="submit" variant="accent" :full-width="true">
        {{ submitButtonText }}
      </Button>
    </div>
  </form>
</template>
