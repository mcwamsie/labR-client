import {BloodType, MaritalStatus, National_ID_Type, Sex, Title} from "@/models/misc.models.ts";


export interface PaginatorParams {
    page: number,
    limit?: number,
    search?: string
}

export interface Patient {
    id?: string,
    plan?: object,
    plan_id?: string,
    title?: Title,
    idNumber: string,
    national_type: National_ID_Type,
    nationality?: string,
    firstName: string
    otherName?: string,
    lastName: string,
    sex: Sex,
    dateOfBirth: string,
    maritalStatus?: MaritalStatus,
    religion?: string,
    bloodType?: BloodType,
    homeAddress?: string
    cityOrTown?: string
    province?: string,
    emailAddress?: string,
    phoneNumber1: string,
    phoneNumber2?: string,
    phoneNumber3?: string,
    membershipNumber?: string
    dependantCode?: number | string
}

export interface PaginatedPatients {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: Patient[]
}


export interface PatientFormErrors {
    non_field_errors?: string | unknown[],
    idNumber?: string | unknown[],
    national_type?: string | unknown[],
    firstName?: string | unknown[],
    lastName?: string | unknown[],
    otherNames?: string | unknown[],
    sex?: string | unknown[],
    emailAddress?: string | unknown[],
    phoneNumber1?: string | unknown[],
    dateOfBirth?: string | unknown[],
}

export interface PatientFormState {
    errors: PatientFormErrors,
    record?: Patient | null
}

export interface PatientState {
    loading: boolean,
    submitting: boolean,
    patientModalOpen: boolean,
    patientModalHeading: string,
    patients: PaginatedPatients,
    patient: PatientFormState,
}


