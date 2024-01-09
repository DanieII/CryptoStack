import { useState } from "react";
import { useFormData } from "../utils/formData.js";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/apiService";

const WalletForm = () => {
  const { formData, setFormData, handleInputChange } = useFormData({
    platform: "",
    api_key: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const platformOptions = ["custom", "bybit", "mexc"];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!(formData.platform && formData.api_key)) {
      setErrors(["Please fill the required fields."]);
      return;
    }

    try {
      await api.post("/wallets/", formData);
      navigate("/wallets");
    } catch (error) {
      const responseErrors = Object.values(error.response.data).pop();
      setErrors(responseErrors);
    }

    return null;
  };

  return (
    <div>
      <Link to="/wallets">
        <i className="fa-solid fa-arrow-left text-white"></i>
      </Link>
      <form className="form" onSubmit={handleOnSubmit} required>
        <select name="platform" defaultValue="" onChange={handleInputChange}>
          <option value="" disabled>
            Select your platform
          </option>
          {platformOptions.map((platformOption) => (
            <option key={platformOption} value={platformOption}>
              {platformOption.charAt(0).toUpperCase() + platformOption.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="api_key"
          placeholder="Api key"
          required
          onChange={handleInputChange}
        />
        {errors &&
          errors.map((error, index) => (
            <p className="error" key={index}>
              {error}
            </p>
          ))}
        <button className="button" type="submit">
          Create Wallet
        </button>
      </form>
    </div>
  );
};

export default WalletForm;
