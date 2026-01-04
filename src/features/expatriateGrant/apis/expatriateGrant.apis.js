import axiosInstance from "../../../configs/axios.config";

export const fetchExpatriateGrantsApi = async (params = {}) => {
  const res = await axiosInstance.get("/expatriateGrant/expatriateGrant", { params });
  return res.data;
};

export const fetchExpatriateGrantByIdApi = async (id) => {
  const res = await axiosInstance.get(`/expatriateGrant/expatriateGrant/${id}`);
  return res.data;
};