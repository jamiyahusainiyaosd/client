import axiosClient from "../../../configs/axios.config";

const coCurricularApis = {
  findAllActivities: (category) => {
    const params = {};
    if (category && category !== "all") {
      params.category = category;
    }
    return axiosClient.get("/academics/co-curricular/", { params });
  },
};

export default coCurricularApis;
