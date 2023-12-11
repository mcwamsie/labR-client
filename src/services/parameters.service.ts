import axiosConfig from "@/axiosConfig.ts";
import {PaginatedTestPanel} from "@/models/test_panel.model.ts";

const getAllTestPanels = async (page: number = 1, limit = 16, searchQuery?: string | null): Promise<PaginatedTestPanel> => {

    let keys = {
        page, limit
    }
    if (searchQuery) {
        keys["search"] = searchQuery
    }
    let params = new URLSearchParams(keys).toString()
    let response = await axiosConfig.get("/parameters/test-panels?" + params)
    return response.data
}

export default {
    getAllTestPanels
}
