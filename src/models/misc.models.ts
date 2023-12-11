export interface SelectOptions {
    id: string | number,
    text: string | number
}

export enum Title {
    Mr = "MR", Mrs = "Mrs", Ms = "Ms", Miss = "Miss", Dr = "Dr",
    Hon = "Hon", Prof = "Prof", Sir = "Sir", U = "U"
}

export enum Sex {
    M = "M", F = "F", U = "U"
}

export enum National_ID_Type {
    ID = "ID", PS = "PS", SU = "SU", PH = "PH", UN = "UN"
}

export enum BloodType {
    C = "C", I = "I", H = "H", B = "B", A = "A", U = "U"
}

export enum MaritalStatus {
    M = "M", S = "S", D = "D", W = "W", E = "E", L = "L", C = "C", U = "U"
}

export interface Chart {
    patients: string | number
    tests: string | number
}

export interface MiscState {
    sidebarOpen: boolean,
    pageLoading: boolean,
    loading: boolean,
    chart: Chart
}
