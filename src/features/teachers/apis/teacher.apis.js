import axiosClient from "../../../configs/axios.config";

const teachersApi = {
  findAllTeachers: () => {
    return axiosClient.get("/teacher");
  },
};

export default teachersApi;
