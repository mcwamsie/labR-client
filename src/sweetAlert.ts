import Swal from "sweetalert2"

const sweetAlert = {
    primary: async function (message: string) {
        await Swal.fire({
            title: "Information",
            confirmButtonText: "Confirm",
            confirmButtonColor: "var(--active-color)",
            html: message,
            icon: "primary",
        })
    },
    success: async function (message: string) {
        await Swal.fire({
            title: "Success",
            confirmButtonText: "Confirm",
            confirmButtonColor: "var(--active-color)",
            html: message,
            icon: "success",
        })
    },
    info: async function (message: string) {
        await Swal.fire({
            title: "Information",
            confirmButtonText: "Confirm",
            confirmButtonColor: "var(--active-color)",
            html: message,
            icon: "info",
        })
    },
    error: async function (message: string) {
        await Swal.fire({
            title: "Error",
            confirmButtonText: "Confirm",
            confirmButtonColor: "var(--active-color)",
            html: message,
            icon: "error",
        })
    },
    willDelete: async function (message: string) {
        return await Swal.fire({
            html: message,
            title: "Are you sure?",
            icon: 'warning',
            confirmButtonColor: '#d33',
            cancelButtonColor: 'rgb(121,118, 115)',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        })
    },
    willSubmit: async function (message: string) {
        return await Swal.fire({
            html: message,
            title: "Are you sure?",
            icon: 'warning',
            confirmButtonColor: '#28a745',
            cancelButtonColor: 'rgb(121,118, 115)',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        })
    },
    willLogout: async function (message: string) {
        return await Swal.fire({
            html: message,
            title: "Are you sure?",
            icon: 'warning',
            confirmButtonColor: '#28a745',
            cancelButtonColor: 'rgb(121,118, 115)',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
        })
    },
}

export default sweetAlert
