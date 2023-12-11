export interface ServiceProvider {
    id: string
    createdAt: string,
    updatedAt: string,
    afhozNo: string,
    name: string,
    address?: string,
    cityTown?: string
    province?: string,
    telephone?: string,
    emailAddress?: string,
    status: "A" | "S" | "D",
    requireReferral: boolean,
    type?: string,
    isSelf: boolean
}

export interface PaginatedServiceProvider {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: ServiceProvider[]
}

export interface ServiceProviderState {
    loading: boolean,
    submitting: boolean,
    serviceProviders: PaginatedServiceProvider,
}
