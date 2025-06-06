import axios from "axios";
import { emailValidationKey } from "../../../constants/env.constants";

const validateEmail = async (email) => {
  const url = `https://apilayer.net/api/check?access_key=${emailValidationKey}&email=${email}`;
  const response = await axios.get(url);
  return response.data;
};

export default validateEmail;
