import React, { useState } from "react";
import FieldErrorContext from "../contexts/fieldError.context";

const FieldErrorProvider = ({ children }) => {
  const [fieldErrors, setFieldErrors] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    messageError: "",
  });
  const setFieldError = (field, errorMessage) => {
    if (field === "name") {
      setFieldErrors((prev) => ({ ...prev, nameError: errorMessage }));
    } else if (field === "email") {
      setFieldErrors((prev) => ({ ...prev, emailError: errorMessage }));
    } else if (field === "phone") {
      setFieldErrors((prev) => ({ ...prev, phoneError: errorMessage }));
    } else if (field === "message") {
      setFieldErrors((prev) => ({ ...prev, messageError: errorMessage }));
    }
  };
  const resetFieldErrors = () => {
    setFieldErrors({
      nameError: "",
      emailError: "",
      phoneError: "",
      messageError: "",
    });
  };
  return (
    <FieldErrorContext.Provider
      value={{ fieldErrors, setFieldErrors, resetFieldErrors, setFieldError }}
    >
      {children}
    </FieldErrorContext.Provider>
  );
};

export default FieldErrorProvider;