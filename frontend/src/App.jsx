import { useState } from "react";
import { login } from "./services/authService.js";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import "./index.css";

function App() {
  return (
    <>
      {/* <LoginPage></LoginPage> */}
      <RegisterPage></RegisterPage>
    </>
  );
}

export default App;
