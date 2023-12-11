import axiosConfig from "@/axiosConfig.ts";
import {PaginatedServiceProvider} from "@/models/service_provider.model.ts";

const getServiceProviders = async (page: number = 1, limit = 16, searchQuery?: string | null): Promise<PaginatedServiceProvider> => {

    let keys = {
        page, limit
    }
    if (searchQuery) {
        keys["search"] = searchQuery
    }
    let params = new URLSearchParams(keys).toString()
    let response = await axiosConfig.get("/parameters/service-providers?" + params)
    return response.data
}

export default {
    getServiceProviders
}
