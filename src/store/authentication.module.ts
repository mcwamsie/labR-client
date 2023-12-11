import userService from '@/services/user.service';
import {getLoginFormErrors} from "@/lib";
import {AuthState, AuthTokens, AuthUser, LoginForm} from "@/models/auth.models.ts";


const storageToken: string | null = localStorage.getItem("tokens")
const tokens: AuthTokens | any = JSON.parse(storageToken);
const storageUser = localStorage.getItem("user")
const user: AuthUser | any = JSON.parse(storageUser)


const initialState: AuthState = {tokens, user, errors: {}, loading: false}
export default {
    namespaced: true,
    state: initialState,
    getters: {
        company: (state: AuthState) => state.user?.company,
        user: (state: AuthState) => state.user,
        tokens: (state: AuthState) => state.tokens,
        errors: (state: AuthState) => state.errors,
        loading: (state: AuthState) => state.loading,
    },
    actions: {
        login: async ({commit}: any, payload: LoginForm) => {
            try {
                commit("setLoading", true)
                commit("setErrors", {})
                let tokens = await userService.login(payload)
                localStorage.setItem("tokens", JSON.stringify(tokens))
                commit("setTokens", tokens)
                return tokens
            } catch (e) {
                commit("setErrors", getLoginFormErrors(e))
            } finally {
                commit("setLoading", false)
            }
        }
        ,
        profile: async ({commit}: any) => {
            try {
                commit("setLoading", true)
                let user = await userService.profile()
                localStorage.setItem("user", JSON.stringify(user))
                commit("setUser", user)
                return tokens
            } catch (e) {
                commit("setErrors", getLoginFormErrors(e))
            } finally {
                commit("setLoading", false)
            }
        },
        logout: async ({commit}: any) => {
            userService.logout();
            commit('setTokens', null);
            commit('setUser', null);

        }
    },
    mutations: {
        setLoading: (state: AuthState, val: boolean) => state.loading = val,
        setErrors: (state: AuthState, val: object) => state.errors = val,
        setTokens: (state: AuthState, val: AuthTokens) => state.tokens = val,
        setUser: (state: AuthState, val: AuthUser) => state.user = val
    }
}
