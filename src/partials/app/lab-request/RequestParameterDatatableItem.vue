<script lang="ts" setup>

import {useStore} from "vuex";
import {computed, ComputedRef, watch} from "vue";
import {TestPanel} from "@/models/test_panel.model.ts";
import {isEmpty, roundToDp, titleCase} from "@/lib.ts";
import {LabRequest, TestResultItem} from "@/models/labRequest.model.ts";
import {Sex} from "@/models/misc.models.ts";
import TestFlag from "@/components/misc/TestFlag.vue";

const emit = defineEmits(["update"])
const props = defineProps<{
  active: TestPanel,
  item: TestResultItem,
  error?: string | object,
  input?: boolean
}>()
const store = useStore()

//const active: ComputedRef<TestPanel> = computed(() => store.getters["labRequest/requestActive"])
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])

let {sex} = record.value.patient

watch(() => props.item.numberValue, (value) => {
  if (value) {
    if (props.item.parameter.children) {
      emit("update", {
        children: props.item.parameter.children.map((i) => (i.id)),
        value
      })
    }
    if (props.item.parentValue) props.item.percentage = roundToDp(parseFloat(<string>value) / parseFloat(<string>props.item.parentValue) * 100, 2);
    else props.item.percentage = null;
  } else {
    if (props.item.parameter.children) {
      emit("update", {
        children: props.item.parameter.children.map((i) => (i.id)),
        value: null
      })
    }
    props.item.percentage = null
    props.item.flag = null
  }
})

const percentage = computed(() => {
  if (props.item.parentValue) {
    if (props.item.numberValue) {
      return roundToDp(parseFloat(<string>props.item.numberValue) / parseFloat(<string>props.item.parentValue) * 100, 2)
    } else props.item.percentage = null
  } else return null

})
/*
watch(() => props.item.parentValue, (value) => {
  if (value) {
    if (props.item.numberValue) {
      props.item.percentage = roundToDp(parseFloat(<string>props.item.numberValue) / parseFloat(<string>value) * 100, 2)
    } else props.item.percentage = null
  } else props.item.percentage = null

})

 */
</script>

<template>

  <tr>
    <td v-if="input" class="w-[20px]">
      <span v-if="!isEmpty(error)" class="w-2 h-2 bg-red-700 block"></span>
    </td>
    <td :class="input ? 'w-[200px] font-bold' : 'w-[200px]'" class="p-0">
      {{ item.parameter.name }}
    </td>
    <td v-if="active.percentageColumn" :class="input? 'w-[50px] text-right p-0' : 'text-left pr-4'">
      <template v-if="item.parameter.percentageOf">
        <template v-if="percentage">
          {{ percentage }}%
        </template>
      </template>
    </td>

    <td v-if="input" :class="!isEmpty(error) ? 'error': ''" class="p-0 w-[200px] bg-blue-50">
      <select
          v-if="item.parameter.dataType === 'S'"
          v-model="item.textValue"
      >
        <option v-for="value of item.parameter.dropdownValues" :value="value.value">
          {{ titleCase(value.value) }}
        </option>
      </select>
      <input
          v-else-if="item.parameter.dataType === 'N'"
          v-model="item.numberValue"
          type="number"
      />
      <input
          v-else
          v-model="item.textValue"
          type="text"
      >
    </td>
    <td v-else class="pl-4">
      {{ item.numberValue ? item.numberValue : item.textValue }}
    </td>

    <td v-if="active.indicationColumn" :class="input ? 'text-left': 'text-left'" class="w-56  p-0">
      <template v-if="item.numberValue">
        <template v-if="item.activeRef">
          <template v-if="record.patient.sex ===Sex.M">
            <template v-if="item.activeRef.maleNormalUpper && item.activeRef.maleNormalLower">
              <template v-if="item.activeRef.maleNormalLower > parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="L"/>
              </template>
              <template v-else-if="item.activeRef.maleNormalUpper < parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="H"/>
              </template>
              <template v-else>
                <test-flag :show-icon="input"/>
              </template>
            </template>
            <template v-else>
              <template v-if="item.activeRef.generalNormalLower > parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="L"/>
              </template>
              <template v-else-if="item.activeRef.generalNormalUpper < parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="H"/>
              </template>
              <template v-else>
                <test-flag :show-icon="input"/>
              </template>
            </template>
          </template>
          <template v-if="record.patient.sex ===Sex.F">
            <template v-if="item.activeRef.femaleNormalUpper && item.activeRef.femaleNormalLower">
              <template v-if="item.activeRef.femaleNormalLower > parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="L"/>
              </template>
              <template v-else-if="item.activeRef.femaleNormalUpper < parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="H"/>
              </template>
              <template v-else>
                <test-flag :show-icon="input"/>
              </template>
            </template>
            <template v-else>
              <template v-if="item.activeRef.generalNormalLower > parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="L"/>
              </template>
              <template v-else-if="item.activeRef.generalNormalUpper < parseFloat(<string>item.numberValue)">
                <test-flag :show-icon="input" flag="H"/>
              </template>
              <template v-else>
                <test-flag :show-icon="input"/>
              </template>
            </template>
          </template>
        </template>
      </template>
    </td>
    <td v-if="active.refColumn" :class="input ? 'w-150 text-center p-0': 'w-150'">
      <template v-if="item.activeRef">
        <template v-if="record.patient.sex ===Sex.M">
          <template v-if="item.activeRef.maleNormalUpper && item.activeRef.maleNormalLower">
            {{ `${item.activeRef.maleNormalLower} - ${item.activeRef.maleNormalUpper}` }}
          </template>
          <template v-else>
            {{ `${item.activeRef.generalNormalLower} - ${item.activeRef.generalNormalUpper}` }}
          </template>
        </template>

        <template v-else-if="record.patient.sex ===Sex.F">
          <template v-if="item.activeRef.femaleNormalLower && item.activeRef.femaleNormalUpper ">
            {{ `${item.activeRef.femaleNormalLower} - ${item.activeRef.femaleNormalUpper}` }}
          </template>
          <template v-else>
            {{ `${item.activeRef.generalNormalLower} - ${item.activeRef.generalNormalUpper}` }}
          </template>

        </template>


      </template>
    </td>
    <td v-if="active.unitsColumn" :class="input ?`text-center p-0`: 'text-left'">
      {{ item.parameter.units }}
    </td>
    <template v-if="active.commentColumn">
      <td v-if="input" class="bg-blue-50 p-0">
        <input v-model="item.comment">
      </td>
      <template v-else>
        {{ item.comment }}
      </template>
    </template>

  </tr>

</template>

<style scoped>

</style>
