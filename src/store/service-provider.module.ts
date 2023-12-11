import {PaginatedServiceProvider, ServiceProviderState} from "@/models/service_provider.model.ts";

const state: ServiceProviderState = {
    submitting: false,
    loading: false,
    serviceProviders: {
        next: null,
        previous: null,
        count: 0,
        results: []
    }
}
export default {
    namespaced: true,
    state,
    getters: {
        loading: (state: ServiceProviderState) => state.loading,
        submitting: (state: ServiceProviderState) => state.submitting,
        serviceProviders: (state: ServiceProviderState) => state.serviceProviders,
    },
    mutations: {
        setLoading: (state: ServiceProviderState, val: boolean) => state.loading = val,
        setSubmitting: (state: ServiceProviderState, val: boolean) => state.submitting = val,
        setServiceProvider: (state: ServiceProviderState, val: PaginatedServiceProvider) => state.serviceProviders = val,
    },
    actions: {}
}
