import AuthPage from "./AuthPage.jsx";

const LoginPage = ({ setIsAuthenticated }) => {
  return <AuthPage pageType="login" setIsAuthenticated={setIsAuthenticated} />;
};

export default LoginPage;
