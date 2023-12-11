<script lang="ts" setup>
import {useStore} from "vuex";
import {PaginatedPatients, Patient} from "@/models/patient.model.ts";
import {computed, ComputedRef} from "vue";
import {formatDate, getIDType, getSex, titleCase, uppercase} from "@/lib";
import EmptyRows from "@/components/misc/EmptyRows.vue";

const store = useStore()
const data: ComputedRef<PaginatedPatients> = computed(() => store.getters["patients/patients"])

const handleEdit = (record: Patient) => {
  store.commit("patients/setRecord", record)
  store.commit("patients/setPatientModalOpen", true)
  store.commit("patients/setPatientModalHeading", `Edit Patient: ${titleCase(record.firstName)} ${titleCase(record.lastName)}`)
}

const handleNewRequest = (record: Patient) => {
  store.commit("patients/setRecord", record)
  store.commit("labRequest/setRequestModalOpen", true)
}
</script>

<template>

  <div class="data-table striped">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Sex</th>
        <th>Date Of Birth</th>
        <th>Phone Number</th>
        <th>ID Number</th>
        <th>ID Number Type</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="patient of data.results">
        <td class="w-[50px]">
          <button
              class="ml-2 mr-5 text-primary font-bold"
              @click="handleEdit(patient)"
          >
            Edit
          </button>
          <button
              class="mr-2 text-primary font-bold"
              @click="handleNewRequest(patient)"
          >
            New Request
          </button>
        </td>
        <td>
          {{ titleCase(patient.lastName) }}
          {{ titleCase(patient.firstName) }}
          {{ patient.otherName ? titleCase(patient.otherName) : "" }}
        </td>
        <td>
          {{ titleCase(getSex(patient.sex)) }}
        </td>
        <td class="text-right">
          {{ uppercase(formatDate(patient.dateOfBirth, "DD/MM/YYYY")) }}
        </td>
        <td class="text-right">
          {{ patient.phoneNumber1 }}
        </td>
        <td class="text-right">
          {{ uppercase(patient.idNumber) }}
        </td>
        <td>
          {{ getIDType(patient.national_type) }}
        </td>
      </tr>
      <empty-rows
          v-if="data.results.length < 16"
          :col-span="7"
          :size="16 - data.results.length"
      />
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>
