import axiosClient from "../../../configs/axios.config";

const academicsApis = {
  findAllApi: (page = 1, pageSize = 100) => {
    return axiosClient.get(`/academics?page=${page}&page_size=${pageSize}`);
  },
  findOne: (id) => {
    return axiosClient.get(`/academics/${id}`);
  },
};

export default academicsApis;