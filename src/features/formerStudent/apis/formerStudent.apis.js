import axiosInstance from "../../../configs/axios.config";

export const fetchFormerStudentsApi = async (params = {}) => {
  const res = await axiosInstance.get("/formerStudent/formerStudent", { params });
  return res.data;
};

export const fetchFormerStudentByIdApi = async (id) => {
  const res = await axiosInstance.get(`/formerStudent/formerStudent/${id}`);
  return res.data;
};