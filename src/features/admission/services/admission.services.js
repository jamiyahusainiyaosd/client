import { AxiosError } from "axios";
import admissionApi from "../apis/admission.apis";

const admissionService = {
  getAll: async (page) => {
    try {
      const response = await admissionApi.findAll(page);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default admissionService;
