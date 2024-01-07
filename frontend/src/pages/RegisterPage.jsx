import AuthPage from "./AuthPage.jsx";

const RegisterPage = ({ setIsAuthenticated }) => {
  return (
    <AuthPage pageType="register" setIsAuthenticated={setIsAuthenticated} />
  );
};

export default RegisterPage;
