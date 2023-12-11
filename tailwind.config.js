/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{vue, ts}", "./index.html"], theme: {
        extend: {
            colors: {
                paper: "#f1f1f1", primary: "#438ffe",

            }, fontFamily: {
                main: "'Nunito', sans-serif",
                logo: "'Poppins', sans-serif",
                report: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }, fontsize: {
                sd: "14px", sm: "13px"
            }, height: {
                "40": "40px", "48": "48px", "20": "20px", "56": "56px",
            }, width: {
                "32": "32px",
                "40": "40px",
                "48": "48px",
                "20": "20px",
                "56": "56px",
                "90": "90px",
                "120": "120px",
                "200": "200px",
                "256": "256px",
                "300": "300px",
                "280": "280px",
                "100": "100px",
            }
        },
    }, plugins: [],
}

