<script lang="ts" setup>

import AppLayout from "@/layout/AppLayout.vue";
import {mdiTestTube} from "@mdi/js";
import PageHeader from "@/components/misc/PageHeader.vue";
import LabRequestLeftSide from "@/partials/app/lab-request/LabRequestLeftSide.vue";
import {useStore} from "vuex";
import {computed, ComputedRef, onBeforeUnmount, onMounted, Ref, ref, UnwrapRef, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {handleGetActiveRef, isEmpty} from "@/lib.ts";
import DatatableLoading from "@/components/datatable/DatatableLoading.vue";
import LabRequestRightSide from "@/partials/app/lab-request/LabRequestRightSide.vue";
import LabRequestTopNav from "@/partials/app/lab-request/LabRequestTopNav.vue";
import {LabRequest, TestResultPayload, TestResultPayloadItem, TestResultsForm} from "@/models/labRequest.model.ts";
import {TestPanel} from "@/models/test_panel.model.ts";
import sweetAlert from "@/sweetAlert.ts";
import ApproveRequestModal from "@/partials/app/lab-request/ApproveRequestModal.vue";
import notification from "@/notyft.ts";

const activeIndex = ref(0)
const store = useStore()
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])
const active: ComputedRef<TestPanel> = computed(() => store.getters["labRequest/requestActive"])
const loading: ComputedRef<boolean> = computed(() => store.getters["labRequest/loading"])
//const loading = computed(()=> true)
const route = useRoute()


const form: Ref<UnwrapRef<TestResultsForm>> = ref({
  id: "",
  request: record.value ? record.value.id : "",
  panel: "",
  comment: "",
  items: []
})

const handleSubmit = async () => {
  let willConfirm = await sweetAlert.willSubmit("Are you sure you want to submit the results?")

  if (willConfirm.isConfirmed) {
    let items: TestResultPayloadItem[] = form.value.items.map((i) => ({
      numberValue: i.numberValue,
      textValue: i.textValue,
      flag: i.flag,
      comment: i.comment,
      parameter: i.parameter.id
    }))

    let payload: TestResultPayload = {
      comment: form.value.comment,
      request: form.value.request,
      panel: form.value.panel,
      items: items
    }
    let id: string | undefined = form.value.id

    let response = await store.dispatch("labRequest/createOrUpdateLabResult", {payload, id})

    if (response) {
      let message = form.value.id ? "Test result created successfully" : "Test result updated successfully"
      notification.success(message)
      await store.dispatch("labRequest/getRequest", record.value.id)
    }
  }
}

watch(() => active.value, (value: TestPanel) => {
  form.value.panel = value.id

  let recordedTest: TestResultPayload | null
  for (let test of record.value.recordedTests) {
    if (active.value.id === test.panel) recordedTest = test
  }
  form.value.id = recordedTest ? recordedTest.id : ""
  form.value.comment = recordedTest ? recordedTest.comment : ""
  form.value.items = value.parameters.map((item, i) => ({
    parameter: item,
    numberValue: recordedTest ? recordedTest.items[i].numberValue : "",
    comment: recordedTest ? recordedTest.items[i].comment : "",
    //parentValue: "",
    textValue: recordedTest ? recordedTest.items[i].textValue : "",
    //flag: "",
    units: "",
    percentage: "",
    activeRef: handleGetActiveRef(item.refRanges, record.value.patient.dateOfBirth)
  }))
  for (let item of form.value.items) {
    if (item.parameter.children) {
      handleUpdate({children: item.parameter.children.map((i) => (i.id)), value: item.numberValue})
    }
  }
  store.commit("labRequest/setRequestErrors", {})
})

const handleUpdate = (value: { children: string[], value: string | number }) => {
  for (let item of form.value.items) {
    if (value.children.includes(item.parameter.id)) {
      item.parentValue = value.value
    }

  }
}

watch(() => record.value, (value) => {
  if (value) {
    if (value.requestedTests.length) store.commit("labRequest/setRequestActive", value.requestedTests[0])

    form.value.request = value.id
    let activeTest: TestPanel = value.requestedTests.length ? value.requestedTests[0] : null

    for (let recordedTest of value.recordedTests) {
      //console.log(recordedTest.panel, active.value.id)
      if (recordedTest.panel === activeTest.id) {
        form.value.comment = recordedTest.comment
        form.value.panel = recordedTest.panel
        form.value.comment = recordedTest.comment
        form.value.items = !isEmpty(activeTest) ? activeTest.parameters.map((item, i) => ({
          parameter: item,
          numberValue: recordedTest.items[i].numberValue,
          comment: recordedTest.items[i].comment,
          textValue: recordedTest.items[i].textValue,
          flag: recordedTest.items[i].flag,
          units: "",
          percentage: "",
          activeRef: handleGetActiveRef(item.refRanges, record.value.patient.dateOfBirth),
        })) : []
      }
    }

    for (let item of form.value.items) {
      if (item.parameter.children) {
        handleUpdate({children: item.parameter.children.map((i) => (i.id)), value: item.numberValue})
      }
    }
  }
})

onMounted(async () => {
  let router = useRouter()
  let route = useRoute()
  let {id} = route.params
  await store.dispatch("labRequest/getRequest", id)
  if (isEmpty(record.value)) return router.push("/app/requests")


  if (record.value.requestedTests.length) store.commit("labRequest/setRequestActive", record.value.requestedTests[0])

  if (active.value) {
    let recordedTest: TestResultPayload | null
    for (let test of record.value.recordedTests) {
      if (active.value.id === test.panel) {
        recordedTest = test
      }
    }
    form.value.id = recordedTest ? recordedTest.id : ""
    form.value.comment = recordedTest ? recordedTest.comment : ""
    form.value.items = active.value ? active.value.parameters.map((item, i) => ({
      parameter: item,
      numberValue: recordedTest ? recordedTest.items[i].numberValue : "",
      comment: recordedTest ? recordedTest.items[i].comment : "",
      //parentValue: "",
      textValue: recordedTest ? recordedTest.items[i].textValue : "",
      //flag: "",
      // units: "",
      percentage: "",
      activeRef: handleGetActiveRef(item.refRanges, record.value.patient.dateOfBirth),
    })) : []

    for (let item of form.value.items) {
      if (item.parameter.children) {
        handleUpdate({children: item.parameter.children.map((i) => (i.id)), value: item.numberValue})
      }
    }
  }


})


onBeforeUnmount(() => {
  store.commit("labRequest/setRequestRecord", null)
  store.commit("labRequest/setRequestActive", null)
  store.commit("labRequest/setRequestErrors", {})
})

</script>

<template>
  <app-layout>
    <template v-slot:body>
      <lab-request-top-nav/>
      <div class="p-4 flex flex-col flex-grow gap-4 max-h-full overflow-hidden">
        <page-header
            :icon="mdiTestTube"
            heading="Lab Request"
            sub-heading="Overview"
        />
        <form class="flex gap-4 max-h-full overflow-hidden flex-grow" novalidate @submit.prevent="handleSubmit">
          <datatable-loading v-if="loading"/>
          <template v-else>
            <lab-request-left-side v-if="!isEmpty(record)"/>
            <lab-request-right-side
                v-if="!isEmpty(record)"
                :active-index="activeIndex"
                :form="form"
                @update:activeIndex="(val)=>activeIndex = val"
            />
          </template>
        </form>
      </div>
    </template>
    <template v-slot:modal>
      <approve-request-modal v-if="record"/>
    </template>
  </app-layout>
</template>

<style scoped>

</style>
