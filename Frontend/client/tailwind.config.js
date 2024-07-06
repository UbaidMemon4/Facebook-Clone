/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "register-bg": "#f0f2f5",
        "login-bg": "#f0f2f5",
        forgotenPassword: "#0866ff",
        formCreateColor: "#42b72a",
        createSignUp: "#00a400",
        silderColor: "#f0f2f5",
      },
      margin: {
        nagative87: "-87px",
        margin68: "68px",
        218: "218px",
        407: "407px",
      },
      padding: {
        52: "52px",
      },
      width: {
        loginWidth: "345px",
        loginWidth2: "330px",
        signupWidth: "432px",
        270: "270px",
        148: "148%",
        366: "366px",
        500: "500px",
        467: "467px",
        800: "800px",
        "100%": "100%",
      },
      height: {
        loginheight: "456px",
      },
      boxShadow: {
        loginForm: "0 2px 4px rgba(0, 0, 0, 0.1)",
        headerLayout: " 0 10px 15px -3px #dddfe2",
      },
      borderColor: {
        dadde1: "#dadde1",
      },
    },
  },
  plugins: [],
};
