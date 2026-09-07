import axiosClient from "../../../configs/axios.config";

const academicsApis = {
  findAllApi: (page = 1) => {
    return axiosClient.get(`/academics?page=${page}`);
  },
  findOne: (id) => {
    return axiosClient.get(`/academics/${id}`);
  },
};

export default academicsApis;