import { useContext } from "react";
import ContactPayloadContext from "../contexts/contactPayload.context";

const useContactPayload = () => {
  return useContext(ContactPayloadContext);
};

export default useContactPayload;