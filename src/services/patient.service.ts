import axiosConfig from "@/axiosConfig.ts";
import {PaginatedPatients, Patient} from "@/models/patient.model.ts"

const createNewPatient = async (data: Patient): Promise<string> => {
    let response = await axiosConfig.post("/patients/patients", data)
    return response.data
}
const updatePatient = async (id: string, data: Patient): Promise<string> => {
    let response = await axiosConfig.patch("/patients/patients/" + id, data)
    return response.data
}

const getAllPatients = async (page: number = 1, limit = 16, searchQuery?: string | null): Promise<PaginatedPatients> => {

    let keys = {
        page, limit
    }
    if (searchQuery) {
        keys["search"] = searchQuery
    }
    let params = new URLSearchParams(keys).toString()
    let response = await axiosConfig.get("/patients/patients?" + params)
    return response.data
}


export default {
    createNewPatient,
    getAllPatients,
    updatePatient,


}

