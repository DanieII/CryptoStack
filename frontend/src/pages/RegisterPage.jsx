import { useState } from "react";
import { useFormData } from "../utils/formData.js";
import { register } from "../services/authService.js";

const RegisterPage = () => {
  const { formData, setFormData, handleInputChange } = useFormData({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
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
          <h1 className="text-white text-center mb-6 text-3xl font-bold">
            Register
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
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
