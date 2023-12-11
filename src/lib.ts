import moment from "moment";
import notification from "./notyft.js";
import {ParameterRefRange} from "@/models/test_panel.model.ts";

export const formatDate = (date: string, format = "DD/MMM/YYYY HH:mm") => {
    if (date) {
        return moment(date).format(format);
    } else return "----------"
}

export const formatMoney = (amount: string, currency = "USD") => {
    if (currency === "ZAR") return parseFloat(amount)
        .toLocaleString('en-ZA', {style: 'currency', currency: currency});
    if (currency === "ZWL") return parseFloat(amount)
        .toLocaleString('en-ZW', {style: 'currency', currency: "ZWL"});
    return parseFloat(amount)
        .toLocaleString('en-US', {style: 'currency', currency: currency});
}


export const handleNestedName = (item: any, parentKey = "parent", previousName = "",): string | any => {
    if (isEmpty(item[parentKey])) {
        let name = titleCase(item.name)
        if (previousName !== "") name += " / " + previousName
        return name
    } else {

        let name = titleCase(item.name)
        if (previousName !== "") name += " / " + previousName
        return handleNestedName(item[parentKey], parentKey, name)
    }
}

export const formatLocalDate = (date: string) => {
    if (date) {
        return new Date(date).toLocaleDateString();
    } else return "----------"
}

export const formatLocalDateTime = (date: string) => {
    if (date) {
        return new Date().toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    } else return "----------"
}


export const titleCase = (value: string) => {
    if (value) {
        return value.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
        /*
        let sentence = value.toLowerCase().split(" ");

        //sentence = sentence.split(".");
        for (let i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" ")
         */

    }
}
export const uppercase = (value: string) => {
    if (value) return value.toUpperCase();
}

export const lowercase = (value: string) => {
    if (value) return value.toLowerCase();
}

export function camelCaseToTitleCaseWords(camelCaseWord: string) {
    const words = camelCaseWord.split(/(?=[A-Z])/)
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
}

export const handleErrors = (e: { detail?: string, message?: string } | string) => {

    if (typeof e === "object") {
        if (Object.keys(e).includes("detail")) {
            notification.error(e.detail)
        }
        if (Object.keys(e).includes("message")) {
            notification.error(e.message)
        }
    } else if (typeof e === "string") {
        notification.error(e);
    } else {
        notification.error("Oops Something Went Wrong, Refresh And Retry")
    }

}

export function generateRandomString(length = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return [...Array(length)].map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function generateRandomNumber(length: number = 10) {
    const chars = "0123456789";
    return [...Array(length)].map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export const generateRandomDatedNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1; // Months are zero-indexed
    const day = today.getDate();

    month = month < 10 ? "0" + month : month
    return `${year}${month}${day}-` + generateRandomString(5)
}

export const getFormErrors = (data: any) => {
    //console.log(data)
    let errors = {}
    if (typeof data === "string") {
        notification.error(data)
    } else if (Object.keys(data).includes("detail")) {
        notification.error(data.detail)
    } else if (Object.keys(data).includes("errors")) {

        if (Array.isArray(data.errors)) {
            errors = data.errors
        } else {
            errors = {}
            for (let k of Object.keys(data.errors)) {

                if (Array.isArray(data.errors[k])) {
                    errors[k] = data.errors[k]
                } else if (typeof data.errors[k] === "string") {
                    errors[k] = data.errors[k]
                } else {
                    if (Object.keys(data.errors[k]).includes("non_field_errors")) {
                        errors[k] = data.errors[k].non_field_errors
                    }
                }
            }
        }

    } else if (Object.keys(data).length > 0) {
        errors = data
    } else {
        notification.error("Oops Something Went Wrong, Refresh And Retry")
        //console.log(data)
    }
    return errors
}

export const getLoginFormErrors = (data: { detail: string } | string) => {
    let errors = {}
    if (typeof data === "string") {
        notification.error(data)
    } else if (Object.keys(data).includes("detail")) {
        notification.error(data.detail)
    } else {
        errors = data
    }
    return errors
}

export const emptyArray = (size: number | string) => {
    let array = [];
    for (let i = 0; i < parseInt(<string>size); i++) {
        array.push(i)
    }
    return array
}


export const isEmpty = (object: object | string) => {

    if (!object) return true

    if (Object.keys(object).length === 0) {
        return true
    } else {
        let flag = true

        for (let key of Object.keys(object)) {
            if (!(object[key] === '' || object[key] === null || object[key] === undefined)) {
                flag = false
            }
        }
        return flag
    }
}

export const getComment = (comments: {
    refMin: number | string,
    value: string,
    refMax: number | string
}[], value: number | string) => {
    for (const comment of comments) {
        if (parseFloat(<string>value) >= parseFloat(<string>comment.refMin) && parseFloat(<string>value) <= parseFloat(<string>comment.refMax)) {
            return titleCase(comment.value)
        }
    }
    return "No Comment"
}

export const formatNumberToDp = (number: string | number, dp: number) => {
    if (number) return parseFloat(<string>number).toFixed(dp);
    return 0
}

export const getClaimStatus = (value: string) => {
    switch (value) {
        case"A":
            return "Approved"
        case "R":
            return "Rejected"
        case "P":
            return "Partial"
        case "Z":
            return "Successful Reversal"
        case "Y":
            return "Unsuccessful Reversal"
        case "O":
            return "Accepted claim with zero values paid."
        case "D":
            return "Pending claim."
        default:
            return "-------"
    }
}

export const getDefaultAccountParam = (param: string) => {
    switch (param) {
        case "A":
            return "Patient Account Receivable"
        case "G":
            return "Funder Account Receivable"
        case "B":
            return "Account Payable"
        case "C":
            return "Bank Suspense"
        case "D":
            return "Patient Prepayment"
        case "E":
            return "Funder Prepayment"
        case "F":
            return "Prepayment"
        default:
            return "-----"
    }
}


export const handleCaptureError = (statusCode: number) => {
    switch (statusCode) {
        case 1:
            return "Creation failed (fingerprint reader not correctly installed or driver files error)"
        case 2:
            return "Function failed (wrong type of fingerprint reader or not correctly installed)"
        case 3:
            return "Internal (invalid parameters to sensor API)"
        case 5:
            return "DLL load failed"
        case 6:
            return "DLL load failed for driver"
        case 7:
            return "DLL load failed for algorithm"
        case 51:
            return "System file load failure"
        case 52:
            return "Sensor chip initialization failed"
        case 53:
            return "Sensor line dropped"
        case 54:
            return "Timeout"
        case 55:
            return "Device not found"
        case 56:
            return "Driver load failed"
        case 57:
            return "Wrong image"
        case 58:
            return "Lack of bandwidth"
        case 59:
            return "Device busy"
        case 60:
            return "Cannot get serial number of the device"
        case 61:
            return "Unsupported device"
        case 101:
            return "Very low minutiae count"
        case 102:
            return "Wrong template type"
        case 103:
            return "Invalid template"
        case 104:
            return "Invalid template"
        case 105:
            return "Could not extract features"
        case 106:
            return "Match failed"
        case 1000:
            return "No memory"
        case 4000:
            return "Invalid parameter passed to service"
        case 2000:
            return "Internal error"
        case 3000:
            return "Internal error extended"
        case 6000:
            return "Certificate error cannot decode"
        case 10001:
            return "License error"
        case 10002:
            return "Invalid domain"
        case 10003:
            return "License expired"
        case 10004:
            return "WebAPI may not have received the origin header from the browser"
        default:
            return "Unknown Error"
    }
}

export const getSex = (sex: string) => {
    switch (sex) {
        case "F":
            return "Female";
        case "M":
            return "Male";
        case "U":
            return "Undisclosed";
        default:
            return "---------"
    }
}
export const getIDType = (idType: string) => {
    switch (idType) {
        case "ID":
            return "National ID No.";
        case "PS":
            return "Passport No.";
        case "PH":
            return "Phone No.";
        default:
            return "---------"
    }
}

export function roundToDp(num: number, dp: number = 3) {
    return (num).toFixed(dp);
}

export const getAgeStr = (val: string) => {
    let {years, days, months} = getAgeObj(val)
    let data = ""
    if (years > 0) data += `${years} yrs`
    if (days > 0) data += `, ${months} mnths`
    if (months > 0) data += `, ${days} dys`
    //if (1) data += `, ${ageInDays} dys`
    return data
}

export const getAgeObj = (val: string) => {
    const birthdate: Date = new Date(val);
    const today: Date = new Date();

    // Calculate age in years
    let ageInYears = today.getFullYear() - birthdate.getFullYear();
    let ageInMonth = today.getMonth() - birthdate.getMonth()
    let ageInDays = today.getDate() - birthdate.getDate()

    // Check if birthday has not yet passed in current year
    if (ageInMonth < 0 || (ageInMonth === 0 && ageInDays < 0)) {
        ageInYears--
        ageInMonth += 12
    }
    if (ageInDays < 0) {
        ageInMonth--
        if ([1, 3, 5, 7, 8, 10, 0].includes(today.getMonth())) {
            ageInDays += 31
        }
        if ([2, 4, 6, 9, 11].includes(today.getMonth())) {
            ageInDays += 30
        }
        if ([2].includes(today.getMonth())) {
            if (today.getFullYear() % 4 === 0) {
                ageInDays += 29
            } else {
                ageInDays += 28
            }
        }
    }
    ageInMonth = Math.floor(ageInMonth % 12);
    return {
        years: ageInYears,
        months: ageInMonth,
        days: ageInDays
    }
}

export const handleGetActiveRef = (items: ParameterRefRange[], dob: string): ParameterRefRange | null => {
    let {years} = getAgeObj(dob)

    if (items.length) {

        for (let item of items) {
            if (years >= item.ageLower && years <= item.ageUpper) {
                return item
            }

        }
    } else return null
}
