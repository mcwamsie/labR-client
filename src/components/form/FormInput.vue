<script setup lang="ts">
import {computed} from "vue";
import {mdiEyeOffOutline, mdiEyeOutline} from "@mdi/js"

const props = defineProps({
  modelValue: {
    type: String,
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
  password: {
    type: Boolean,
    default: false
  }
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
    <input
        :id="id"
        :name="name"
        :type="inputType"
        class="form-input"
        :class="password ? 'password' : ''"
        v-model="model"
    >
    <button v-if="password" type="button" @click="emit('change-mode')"
            class="w-[40px] h-[40px] flex justify-center items-center top-[8px] absolute right-0 text-slate-800">
      <svg-icon
          type="mdi"
          :path="inputType !== 'password' ?mdiEyeOffOutline : mdiEyeOutline"
          :size="20"/>
    </button>
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
