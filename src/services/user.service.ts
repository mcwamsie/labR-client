import axiosConfig from "@/axiosConfig"
import {AuthTokens, AuthUser, LoginForm} from "@/models.ts";
import {Chart} from "@/models/misc.models.ts";

async function login(payload: LoginForm): Promise<AuthTokens> {
    let response = await axiosConfig.post("/authentication/login/", payload)
    return response.data
}

async function profile(): Promise<AuthUser> {
    let response = await axiosConfig.get("/authentication/profile/")
    return response.data
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear()
}

async function chart(): Promise<Chart> {
    let response = await axiosConfig.get("/config/chart")
    return response.data
}


export default {
    login,
    logout,
    profile,
    chart
};
