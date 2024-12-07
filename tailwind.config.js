/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      MyFont: ["iranYekan"],
    },

    fontWeight: {},

    borderRadius: {
      none: "0",
      xs: "4px",
      sm: "8px",

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

        redp: "#A72F3B",
        primaryShade6: "#641C23",
      },

      screens: {
        xsm: "545px",
        md: "821px",
      },
    },
  },
  plugins: [],
};
