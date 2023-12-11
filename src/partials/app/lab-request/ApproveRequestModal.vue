<script lang="ts" setup>

import ModalFooter from "@/components/misc/ModalFooter.vue";
import {computed, ComputedRef, onMounted, Ref, ref} from "vue";
import {useStore} from "vuex";
import Modal from "@/components/misc/Modal.vue";
import {DataResultItem, LabRequest, TestResultPayload} from "@/models/labRequest.model.ts";
import {formatDate, handleGetActiveRef} from "@/lib.ts";
import RequestParameterDatatableItem from "@/partials/app/lab-request/RequestParameterDatatableItem.vue";
import html2pdf from 'html2pdf.js';
import sweetAlert from "@/sweetAlert.ts";
import notification from "@/notyft.ts";
import {UserCompany} from "@/models/auth.models.ts";
import PrintRequestInformation from "@/partials/app/lab-request/PrintRequestInformation.vue";
import PrintHeader from "@/partials/app/lab-request/PrintHeader.vue";

const hasHeader = ref(false)

const store = useStore()
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])
const open: ComputedRef<boolean> = computed(() => store.getters["labRequest/approveModalOpen"])
const submitting: ComputedRef<boolean> = computed(() => store.getters["labRequest/submitting"])
const company: ComputedRef<UserCompany> = computed(() => store.getters["auth/company"])

const dataItems: Ref<DataResultItem[]> = ref([])
const handleUpdate = (value: {
  children: string[],
  value: string | number
}) => {

  if (dataItems.value) {
    for (let dataItem of dataItems.value) {
      if (dataItem) {
        for (let category of dataItem.categories) {
          for (let item of category.items) {
            if (value.children.includes(item.parameter.id)) {
              item.parentValue = value.value
            }
          }
        }
      }
    }

  }
}
const handleClose = () => {
  store.dispatch("labRequest/setApproveModalOpen", false)
}

const handleSubmit = async () => {
  let willConfirm = await sweetAlert.willSubmit("Are you sure you want to approve these results?")

  if (willConfirm.isConfirmed) {
    let message = await store.dispatch("labRequest/approveLabRequest", record.value.id)

    if (message) {
      notification.success(message)
      store.commit("labRequest/setApproveModalOpen", false)
      await store.dispatch("labRequest/getRequest", record.value.id)
    }
  }
}

const generatePDF = () => {
  const element = document.getElementById('result-print');
  html2pdf(element, {
    margin: 10,
    image: {type: 'jpeg', quality: 1},
    enableLinks: true,
    preview: true,
    jsPDF: {
      format: "a4"
    },
    html2pdf: {
      scale: 2,
      letterRendering: true,
      useCORS: true,
      logging: true
    }
  }).from(element).set({html2canvas: {scale: 2}}).save('my-pdf.pdf');
}


onMounted(() => {
  let data = []
  for (let requestedTest of record.value.requestedTests) {
    let recordedTest: TestResultPayload | null
    for (let test of record.value.recordedTests) {
      if (requestedTest.id === test.panel) {
        recordedTest = test
      }
    }

    if (recordedTest) {
      let dataItem: DataResultItem = {
        recordBy: recordedTest.recordBy,
        createdAt: recordedTest.createdAt,
        updatedAt: recordedTest.updatedAt,
        approvedBy: recordedTest.approvedBy,
        comment: recordedTest.comment,
        categories: []
      }
      let i = 0
      for (let p of requestedTest.parameters) {
        if (p.category) {
          let found = false
          for (let c of dataItem.categories) {
            if (c.name === p.category.name) {
              c.items.push({
                parameter: p,
                numberValue: recordedTest ? recordedTest.items[i].numberValue : "",
                comment: recordedTest ? recordedTest.items[i].comment : "",
                textValue: recordedTest ? recordedTest.items[i].textValue : "",
                percentage: "",
                activeRef: handleGetActiveRef(p.refRanges, record.value.patient.dateOfBirth),
              })
              found = true
            }
          }
          if (!found) dataItem.categories.push({
            name: p.category.name, items: [{
              parameter: p,
              numberValue: recordedTest ? recordedTest.items[i].numberValue : "",
              comment: recordedTest ? recordedTest.items[i].comment : "",
              textValue: recordedTest ? recordedTest.items[i].textValue : "",
              percentage: "",
              activeRef: handleGetActiveRef(p.refRanges, record.value.patient.dateOfBirth),
            }]
          })
        } else {
          let found = false
          for (let c of dataItem.categories) {
            if (c.name === "") {
              c.items.push({
                parameter: p,
                numberValue: recordedTest ? recordedTest.items[i].numberValue : "",
                comment: recordedTest ? recordedTest.items[i].comment : "",
                textValue: recordedTest ? recordedTest.items[i].textValue : "",
                percentage: "",
                activeRef: handleGetActiveRef(p.refRanges, record.value.patient.dateOfBirth),
              })
              found = true
            }
          }
          if (!found) dataItem.categories.push({
            name: "", items: [{
              parameter: p,
              numberValue: recordedTest ? recordedTest.items[i].numberValue : "",
              comment: recordedTest ? recordedTest.items[i].comment : "",
              textValue: recordedTest ? recordedTest.items[i].textValue : "",
              percentage: "",
              activeRef: handleGetActiveRef(p.refRanges, record.value.patient.dateOfBirth),
            }]
          })
        }
        i++
      }
      data.push(dataItem)

    } else data.push(null)

  }
  dataItems.value = data
  for (let dataItem of dataItems.value) {
    if (dataItem) {
      for (let category of dataItem.categories) {
        for (let item of category.items) {
          if (item.parameter.children) {
            handleUpdate({children: item.parameter.children.map((i) => (i.id)), value: item.numberValue})
          }
        }
      }
    }
  }

})
</script>

<template>
  <modal
      :full-screen="true"
      :open="open"
      :title=" record.status === 'approved' || record.status === 'collected' ? 'Print Result' : 'Approve Results'"
      @close="handleClose"
      @submit="handleSubmit"
  >
    <template v-slot:default>
      <div id="result-print" class="hidden lg:flex flex-grow flex-col">
        <template v-if="record.status === 'approved' || record.status === 'collected'">
          <div v-if="!hasHeader" :style="`height: ${company.customHeader}cm`"/>
          <print-header v-else/>
          <print-request-information :record="record"/>
        </template>
        <template v-for="(requestedTest, i) of record.requestedTests">
          <div v-if="dataItems[i]" class="text-[13px] mb-4 pb-6 border-b border-solid border-black">
            <div class="capitalize mb-6">
              <span class=" font-bold mr-2">Test Panel:</span>
              <span class="">{{ requestedTest.name }}</span>
            </div>
            <table class="w-full mb-6">
              <thead>
              <tr>
                <th class="text-left">Parameter</th>
                <th v-if="requestedTest.percentageColumn" class="text-left w-40">%</th>
                <th class="text-left pl-4">Result</th>

                <th v-if="requestedTest.indicationColumn" class="text-left">Flag</th>
                <th v-if="requestedTest.refColumn" class="text-left">Ref Interval</th>
                <th v-if="requestedTest.unitsColumn" class="text-left">Units</th>
                <th v-if="requestedTest.commentColumn" class="text-left">Comment</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="category of dataItems[i].categories">
                <template v-if="category.name">

                  <tr>
                    <td class="uppercase font-bold pt-6 pb-2">{{ category.name }}</td>
                  </tr>
                </template>

                <!-- dataItems[i].items -->
                <request-parameter-datatable-item
                    v-for="item of category.items"
                    :active="requestedTest"
                    :error="{}"
                    :input="false"
                    :item="item"
                />
              </template>

              </tbody>
            </table>
            <template v-if="requestedTest.defaultResultNotes">
              <span class="block font-bold mb-0">Interpretation:</span>
              <span
                  class="mb-4 block"
                  v-html="requestedTest.defaultResultNotes"
              />
            </template>
            <template v-if="dataItems[i].comment">
              <span class="block font-bold mb-2">Comment:</span>
              <span class="mb-4 block">{{ dataItems[i].comment }}</span>
            </template>
            <span v-if=" dataItems[i].recordBy" class="block">
              <span class="font-bold mr-2">Recorded By:</span>
            <span>{{ dataItems[i].recordBy.lastName }} {{ dataItems[i].recordBy.firstName }}
              ({{ dataItems[i].recordBy.position }}) - {{
                formatDate(dataItems[i].createdAt, "DD/MM/YYYY HH:mm")
              }} </span>
            </span>
            <span v-if=" dataItems[i].approvedBy" class="block">
              <span class="font-bold mr-2">Approved By:</span>
            <span>{{ dataItems[i].approvedBy.lastName }} {{ dataItems[i].approvedBy.firstName }}
              ({{ dataItems[i].approvedBy.position }}) - {{
                formatDate(dataItems[i].updatedAt, "DD/MM/YYYY HH:mm")
              }}</span>
            </span>
          </div>
        </template>
      </div>
      <div class="lg:hidden items-center justify-center flex flex-grow">
        This screen is not available on mobile devices
      </div>
    </template>
    <template v-slot:footer>
      <modal-footer v-if="record.status === 'approved' || record.status === 'collected'" :submitting="submitting">
        <div class="flex justify-between w-full">
          <label class="flex items-center">
            <input v-model="hasHeader" type="checkbox">
            <span class="font-bold ml-2">Print With Header</span>
          </label>
          <button
              class="w-[150px] flex justify-center disabled:opacity-80 disabled:cursor-progress disabled:bg-gray-500 items-center h-[40px] bg-primary text-[14px] text-white font-bold focus:bg-blue-700"
              type="button"
              @click="generatePDF">
            Generate PDF
          </button>
        </div>
      </modal-footer>
      <modal-footer v-else :submitting="submitting"/>
    </template>
  </modal>
</template>

<style scoped>

</style>
