/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#2dd4bf", // Vibrant Teal
                "primary-dark": "#14b8a6",
                secondary: "#fb7185", // Vibrant Coral/Rose
                "secondary-dark": "#e11d48",
                "background-light": "#f8fafc", // Cool gray/slate tint
                "background-dark": "#020617", // Deepest Navy
                "surface-light": "#ffffff",
                "surface-dark": "#0f172a",
                "text-light": "#334155",
                "text-dark": "#f1f5f9",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                sans: ["Montserrat", "sans-serif"],
                serif: ["Playfair Display", "serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                '2xl': "1rem",
                'card': "0.75rem", // More standard rounding
                'full': "9999px",
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(to right, rgba(2, 6, 23, 0.8) 0%, rgba(2, 6, 23, 0.4) 50%, rgba(2, 6, 23, 0) 100%)',
                'card-gradient': 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
            }
        },
    },
    plugins: [],
}
