import axios from "axios";
import router from "@/router";
import store from "@/store";
import {API_HOST} from "./constants";

let API_BASE_URL = API_HOST + "/api/v1/";

const config = {
    baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
    }
}

//console.log(config)
/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const client = axios.create(config)

/**
 let token = authToken()
 if (token)
 client.defaults.headers.Authorization = `Bearer ${token}`
 else delete client.defaults.headers.Authorization

 */

client.interceptors.request.use(
    config => {
        let auth = JSON.parse(localStorage.getItem("tokens"));


        if (auth && auth.access) {
            config.headers = {
                Authorization: `Bearer ${auth.access}`,

            };
        }
        return config;
    },
    error => {
        console.log(error)
        //  Promise.reject(error.response || error.detail);
    }
);

client.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    let auth = JSON.parse(localStorage.getItem('tokens'));

    let originalRequest = error.config;

    if (error.response && error.response.data) {
        if (error.response.status === 403) {
            if (auth && auth.refresh) {

                try {
                    let res = await axios.post(`${API_BASE_URL}authentication/token/refresh/`, {refresh: auth.refresh})
                    let {refresh, access} = res.data
                    auth = {...auth, refresh, access}
                    localStorage.setItem("tokens", JSON.stringify(auth));
                    originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`
                    let response = await axios(originalRequest)
                    return Promise.resolve(response)

                } catch (e: any) {
                    if (e.response.status === 401) {
                        await store.dispatch("auth/logout")
                        let currentPage = router.currentRoute.value.path
                        return await router.push("/auth/login?next=" + currentPage)
                    } else if (e.response.status === 500) {
                        let {detail} = e.response.data
                        if (detail) return Promise.reject(detail)
                        else return Promise.reject("Oops Something Went Wrong, Refresh");
                    } else if (e.response.status === 422)
                        return Promise.reject(e.response.data)
                    return Promise.reject(e.response.data);
                }

                // alert("You are not authorized");
                //
            }
        } else if (error.response.status === 500) {
            let {detail} = error.response.data
            if (detail) return Promise.reject(detail)
            else return Promise.reject("Oops Something Went Wrong, Refresh");
        }
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

export default client
