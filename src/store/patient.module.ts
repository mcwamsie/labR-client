import {PaginatedPatients, Patient, PatientState} from "@/models/patient.model.ts";
import {getFormErrors, handleErrors} from "@/lib.ts";
import patientService from "@/services/patient.service.ts";

const state: PatientState = {
    loading: false,
    submitting: false,
    patientModalOpen: false,
    patientModalHeading: "New Patient",
    patients: {
        "count": 0,
        "next": null,
        "previous": null,
        "results": []
    },
    patient: {
        errors: {},
        record: null
    },
}
export default {
    namespaced: true,
    state,
    mutations: {
        //loading
        setLoading: (state: PatientState, val: boolean) => state.loading = val,
        setSubmitting: (state: PatientState, val: boolean) => state.submitting = val,

        // modals
        setPatientModalOpen: (state: PatientState, val: boolean) => state.patientModalOpen = val,
        setPatientModalHeading: (state: PatientState, val: string) => state.patientModalHeading = val,


        // patients
        setErrors: (state: PatientState, val: object) => state.patient.errors = val,
        setRecord: (state: PatientState, val: Patient | null) => state.patient.record = val,
        setPatients: (state: PatientState, val: PaginatedPatients) => state.patients = val,


    },
    getters: {
        // loading
        loading: (state: PatientState) => state.loading,
        submitting: (state: PatientState) => state.submitting,
        // modals
        patientModalOpen: (state: PatientState) => state.patientModalOpen,
        patientModalHeading: (state: PatientState) => state.patientModalHeading,

        // patients
        patientErrors: (state: PatientState) => state.patient.errors,
        patientRecord: (state: PatientState) => state.patient.record,
        patients: (state: PatientState) => state.patients,

    },
    actions: {
        setPatientModalOpen: ({commit}: any, value: boolean) => commit("setPatientModalOpen", value),
        setRequestModalOpen: ({commit}: any, value: boolean) => commit("setRequestModalOpen", value),
        setPatientModalHeading: ({commit}: any, value: boolean) => commit("setPatientModalHeading", value),

        // patient
        createOrUpdatePatient: async ({commit, getters}: any, payload: Patient) => {
            try {
                commit("setSubmitting", true)
                commit("setErrors", {})
                let record = getters["patientRecord"]
                if (record)
                    return await patientService.updatePatient(record.id, payload)
                return await patientService.createNewPatient(payload)
            } catch (e) {
                commit("setErrors", getFormErrors(e))
            } finally {
                commit("setSubmitting", false)
            }
        },

        getPatients: async ({commit}: any, {page, limit, searchQuery}) => {
            try {
                commit("setLoading", true)
                let patients: PaginatedPatients = await patientService.getAllPatients(page, limit, searchQuery)
                commit("setPatients", patients)
            } catch (e) {
                handleErrors(e)
            } finally {
                commit("setLoading", false)
            }
        }
    }
}
