import {createStore} from "vuex";
import miscModule from "./misc.module.ts";
import patientModule from "./patient.module.ts";
import authenticationModule from "./authentication.module.ts";
import parametersModules from "@/store/parameters.module.ts";
import LabRequestModule from "@/store/labRequest.module.ts";

const store = createStore({
    modules: {
        misc: miscModule,
        patients: patientModule,
        auth: authenticationModule,
        parameters: parametersModules,
        labRequest: LabRequestModule
    }
})

export default store
