import {PaginatedTestPanel, ParameterState} from "@/models/test_panel.model.ts";
import {handleErrors} from "@/lib.ts";
import parametersService from "@/services/parameters.service.ts";

const state: ParameterState = {
    loading: false,
    submitting: false,
    testPanels: {
        "count": 0,
        "next": null,
        "previous": null,
        "results": []
    }
}
export default {
    namespaced: true,
    state,
    getters: {
        testPanels: (state: ParameterState) => state.testPanels
    },
    mutations: {
        setTestPanels: (state: ParameterState, val: PaginatedTestPanel) => state.testPanels = val,
        setLoading: (state: ParameterState, val: boolean) => state.loading = val,
        setSubmitting: (state: ParameterState, val: boolean) => state.submitting = val
    },
    actions: {
        getTestPanels: async ({commit}: any, {page, limit, searchQuery}) => {
            try {
                commit("setLoading", true)
                let testPanels: PaginatedTestPanel = await parametersService.getAllTestPanels(page, limit, searchQuery)
                localStorage.setItem("testPanels", JSON.stringify(testPanels))
                commit("setTestPanels", testPanels)
            } catch (e) {
                console.log(e)
                handleErrors(e)
            } finally {
                commit("setLoading", false)
            }
        }
    }
}
