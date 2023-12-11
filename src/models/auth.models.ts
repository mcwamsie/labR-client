export interface AuthTokens {
    refresh: string,
    access: string
}

export interface AuthUser {
    firstName: string,
    lastName: string,
    company: UserCompany,
    canApproveLabRequests: boolean,
    canRecordLabRequests: boolean,
    canRegisterPatients: boolean,
    position: string
}

export interface UserCompany {
    id: string,
    createdAt?: string
    updatedAt?: string
    name: string
    accountNoPrefix?: string,
    logo?: string,
    stamp?: string,
    signature?: string,
    addressLine1: string,
    addressLine2?: string,
    addressLine3?: string
    contactPersonName?: string,
    contactPersonMobile?: string,
    contactPersonEmail?: string,
    mobile: string,
    telephone: string
    email: string,
    status: boolean,
    isTest: boolean,
    parent: string,
    customHeader: number
}

export interface AuthState {
    tokens?: AuthTokens | null | undefined,
    user?: AuthUser | null | undefined,
    errors: object,
    loading: boolean
}

export interface LoginForm {
    username: string,
    password: string
}
