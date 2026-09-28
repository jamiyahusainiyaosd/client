import { AxiosError } from "axios";
import coCurricularApis from "../apis/coCurricular.apis";

const coCurricularService = {
  getAllActivities: async (category) => {
    try {
      const response = await coCurricularApis.findAllActivities(category);
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      return [];
    }
  },
};

export default coCurricularService;
