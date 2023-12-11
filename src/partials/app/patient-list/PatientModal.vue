<script lang="ts" setup>

import Modal from "@/components/misc/Modal.vue";
import {useStore} from "vuex";
import {computed, ComputedRef, ref, watch} from "vue";
import PatientForm from "@/partials/app/patient-list/PatientForm.vue";
import {Patient, PatientFormErrors} from "@/models/patient.model";
import notification from "@/notyft.ts";
import NonFieldError from "@/components/misc/NonFieldError.vue";
import {isEmpty, titleCase} from "@/lib.ts";
import {BloodType, MaritalStatus, National_ID_Type, Sex, Title} from "@/models/misc.models.ts";
import ModalFooter from "@/components/misc/ModalFooter.vue";
import PatientProfileItem from "@/components/misc/PatientProfileItem.vue";

const props = defineProps({
  limit: {
    type: [Number, String],
    required: true
  },
})
const store = useStore()

const open: ComputedRef<boolean> = computed(() => store.getters["patients/patientModalOpen"])
const heading: ComputedRef<string> = computed(() => store.getters["patients/patientModalHeading"])
const errors: ComputedRef<PatientFormErrors> = computed(() => store.getters["patients/patientErrors"])
const record: ComputedRef<Patient> = computed(() => store.getters["patients/patientRecord"])
const submitting: ComputedRef<boolean> = computed(() => store.getters["patients/submitting"])

const handleClose = () => {
  store.dispatch("patients/setPatientModalOpen", false)
  store.commit("patients/setErrors", {})
  store.commit("patients/setRecord", null)
  handleReset()
}

const form = ref<Patient>({
  "plan_id": "",
  "title": Title.U,
  "idNumber": "",
  "national_type": National_ID_Type.ID,
  "nationality": "Zimbabwean",
  "firstName": "",
  "otherName": "",
  "lastName": "",
  "sex": Sex.U,
  "dateOfBirth": "",
  "maritalStatus": MaritalStatus.U,
  "religion": "",
  "bloodType": BloodType.U,
  "homeAddress": "",
  "cityOrTown": "",
  "province": "",
  "emailAddress": "",
  "phoneNumber1": "",
  "phoneNumber2": "",
  "phoneNumber3": "",
  "membershipNumber": "",
  "dependantCode": ""
})

const handleReset = () => {
  form.value = {
    "plan_id": "",
    "title": Title.U,
    "idNumber": "",
    "national_type": National_ID_Type.ID,
    "nationality": "Zimbabwean",
    "firstName": "",
    "otherName": "",
    "lastName": "",
    "sex": Sex.U,
    "dateOfBirth": "",
    "maritalStatus": MaritalStatus.U,
    "religion": "",
    "bloodType": BloodType.U,
    "homeAddress": "",
    "cityOrTown": "",
    "province": "",
    "emailAddress": "",
    "phoneNumber1": "",
    "phoneNumber2": "",
    "phoneNumber3": "",
    "membershipNumber": "",
    "dependantCode": ""
  }
}
const handleSubmit = async () => {
  let response = await store.dispatch("patients/createOrUpdatePatient", form.value)
  if (response) {
    let message = !isEmpty(record.value) ? "Patient details updated successfully" : "Patient added successfully"
    notification.success(message)
    handleReset()
    await store.dispatch("patients/getPatients", {page: 1, limit: props.limit})
    await store.dispatch("patients/setPatientModalOpen", false)
  }
}

watch(() => record.value, (value) => {

  if (value) {
    if (value.plan) delete value.plan
    form.value = value //console.log("record", value)
  }
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
      <patient-form
          :form="form"
      />
      <!--
 <pre><code>form:{{ form }}</code></pre>
 --->
    </template>
    <template v-slot:footer>
      <modal-footer :submitting="submitting"/>
    </template>
  </modal>

</template>

<style scoped>

</style>
