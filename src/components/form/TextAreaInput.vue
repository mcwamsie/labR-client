<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  rows: {
    type: [String, Number],
    default: 3
  },
  label: {
    type: [String, Boolean],
    required: true
  },
  inputType: {
    type: String,
    default: "text"
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  error: {
    type: [String, Array],
    required: false
  },
  mb0: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(["update:modelValue", "change-mode"])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const cssClasses = computed(() => {
  let classes = ""

  classes += props.mb0 ? " mb-0" : " mb-6"

  if (props.error) {
    classes += " has-error"
  }
  return classes
})
</script>

<template>
  <div :class="cssClasses" class="form-field">
    <textarea
        :id="id"
        v-model="model"
        :name="name"
        :rows="rows"
        class="form-input"
    />
    <fieldset>
      <legend class="form-legend">
        {{ label }} <span v-if="required" class="text-red-600">*</span>
      </legend>
    </fieldset>
    <span v-if="error" class="text-sm text-red-500 w-full block mt-1">
     {{ typeof error === 'string' ? error : error.join(" ") }}
    </span>
  </div>
</template>

<style scoped>

</style>
