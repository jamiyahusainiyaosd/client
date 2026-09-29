import { AxiosError } from "axios";
import holidayApis from "../apis/holiday.apis";

const holidayService = {
  getAllHolidays: async (year, category) => {
    try {
      const response = await holidayApis.findAllHolidays(year, category);
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching holidays:", error.message);
      }
      return [];
    }
  },
};

export default holidayService;
