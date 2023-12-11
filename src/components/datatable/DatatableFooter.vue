<script lang="ts" setup>
import {computed} from "vue";

const emit = defineEmits(["update:limit", "next", "previous"])
const props = defineProps({
  limit: {
    type: [Number, String],
    required: true
  },
  filteredCount: {
    type: [Number],
    required: true
  },
  count: {
    type: [Number, String],
    required: true
  },
  page: {
    type: [Number, String],
    required: true
  },
  next: String,
  previous: String,
})

const limitModel = computed({
  get() {
    return props.limit
  },
  set(value) {
    emit("update:limit", value)
  }
})

const startIndex = computed(() => {
  if (props.filteredCount > 0)
    return (parseInt(<string>props.page) - 1) * parseInt(<string>props.limit) + 1
  else return 0
})

const endIndex = computed(() => {
  if (props.filteredCount > 0)
    return (startIndex.value - 1) + props.filteredCount
  else return 0
})

</script>

<template>

  <div
      class="flex mt-2 w-full md:flex-row justify-between items-center  text-sm flex-col leading-[1.6]  border-neutral-200 dark:border-neutral-500 bg-white">
    <div>

    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-4 order-3 md:order-none">
        <p class="font-light ">Rows per page:</p>
        <div class="w-[70px] ">
          <div>
            <select v-model="limitModel" class="select h-[40px] focus:outline-0">
              <option value="10">10</option>
              <option value="16">16</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
      </div>
      <div class="font-normal order-2 mb-3 md:order-none md:mb-0 ">{{ startIndex }} - {{ endIndex }} of {{
          count
        }}
      </div>
      <div class="order-1 my-3 md:order-none md:my-0 md:pr-1">
        <button
            :disabled="!previous"
            class="inline-block rounded-none p-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 disabled:text-slate-300 disabled:hover:bg-transparent"
            @click="emit('previous')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.75 19.5L8.25 12l7.5-7.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        <button :disabled="!next"
                class="inline-block rounded-none p-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 disabled:text-slate-300 disabled:hover:bg-transparent"
                @click="emit('next')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>
