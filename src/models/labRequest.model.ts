import {ParameterRefRange, TestPanel, TestParameter} from "@/models/test_panel.model.ts";
import {Patient} from "@/models/patient.model.ts";
import {ServiceProvider} from "@/models/service_provider.model.ts";
import {AuthUser} from "@/models/auth.models.ts";

type LabRequestStatus = "new" | "waiting" | "for sample" | "in progress" | "waiting approval" | "approved" | "collected"

export interface LabRequest {
    id: string,
    createdAt: string
    number: string
    updatedAt: string
    status: LabRequestStatus,
    clinicalData: string
    patient: Patient,
    company: string
    referredFrom: ServiceProvider,
    requestedTests: TestPanel[],
    requestedTestsCount: number,
    recordedTestsCount: number,
    recordedTests: TestResultPayload[],
    collectionTime?: string
}

export interface LabRequestForm {
    clinicalData: string
    company: string
    patient: string,
    referredFrom: string,
    requestedTests: string[]
}

export interface PaginatedLabRequests {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: LabRequest[]
}

export interface LabRequestFormErrors {
    non_field_errors?: string | unknown[],
    patient?: string | unknown[],
    company?: string | unknown[],
    referredFrom?: string | unknown[],
    requestedTests?: string | unknown[],
    clinicalData?: string | unknown[]
}

export interface LabRequestFormState {
    errors: LabRequestFormErrors,
    record?: LabRequest | null,
    active?: TestPanel | null,
}

export interface LabResultErrors {

}

export interface TestResultCategory {
    id: string,
    name?: string
}

export interface LabRequestState {
    loading: boolean,
    submitting: boolean,
    labRequests: PaginatedLabRequests,
    request: LabRequestFormState,
    requestModalOpen: boolean,
    approveModalOpen: boolean,
    requestModalHeading: string,
}

export interface TestResultItem {
    parameter: TestParameter,
    numberValue?: number | string,
    textValue?: string,
    flag?: "L" | "H" | "",
    percentage?: string | number,
    parentValue?: string | number,
    units?: string,
    comment: string,
    activeRef?: ParameterRefRange,
}

export interface TestResultsForm {
    id?: string,
    request: string,
    panel: string,
    comment: string,
    items: TestResultItem[]
}

export interface DataResultCategory {
    name: string
    items: TestResultItem[],
}

export interface DataResultItem {
    createdAt: string,
    updatedAt: string,
    categories: DataResultCategory[]
    recordBy: AuthUser
    approvedBy?: AuthUser
    comment?: string
}

export interface TestResultPayloadItem {
    flag: "L" | "H" | "";
    textValue: string;
    parameter: string;
    comment: string;
    numberValue: number | string
}

export interface TestResultPayload {
    id?: string,
    items: TestResultPayloadItem[],
    comment: string,
    request: string,
    panel: string,
    recordBy?: AuthUser
    approvedBy?: AuthUser,
    createdAt?: string
    updatedAt?: string
}
