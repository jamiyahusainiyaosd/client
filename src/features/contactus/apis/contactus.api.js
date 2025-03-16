import axiosClient from "../../../configs/axios.config";

const contactUsApi = {
  contactUsPostApi: (data) => {
    return axiosClient.post("/contact", data);
  },
};

export default contactUsApi;