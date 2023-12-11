/* Test Parameters  */
import {TestResultCategory} from "@/models/labRequest.model.ts";

export interface Specimen {
    name: string
}

export interface Department {
    name: string
}

export interface ParameterDropdownValue {
    id: string
    createdAt: string
    updatedAt: string
    value: string
    parameter: string

}

export interface ParameterRefRange {
    id: string
    createdAt: string
    updatedAt: string
    ageLower: number
    ageUpper: number

    generalNormalLower: number
    generalNormalUpper: number
    generalAbnormalLower: number
    generalAbnormalUpper: number

    maleNormalLower: number
    maleNormalUpper: number
    maleAbnormalLower: number
    maleAbnormalUpper: number

    femaleNormalLower: number
    femaleNormalUpper: number
    femaleAbnormalLower: number
    femaleAbnormalUpper: number

    parameter: string
}

export interface TestParameter {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    ordinal: number
    units?: string
    dataType: "T" | "N" | "S"
    required: boolean
    decimalPlace: number
    panel: string
    category?: TestResultCategory
    percentageOf: string,
    children: TestParameter[]
    refRanges: ParameterRefRange[]
    dropdownValues: ParameterDropdownValue[]
}

export interface TestPanel {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    shortName?: string
    percentageColumn: boolean
    indicationColumn: boolean
    unitsColumn: boolean
    commentColumn: boolean
    refColumn: boolean
    isInUse: boolean
    canBePrintedWithOthers: boolean
    needCulture: boolean
    department?: Department
    specimen: Specimen
    parameters: TestParameter[],
    defaultResultNotes?: string
}

export interface PaginatedTestPanel {
    count: number
    next?: string | null
    previous?: string | null
    results: TestPanel[]
}

export interface ParameterState {
    loading: boolean
    submitting: boolean
    testPanels: PaginatedTestPanel
}
