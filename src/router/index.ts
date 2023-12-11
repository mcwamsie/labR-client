import {createRouter, createWebHistory, Router} from "vue-router";
import auth from "./auth";
import {isEmpty} from "@/lib";
import store from "@/store";

const router: Router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                name: 'home',
                redirect: "/app/home"
            },
            {
                path: "/auth",
                children: auth
            },
            {
                path: "/app",
                children: [
                    {
                        path: "patients",
                        component: () => import("@/pages/app/PatientListPage.vue")
                    },
                    {
                        path: "requests",
                        component: () => import("@/pages/app/LabRequestListPage.vue")
                    },
                    {
                        path: "requests/record/:id",
                        component: () => import("@/pages/app/RequestRecordPage.vue")
                    },
                    {
                        path: "home",
                        component: () => import("@/pages/app/HomePage.vue")
                    }
                ]
            }

        ]
    }
)

router.beforeEach(async (to, from, next) => {
    const publicPages = [
        "/auth/login",
        "/terms-and-conditions",
        "/public/prescription"
    ]
    const authRequired = !publicPages.includes(to.path)
    const tokens = localStorage.getItem("tokens")
    //const tokens = store.getters["auth/tokens"]
    const user = store.getters["auth/user"]
    //console.log("From:", from.path, "To:", to.path)
    if (authRequired) {
        if (isEmpty(tokens)) {
            //  return await store.dispatch("auth/logout")
            return next("/auth/login?next=" + to.path)
        }

        store.commit("misc/setSidebarOpen", false)
        if (to.name) store.commit("misc/setPageLoading", true)
        if (isEmpty(user)) {
            console.log("Getting User information")
            await store.dispatch("auth/profile")
        }

    } else {
        if (tokens)
            return next("/app/home")
    }


    next()

})

router.beforeResolve((to, from, next) => {
    if (to.name) store.commit("misc/setPageLoading", true)
    next()
})

router.afterEach(() => {
    store.commit("misc/setPageLoading", false)
})
export default router
