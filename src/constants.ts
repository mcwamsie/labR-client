//export const API_HOST = "http://192.168.193.49:9321"
//export const API_HOST = "http://127.0.0.1:9321"
export const API_HOST = import.meta.env.VITE_BASE_URL
export const APP_URL = import.meta.env.VITE_APP_URL
export const SECUGEN_CAPTURE_URL = import.meta.env.SECUGEN_CAPTURE_URL
export const API_BASE_URL = API_HOST + "/api/v1"
//export const API_HOST = "http://192.168.0.176:9321"
// "http://192.168.193.49:9321"

export const DEFAULT_PAGE_LIMIT = 16
export const TITLES = [
    {id: "U", text: "--------"},
    {id: "Mr", text: "Mr."},
    {id: "Mrs", text: "Mrs."},
    {id: "Ms", text: "Ms."},
    {id: "Miss", text: "Miss."},
    {id: "Dr", text: "Dr."},
    {id: "Hon", text: "Hon."},
    {id: "Prof", text: "Prof."},
    {id: "Sir", text: "Sir."},
]
export const RELIGIONS = [
    {id: "U", text: "--------"},
    {id: "C", text: "Christianity"},
    {id: "I", text: "Islam"},
    {id: "H", text: "Hinduism"},
    {id: "B", text: "Buddhism"},
    {id: "A", text: "African Tradition"},

]
export const sexOptions = [
    {id: "U", text: "--------"},
    {id: "M", text: "Male"},
    {id: "F", text: "Female"},
]

export const BLOOD_TYPES = [
    {id: "U", text: "--------"},
    {id: "A", text: "A"},
    {id: "B", text: "B"},
    {id: "AB", text: "AB"},
    {id: "O", text: "O"},
]
export const ID_TYPES = [
    {id: "ID", text: "National ID (Default)"},
    {id: "PS", text: "Passport Number"},
    {id: "SU", text: "Suffix Parent ID Number"},
    {id: "PH", text: "Phone Number"},
]

export const MARITAL_STATUSES = [
    {id: "U", text: "--------"},
    {id: "M", text: "Married"},
    {id: "S", text: "Single"},
    {id: "D", text: "Divorced"},
    {id: "W", text: "Widowed"},
    {id: "E", text: "Separated"},
    {id: "L", text: "Life Partner"},
    {id: "C", text: "Cohabiting"},

]

export const ACCOUNT_CATEGORIES = [
    {
        id: 0,
        text: "Assets",
        children: [
            //  {id:'A',text:'Assets'},
            {id: 'fixed asset', text: 'Fixed Assets'},
            {id: 'cash', text: 'Cash'},
            {id: 'bank', text: 'Bank'},
            {id: 'account receivable', text: 'Accounts Receivable'},
            {id: 'non current asset', text: 'Non Current Assets'}
        ]
    },

    {
        id: 1,
        text: "Liabilities",
        children: [
            //  {id:"L", text: "Liabilities"},
            {id: "current liabilities", text: "Current Liabilities"},
            {id: "account payable", text: "Accounts Payable"},
            {id: "credit card", text: "Credit Card"},
        ]
    },
    {
        id: 2,
        text: "Income",
        children: [
            // {id:"I", text: "Income"},
            {id: "operating income", text: "Operating Income"},
            {id: "other income", text: "Other Income"},
            {id: "discount received", text: "Discount Received"},
        ]
    },

    {
        id: 3,
        text: "Expenses",
        children: [
            // {id:"E", text: "Expenses"},
            {id: "cost of goods sold", text: "Cost Of Goods Sold"},
            {id: "operating expenses", text: "Operating Expense"},
            {id: "other expenses", text: "Other Expense"},
            {id: "discount allowed", text: "Discount Allowed"},
        ]
    },
    {
        id: 4,
        text: "Equity",
        children: [
            {id: "equity", text: "Equity"}
        ]
    }
]

export const PATIENT_KIN_RELATIONSHIP = [
    {id: "", text: "--------"},
    {id: "spouse", text: "SPOUSE"},
    {id: "partner", text: "PARTNER"},
    {id: "sibling", text: "SIBLING"},
    {id: "child", text: "CHILD"},
    {id: "parent", text: "PARENT"},
    {id: "relative", text: "RELATIVE"},
    {id: "neighbour", text: "NEIGHBOUR"},
    {id: "workmate", text: "WORKMATE"},
    {id: "other", text: "OTHER"},
    {id: "undefined", text: "UNDEFINED"},
]

export const CHANGEABLE_UNITS = [
    {id: "D", text: "DAYS"},
    {id: "H", text: "HOURS"},
    {id: "K", text: "KILOMETERS"},
    {id: "M", text: "MINUTES"},
    {id: "S", text: "SECONDS"},
    {id: "U", text: "UNITS"}
]

export const SERVICE_TYPE = [
    {id: "T", text: "TARIFF CODE"},
    {id: "M", text: "MODIFIER"}
]


export const getInvoiceColor = (status) => {
    switch (status) {
        case "down payment":
            return "badge-primary"
        case "paid":
            return "badge-success"
        case "waiting for payment":
            return "badge-warning"
        case "unpaid":
            return "badge-dark"
        case "overdue":
            return "badge-danger"
        default:
            return "badge-secondary"
    }
}
