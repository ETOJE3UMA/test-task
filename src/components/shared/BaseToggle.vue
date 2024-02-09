<script setup lang="ts">
interface IProps {
  modelValue: boolean
}

withDefaults(defineProps<IProps>(), {
	modelValue: false
})

const emit = defineEmits(['update:modelValue'])

function handleChange(event: Event): void {
	const target = event.target as HTMLInputElement

	emit('update:modelValue', target.checked)
}
</script>

<template>
  <div>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        :checked="modelValue"
        type="checkbox"
        class="sr-only peer"
        @change="handleChange"
      >
      <div class="w-11 h-6 bg-base-500 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-eastern-blue-600" />
    </label>
  </div>
</template>
