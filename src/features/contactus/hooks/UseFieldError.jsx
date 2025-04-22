import { useContext } from "react";
import FieldErrorContext from "../contexts/fieldError.context";

const useFieldError = () => {
  return useContext(FieldErrorContext);
};

export default useFieldError;