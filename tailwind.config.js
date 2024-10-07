/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      MyFont: ["iranYekan"],
      // MyFontBold: ["yekanBold"],
    },

    fontWeight: {
      // medium: "500",
    },

    colors: {
      gray9: "#434343",
      redp: "#A72F3B",
    },
    borderRadius: {
      none: "0",
      xs: "4px",
      sm: "8px",
      // DEFAULT: '0.25rem',
      // DEFAULT: '4px',
      md: "16px",
      lg: "24px",

      xl: "32px",
    },
    extend: {},
  },
  plugins: [],
};
