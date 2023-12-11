<script lang="ts" setup>
import FormInput from "@/components/form/FormInput.vue";

import {computed, ComputedRef, ref} from "vue";
import {PatientFormErrors} from "@/models/patient.model.ts";
import {useStore} from "vuex";
import SelectInput from "@/components/form/SelectInput.vue";
//
//import {sexOptions} from "@/constants.ts";
const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})
const sexOptions = ref([
  {id: "U", text: "--------"},
  {id: "M", text: "Male"},
  {id: "F", text: "Female"},
])
const idTypeOptions = ref([
  {id: "ID", text: "National ID No."},
  {id: "PS", text: "Passport No."},
  {id: "PH", text: "Phone Number"},
])
const store = useStore()
const errors: ComputedRef<PatientFormErrors> = computed(() => store.getters["patients/patientErrors"])
const idLabel = computed(() => {
  switch (props.form.national_type) {
    case "ID":
      return "National Id No."
    case "PS":
      return "Passport No."
    case "PH":
      return "Phone No. (Id No.)"
  }
})
</script>

<template>
  <select-input
      id="sex"
      v-model="form.national_type"
      :mb0="false"
      :options="idTypeOptions"
      :error="errors.national_type"
      :required="true"
      label="ID Type"
      name="national_type"
  />

  <form-input
      id="nationalId"
      v-model="form.idNumber"
      :error="errors.idNumber"
      :required="true"
      :label="idLabel"
      name="nationalId"
  />
  <form-input
      id="firstName"
      v-model="form.firstName"
      :error="errors.firstName"
      :required="true"
      label="First Name"
      name="firstName"
  />
  <form-input
      id="otherName"
      v-model="form.otherName"
      :error="errors.otherNames"
      :required="false"
      label="Middle Name"
      name="otherName"
  />
  <form-input
      id="lastName"
      v-model="form.lastName"
      :error="errors.lastName"
      :required="true"
      label="Surname"
      name="lastName"
  />
  <select-input
      id="sex"
      v-model="form.sex"
      :mb0="false"
      :options="sexOptions"
      :error="errors.sex"
      :required="true"
      label="Sex"
      name="sex"
  />
  <form-input
      id="dateOfBirth"
      v-model="form.dateOfBirth"
      :error="errors.dateOfBirth"
      :required="true"
      input-type="date"
      label="Date Of Birth"
      name="dateOfBirth"
  />
  <form-input
      id="phoneNumber1"
      v-model="form.phoneNumber1"
      :error="errors.phoneNumber1"
      :required="true"
      label="Phone Number"
      input-type="tel"
      name="phoneNumber1"
  />
  <form-input
      id="emailAddress"
      :error="errors.emailAddress"
      v-model="form.emailAddress"
      :required="false"
      label="Email Address"
      input-type="email"
      name="emailAddress"
  />

</template>

<style scoped>

</style>
