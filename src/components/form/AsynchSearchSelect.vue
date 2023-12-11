<script lang="ts" setup>
import {computed, ref, watch} from "vue";

const props = defineProps({
  asyncFind: {
    type: Function,
    required: true
  },
  modelValue: {
    type: [String, Array],
    required: true
  },
  label: {
    type: [String, Boolean],
    required: true
  },
  many: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    default: []
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
const emit = defineEmits(["update:modelValue"])

const value = ref(null)
const loading = ref(false)

watch(() => value.value, (value) => {
  if (value) {
    if (props.many)
      emit('update:modelValue', value.map((i) => (i.id)))
    else emit('update:modelValue', value.id)
  } else {
    if (props.many) emit('update:modelValue', "")
    else emit("update:modelValue", [])
  }
})

watch(() => props.modelValue, (val) => {
  if (val) {
    for (let option of props.options) {
      if (option.id === val) value.value = option
    }
  } else {
    value.value = null
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
    <multiselect
        v-model="value"
        :allow-empty="false"
        :multiple="many"
        :loading="loading"
        :options="options"
        placeholder="Type to search"
        :searchable="true"
        :max-height="240"
        deselect-label="Can't remove this value"
        label="text"
        track-by="id"
        @search-change="asyncFind"
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
