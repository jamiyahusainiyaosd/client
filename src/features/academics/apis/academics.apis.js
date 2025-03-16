import axiosClient from "../../../configs/axios.config";

const academicsApis = {
  findAllApi: () => {
    return axiosClient.get("/academics");
  },
  findOne: (id) => {
    return axiosClient.get(`/academics/${id}`);
  },
};

export default academicsApis;