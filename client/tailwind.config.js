module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        "profile-posts": "42rem",
      },
      minHeight: {
        "min-16": "64px",
      },
      colors: {
        "Eerie-Black": "#242424",
        "Eerie-Black-dark": "#1A1A1A",
        "Jet-Gray": "#303030",
        "Davys-Gray": "#545454",
        "Davys-Gray-light": "#5c5c5c",
        "Ghost-White": "#F3EFF5",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
