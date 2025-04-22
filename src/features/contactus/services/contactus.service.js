import { AxiosError } from "axios";
import contactUsApi from "../apis/contactus.api";

const contactUsService = {
  contactUsPostService: async (data) => {
    try {
      const response = await contactUsApi.contactUsPostApi(data);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default contactUsService;