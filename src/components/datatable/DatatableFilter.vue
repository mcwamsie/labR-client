<script lang="ts" setup>
import {mdiMagnify} from "@mdi/js";
import {computed} from "vue";

const emit = defineEmits(["search", "refresh", "update:modelValue"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  }
})

</script>

<template>
  <form class="mb-3 w-full flex items-center justify-between" @submit.prevent="emit('search')">
    <div>
      <button @click="emit('refresh')" class="text-primary font-bold focus:outline-0" type="button">Refresh</button>
    </div>
    <div class="flex w-[300px] max-w-[300px]">
      <input
          id="datatable-search-input"
          v-model="model"
          aria-describedby="button-search"
          aria-label="Search"
          class="search-box"
          placeholder="Search"
          type="search"
      />
      <button class="search-box-btn" type="button">
        <svg-icon :path="mdiMagnify" :size="20" type="mdi"/>
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>
