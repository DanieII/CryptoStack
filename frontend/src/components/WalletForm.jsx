import { useState, useRef } from "react";
import { useFormData } from "../utils/formData.js";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/apiService";
import getcapitalizedWord from "../utils/getCapitalizedWord.js";

const WalletForm = () => {
  const { formData, setFormData, handleInputChange } = useFormData({
    platform: "",
    api_key: "",
    api_secret: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const platformOptions = ["custom", "bybit", "mexc"];
  const apiKeyRef = useRef();
  const apiSecretRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (formData.platform !== "custom") {
      if (!(formData.platform && formData.api_key && formData.api_secret)) {
        setErrors(["Please fill the required fields."]);
        return;
      }
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

  const handlePlatformChange = (e) => {
    if (e.target.value === "custom") {
      apiKeyRef.current.style.display = "none";
      apiKeyRef.current.required = false;
      apiSecretRef.current.style.display = "none";
      apiSecretRef.current.required = false;
    } else {
      apiKeyRef.current.style.display = "block";
      apiKeyRef.current.required = true;
      apiSecretRef.current.style.display = "block";
      apiSecretRef.current.required = true;
    }
  };

  return (
    <div className="container bg-neutral-900 rounded-2xl">
      <Link to="/wallets">
        <i className="fa-solid fa-arrow-left text-white"></i>
      </Link>
      <form className="form" onSubmit={handleOnSubmit} required>
        <select
          name="platform"
          defaultValue=""
          onChange={(e) => {
            handleInputChange(e);
            handlePlatformChange(e);
          }}
        >
          <option value="" disabled>
            Select your platform
          </option>
          {platformOptions.map((platformOption) => (
            <option key={platformOption} value={platformOption}>
              {getcapitalizedWord(platformOption)}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="api_key"
          placeholder="Api key"
          required
          onChange={handleInputChange}
          ref={apiKeyRef}
        />
        <input
          type="text"
          name="api_secret"
          placeholder="Api secret"
          required
          onChange={handleInputChange}
          ref={apiSecretRef}
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
