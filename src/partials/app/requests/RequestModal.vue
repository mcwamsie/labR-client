<script lang="ts" setup>

import Modal from "@/components/misc/Modal.vue";
import {useStore} from "vuex";
import {computed, ComputedRef, Ref, ref, UnwrapRef, watch} from "vue";
import {isEmpty, titleCase} from "@/lib.ts";
import RequestForm from "@/partials/app/requests/RequestForm.vue";
import notification from "@/notyft.ts";
import {LabRequestForm} from "@/models/labRequest.model.ts";
import {AuthUser} from "@/models/auth.models.ts";
import {Patient} from "@/models/patient.model.ts";
import PatientProfileItem from "@/components/misc/PatientProfileItem.vue";
import ModalFooter from "@/components/misc/ModalFooter.vue";
import NonFieldError from "@/components/misc/NonFieldError.vue";

const store = useStore()
const open = computed(() => store.getters["labRequest/requestModalOpen"])
const heading = computed(() => store.getters["labRequest/requestModalHeading"])
const submitting = computed(() => store.getters["labRequest/submitting"])
const errors = computed(() => store.getters["labRequest/requestErrors"])
const record: ComputedRef<Patient> = computed(() => store.getters["patients/patientRecord"])
const user: ComputedRef<AuthUser> = computed(() => store.getters["auth/user"])

const form: Ref<UnwrapRef<LabRequestForm>> = ref({
  clinicalData: "",
  company: !isEmpty(user.value) ? user.value.company.id : "",
  patient: "",
  referredFrom: "",
  requestedTests: []
})

const handleClose = () => {
  handleReset()
  store.dispatch("labRequest/setRequestModalOpen", false)
  store.commit("labRequest/setRequestErrors", {})
  store.commit("labRequest/setRequestRecord", null)
}

const handleReset = () => {
  form.value = {
    clinicalData: "",
    company: !isEmpty(user.value) ? user.value.company.id : "",
    patient: "",
    referredFrom: "",
    requestedTests: []
  }
}

const handleSubmit = async () => {
  let response = await store.dispatch("labRequest/createOrUpdateLabRequest", form.value)
  if (response) {
    let message = !isEmpty(record.value) ? "Lab request details updated successfully" : "Lab requests added successfully"
    notification.success(message)
    handleReset()
    //await store.dispatch("patients/listPatients", {page: 1, limit: props.limit})
    await store.dispatch("labRequest/setRequestModalOpen", false)
  }
}

watch(() => record.value, (value) => {
  if (value) form.value.patient = value.id
})

watch(() => user.value, (value) => {
  if (!isEmpty(value)) form.value.company = value.company.id
})
</script>

<template>
  <modal :open="open" :title="heading" @close="handleClose" @submit="handleSubmit">
    <template v-slot:default>
      <patient-profile-item
          v-if="!isEmpty(record)"
          :date-of-birth="record.dateOfBirth"
          :name="`${titleCase(record.lastName)} ${titleCase(record.firstName)}`"
          :sex="record.sex"
      />
      <non-field-error
          v-if="errors.non_field_errors"
          :error="errors.non_field_errors"
      />
      <request-form :form="form"/>
    </template>
    <template v-slot:footer>
      <modal-footer :submitting="submitting"/>
    </template>
  </modal>
</template>
