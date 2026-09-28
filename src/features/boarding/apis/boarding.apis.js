import axiosClient from "../../../configs/axios.config";

const boardingApis = {
  findAllRules: (category) => {
    const params = {};
    if (category && category !== "all") {
      params.category = category;
    }
    return axiosClient.get("/academics/boarding-rules/", { params });
  },
};

export default boardingApis;
