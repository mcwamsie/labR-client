import {createApp} from 'vue'
import App from '@/App.vue'
import '@/main.css'
import router from "@/router"
import AppLayout from "@/layout/AppLayout.vue";
import SvgIcon from "vue3-icon";
import store from "@/store";
import Multiselect from "@/components/form/MultiSelect/Multiselect.vue";
//import 'tailwindcss/tailwind.css';

createApp(App)
    .use(store)
    .use(router)
    .component('multiselect', Multiselect)
    .component("svg-icon", SvgIcon)
    .component("app-layout", AppLayout)
    .mount('#app')
