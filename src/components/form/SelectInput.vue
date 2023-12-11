<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Array],
    required: true
  },
  label: {
    type: [String, Boolean],
    required: true
  },
  inputType: {
    type: String,
    default: "text"
  },
  many: {
    type: Boolean,
    default: false
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
  options: {
    type: Object,
    default: []
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
  <div class="form-field" :class="cssClasses">
    {{}}
    <select
        :id="id"
        :name="name"
        class="form-input"
        :multiple="many"
        v-model="model"
    >
      <option
          v-for="option of options"
          :value="option.id"
      >
        {{ option.text }}
      </option>
    </select>
    <fieldset>
      <legend class="form-legend">
        {{ label }} <span v-if="required" class="text-red-600">*</span>
      </legend>
    </fieldset>
    <span class="text-[12px] mt-4" v-if="many">
      Hold down “Control”, or “Command” on a Mac, to select more than one.
    </span>
    <span v-if="error" class="text-sm text-red-500 w-full block mt-1">
     {{ typeof error === 'string' ? error : error.join(" ") }}
    </span>
  </div>
</template>

<style scoped>

</style>
