<script setup lang="ts">
import { computed } from 'vue'
import { TComputedStyle } from '@/types/ui.ts'

defineOptions({
	inheritAttrs: false
})

type TButtonVariant = 'base' | 'small'

interface IProps {
  modelValue: string,
  id: string,
  label?: string,
  variant?: TButtonVariant
}

const props = withDefaults(defineProps<IProps>(), {
	label: '',
	variant: 'base'
})

const emit = defineEmits(['update:modelValue', 'blur'])

const mainClass = computed((): TComputedStyle => {
	return [
		'group bg-base-100 flex flex-col',
		{
			'p-0': props.variant === 'small',
			'px-3 pb-1.5 pt-2 focus-within:bg-base-200 hover:bg-base-200 gap-y-0.5': props.variant === 'base'
		}
	]
})

const inputClass = computed((): TComputedStyle => {
	return [
		'block w-full border-0 bg-base-100 p-0 text-base-950 placeholder:text-gray-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
		{
			'text-base bg-base-100 focus-within:bg-base-200 focus:bg-base-200 group-hover:bg-base-200 ': props.variant === 'base',
			'text-sm': props.variant === 'small',
		}
	]
})

function handleInput(event: Event): void {
	const target = event.target as HTMLInputElement

	emit('update:modelValue', target.value)
}

function handleBlur(): void {
	emit('blur')
}

function checkInput(event: KeyboardEvent): void {
	if ((event.key === '-' || event.key === '+' || event.key === 'e')) {
		event.preventDefault()
	}
}
</script>

<template>
  <div
    :class="mainClass"
  >
    <label
      v-if="label"
      :for="id"
      class="block text-sm text-base-600"
    >
      {{ label }}
    </label>
    <div class="flex">
      <input
        :id="id"
        v-bind="$attrs"
        type="number"
        step="any"
        :value="modelValue"
        :class="inputClass"
        @keydown="checkInput"
        @input="handleInput"
        @blur="handleBlur"
      >
      <span
        v-if="$slots"
        class="text-base-600 text-sm"
      >
        <slot />
      </span>
    </div>
  </div>
</template>
