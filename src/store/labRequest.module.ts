import {
    LabRequest,
    LabRequestForm,
    LabRequestFormErrors,
    LabRequestState,
    PaginatedLabRequests,
    TestResultPayload
} from "@/models/labRequest.model.ts";
import {PatientState} from "@/models/patient.model.ts";
import {getFormErrors, handleErrors} from "@/lib.ts";
import lab_requestsService from "@/services/lab_requests.service.ts";
import {TestPanel} from "@/models/test_panel.model.ts";

const state: LabRequestState = {
    loading: false,
    submitting: false,
    requestModalOpen: false,
    approveModalOpen: false,
    requestModalHeading: "New Request",
    labRequests: {
        "count": 0, "next": null, "previous": null, "results": []
    },
    request: {
        errors: {}, record: null, active: null
    }
}
export default {
    namespaced: true, state, getters: {
        // loading
        loading: (state: PatientState) => state.loading,
        submitting: (state: PatientState) => state.submitting,
        labRequests: (state: LabRequestState) => state.labRequests,
        requestModalHeading: (state: LabRequestState) => state.requestModalHeading,
        requestModalOpen: (state: LabRequestState) => state.requestModalOpen,
        approveModalOpen: (state: LabRequestState) => state.approveModalOpen,

        // requests
        requestErrors: (state: LabRequestState) => state.request.errors,
        requestRecord: (state: LabRequestState) => state.request.record,
        requestActive: (state: LabRequestState) => state.request.active,

    }, mutations: {
        setLoading: (state: LabRequestState, val: boolean) => state.loading = val,
        setSubmitting: (state: LabRequestState, val: boolean) => state.submitting = val,

        // modal
        setRequestModalHeading: (state: LabRequestState, val: string) => state.requestModalHeading = val,
        setRequestModalOpen: (state: LabRequestState, val: boolean) => state.requestModalOpen = val,

        // requests
        setRequestErrors: (state: LabRequestState, val: LabRequestFormErrors) => state.request.errors = val,
        setRequestRecord: (state: LabRequestState, val: LabRequest | null) => state.request.record = val,
        setRequestActive: (state: LabRequestState, val: TestPanel | null) => state.request.active = val,

        // Lab request
        setLabRequests: (state: LabRequestState, val: PaginatedLabRequests) => state.labRequests = val,
        setApproveModalOpen: (state: LabRequestState, val: boolean) => state.approveModalOpen = val,
    }, actions: {
        setRequestModalOpen: ({commit}: any, value: boolean) => commit("setRequestModalOpen", value),
        setApproveModalOpen: ({commit}: any, value: boolean) => commit("setApproveModalOpen", value),
        getRequests: async ({commit}: any, {page, limit, searchQuery, pending}) => {
            try {
                commit("setLoading", true)
                let requests: PaginatedLabRequests = await lab_requestsService.getAllRequests(page, limit, searchQuery, pending)
                commit("setLabRequests", requests)
            } catch (e) {
                handleErrors(e)
            } finally {
                commit("setLoading", false)
            }
        },
        getRequest: async ({commit}: any, id: string) => {
            try {
                commit("setRequestRecord", null)
                commit("setLoading", true)
                let request: LabRequest = await lab_requestsService.getRequest(id)

                commit("setRequestRecord", request)
            } catch (e) {
                handleErrors(e)
            } finally {
                commit("setLoading", false)
            }
        }, //
        createOrUpdateLabRequest: async ({commit, getters}: any, payload: LabRequestForm) => {
            try {
                commit("setSubmitting", true)
                commit("setRequestErrors", {})
                let record = getters["patientRecord"]
                if (record) return await lab_requestsService.updateRequest(record.id, payload)
                return await lab_requestsService.createNewRequest(payload)
            } catch (e) {
                commit("setRequestErrors", getFormErrors(e))
            } finally {
                commit("setSubmitting", false)
            }
        },
        createOrUpdateLabResult: async ({commit}: any, {payload, id}: { payload: TestResultPayload, id: string }) => {
            try {
                commit("setSubmitting", true)
                commit("setRequestErrors", {})
                if (id) return await lab_requestsService.updateResult(payload, id)
                return await lab_requestsService.createNewResult(payload)
            } catch (e) {
                commit("setRequestErrors", getFormErrors(e))
            } finally {
                commit("setSubmitting", false)
            }
        },
        approveLabRequest: async ({commit}, id: string): Promise<string> => {
            try {
                commit("setSubmitting", true)
                return await lab_requestsService.approveRequest(id)
            } catch (e) {
                handleErrors(e)
            } finally {
                commit("setSubmitting", false)
            }
        },
        collectResult: async ({commit}, id: string): Promise<string> => {
            try {
                commit("setLoading", true)
                return await lab_requestsService.collectResult(id)
            } catch (e) {
                handleErrors(e)
            } finally {
                commit("setLoading", false)
            }
        }
    }
}
