import axiosClient from "../../../configs/axios.config";

const holidayApis = {
  findAllHolidays: (year, category) => {
    const params = {};
    if (year) {
      params.year = year;
    }
    if (category && category !== "all") {
      params.category = category;
    }
    return axiosClient.get("/academics/holidays/", { params });
  },
};

export default holidayApis;
