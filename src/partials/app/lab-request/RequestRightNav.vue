<script lang="ts" setup>

defineProps({
  modelValue: {type: [Number, String], required: true},
  needsCulture: {type: Boolean, required: true}
})
const emit = defineEmits(["update:modelValue"])

const handleChange = (value: number) => {
  emit("update:modelValue", value)
}
</script>

<template>
  <ul class="flex">
    <li :class="modelValue === 0 ? 'border-b-2 border-solid border-primary':''" class="py-2 px-6 text-sm">
      <button class="text-primary cursor-pointer" @click="handleChange(0)">Parameters</button>
    </li>
    <li :class="modelValue === 1 ? 'border-b-2 border-solid border-primary':''" class="py-2 px-6 text-sm">
      <button :disabled="!needsCulture" class="text-primary cursor-pointer disabled:text-slate-500"
              @click="handleChange(1)">Culture
      </button>
    </li>
  </ul>
</template>

<style scoped>

</style>
