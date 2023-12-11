<script lang="ts" setup>

import EmptyRows from "@/components/misc/EmptyRows.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import {isEmpty} from "@/lib.ts";
import {TestResultItem} from "@/models/labRequest.model.ts";
import RequestParameterDatatableItem from "@/partials/app/lab-request/RequestParameterDatatableItem.vue";

const props = defineProps<{ items: TestResultItem[] }>()
const store = useStore()

const active = computed(() => store.getters["labRequest/requestActive"])
const errors = computed(() => store.getters["labRequest/requestErrors"])
const columns = computed(() => {
  let items = 3
  if (!isEmpty(active.value)) {
    if (active.value.refColumn) items += 1
    if (active.value.indicationColumn) items += 1
    if (active.value.percentageColumn) items += 1
    if (active.value.unitsColumn) items += 1
  }
  return items
})

const handleUpdate = (value: { children: string[], value: string | number }) => {
  for (let item of props.items) {
    if (value.children.includes(item.parameter.id))
      item.parentValue = value.value
  }
}
</script>

<template>
  <div v-if="!isEmpty(active)" class="data-table striped form">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Parameter</th>
        <th v-if="active.percentageColumn" class="w-40">%</th>
        <th>Result</th>
        <th v-if="active.indicationColumn">Flag</th>
        <th v-if="active.refColumn">Ref Interval</th>
        <th v-if="active.unitsColumn">Units</th>
        <th v-if="active.commentColumn">Comment</th>
      </tr>
      </thead>
      <tbody>
      <request-parameter-datatable-item
          v-for="(item, index) of items"
          :active="active"
          :error="errors.items ? errors.items[index] : null"
          :item="item"
          :input="true"
          @update="handleUpdate"
      />
      <empty-rows
          v-if="items.length< 16"
          :col-span="columns"
          :size="16 - items.length"
      />
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
