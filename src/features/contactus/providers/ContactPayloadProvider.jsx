import { useState } from "react";
import ContactPayloadContext from "../contexts/contactPayload.context";

const ContactPayloadProvider = ({ children }) => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const reset = () => {
    setPayload({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <ContactPayloadContext.Provider value={{ payload, setPayload, reset }}>
      {children}
    </ContactPayloadContext.Provider>
  );
};
export default ContactPayloadProvider;
