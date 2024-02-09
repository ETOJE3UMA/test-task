<script setup lang="ts">
import { computed } from 'vue'
import { TComputedStyle } from '@/types/ui.ts'

type TButtonType = 'submit' | 'reset' | 'button'
type TButtonVariant = 'accent' | 'primary' | 'transparent'

interface IProps {
  type?: TButtonType,
  variant?: TButtonVariant,
  outline?: boolean,
  fullWidth?: boolean,
  label?: string
}

const props = withDefaults(defineProps<IProps>(), {
	type: 'button',
	variant: 'primary',
	outline: false,
	fullWidth: false,
	label: ''
})


const styleClasses = computed((): TComputedStyle => {
	return [
		'flex justify-center items-center gap-x-2 font-medium transition-colors duration-150 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		{
			'w-full': props.fullWidth,
			'bg-white ring-1 px-4 py-2 shadow-sm ring-inset ring-crusta-400 text-crusta-400 hover:bg-crusta-500 hover:text-white focus-visible:outline-crusta-400': props.variant === 'accent' && props.outline,
			'bg-crusta-400 px-4 py-2 shadow-sm text-white hover:bg-crusta-500 focus-visible:outline-crusta-400': props.variant === 'accent',
			'bg-white ring-1 px-4 py-2 shadow-sm ring-inset ring-eastern-blue-600 text-eastern-blue-600 hover:bg-eastern-blue-700 hover:text-white focus-visible:outline-eastern-blue-600': props.outline,
			'bg-eastern-blue-600 px-4 py-2 shadow-sm text-white hover:bg-eastern-blue-700 focus-visible:outline-eastern-blue-600': props.variant !== 'accent' && !props.outline && props.variant !== 'transparent',
			'p-0 bg-transparent text-eastern-blue-600 text-xs w-max': props.variant === 'transparent'
		}
	]
})
</script>

<template>
  <button
    :type="type"
    :class="styleClasses"
  >
    <span v-if="$slots.iconLeft">
      <slot name="iconLeft" />
    </span>

    {{ label }}

    <span v-if="$slots.iconRight">
      <slot name="iconRight" />
    </span>
  </button>
</template>
