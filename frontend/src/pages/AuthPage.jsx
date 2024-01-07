import { useState } from "react";
import { useFormData } from "../utils/formData.js";
import { login, register } from "../services/authService.js";
import { useNavigate, Link } from "react-router-dom";

const AuthPage = ({ pageType, setIsAuthenticated }) => {
  const { formData, setFormData, handleInputChange } = useFormData({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!(formData.username && formData.password)) {
      setErrors(["Please fill the required fields."]);
      return;
    }

    try {
      pageType === "login" ? await login(formData) : await register(formData);
      setIsAuthenticated(true);

      navigate("/");
    } catch (error) {
      const responseErrors = Object.values(error.response.data).pop();
      setErrors(responseErrors);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center my-auto h-screen">
        <form
          className="form shadow-sm shadow-neutral-900"
          onSubmit={handleOnSubmit}
        >
          <h1 className="text-white text-center mb-6 text-3xl font-bold first-letter:uppercase">
            {pageType}
          </h1>
          <input
            type="text"
            required
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          ></input>
          {errors &&
            errors.map((error, index) => (
              <p className="error" key={index}>
                {error}
              </p>
            ))}
          <button className="button first-letter:uppercase" type="submit">
            {pageType}
          </button>
          <p className="text-white mt-5 text-center">
            {pageType === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
