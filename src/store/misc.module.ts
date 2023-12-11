import {Chart, MiscState} from "@/models/misc.models.ts";
import {handleErrors} from "@/lib.ts";
import userService from "@/services/user.service.ts";

const state: MiscState = {
    sidebarOpen: false,
    pageLoading: false,
    loading: false,
    chart: {
        patients: 0,
        tests: 0
    }
}
export default {
    namespaced: true,
    state,
    mutations: {
        toggleSidebarOpen: (state: MiscState) => state.sidebarOpen = !state.sidebarOpen,
        setSidebarOpen: (state: MiscState, val: boolean) => state.sidebarOpen = val,
        setPageLoading: (state: MiscState, val: boolean) => state.pageLoading = val,
        setChart: (state: MiscState, val: Chart) => state.chart = val,
        setLoading: (state: MiscState, val: boolean) => state.loading = val
    },
    getters: {
        sidebarOpen: (state: MiscState) => state.sidebarOpen,
        pageLoading: (state: MiscState) => state.pageLoading,
        chart: (state: MiscState) => state.chart
    },
    actions: {
        toggleSidebar: ({commit}: any) => {
            commit("toggleSidebarOpen")
        },
        getChart: async ({commit}) => {
            try {
                commit("setLoading", true)
                let charts: Chart = await userService.chart()
                commit("setChart", charts)
            } catch (e) {
                handleErrors(e)
            } finally {
                commit("setLoading", false)
            }
        }
    }
}
