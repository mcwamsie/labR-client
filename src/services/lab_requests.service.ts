import axiosConfig from "@/axiosConfig.ts";
import {LabRequest, LabRequestForm, PaginatedLabRequests, TestResultPayload} from "@/models/labRequest.model.ts";

const getAllRequests = async (page: number = 1, limit = 16, searchQuery?: string | null, pending?: string | null): Promise<PaginatedLabRequests> => {

    let keys: { page: number, limit: number, search?: string } = {
        page, limit
    }
    if (searchQuery) keys["search"] = searchQuery;
    if (pending) keys["pending"] = 1;
    let params = new URLSearchParams(keys).toString()
    let response = await axiosConfig.get("/patients/lab-requests?" + params)
    return response.data
}

const getRequest = async (id: string): Promise<LabRequest> => {
    let response = await axiosConfig.get("/patients/lab-requests/" + id)
    return response.data
}
const createNewRequest = async (data: LabRequestForm): Promise<string> => {
    let response = await axiosConfig.post("/patients/lab-requests", data)
    return response.data.message
}
const updateRequest = async (id: string, data: LabRequestForm): Promise<LabRequest> => {
    let response = await axiosConfig.patch("/patients/lab-requests/" + id, data)
    return response.data
}
const approveRequest = async (id: string): Promise<string> => {
    let response = await axiosConfig.put("/patients/lab-requests/" + id)
    return response.data.message
}
const collectResult = async (id: string): Promise<string> => {
    let response = await axiosConfig.post("/patients/lab-requests/" + id)
    return response.data.message
}

const createNewResult = async (data: TestResultPayload): Promise<string> => {
    let response = await axiosConfig.post("/patients/lab-results", data)
    return response.data
}

const updateResult = async (data: TestResultPayload, id: string): Promise<string> => {
    let response = await axiosConfig.patch("/patients/lab-results/" + id, data)
    return response.data
}


export default {
    getAllRequests,
    createNewRequest,
    updateRequest,
    getRequest,
    approveRequest,
    collectResult,

    createNewResult,
    updateResult
}
