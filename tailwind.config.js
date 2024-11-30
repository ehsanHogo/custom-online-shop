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
    extend: {
      colors: {
        myGray: {
          4: "#D6D6D6",
          8: "#656565",
          9: "#434343",
          6: "#AFAFAF",
          10: "#242424",
        },
        Tint: {
          5: "#DCACB1",
        },
        // gray: "#434343",
        redp: "#A72F3B",
        primaryShade6: "#641C23",
        // white: "#fff",
      },

      screens: {
        // md: "820px",
      },
    },
  },
  plugins: [],
};
