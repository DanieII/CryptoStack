import { useState } from "react";

const useFormData = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return { formData, setFormData, handleInputChange };
};

export { useFormData };
