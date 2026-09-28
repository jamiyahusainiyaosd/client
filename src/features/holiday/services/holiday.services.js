import { AxiosError } from "axios";
import holidayApis from "../apis/holiday.apis";

const holidayService = {
  getAllHolidays: async (year, category) => {
    try {
      const response = await holidayApis.findAllHolidays(year, category);
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      return [];
    }
  },
};

export default holidayService;
