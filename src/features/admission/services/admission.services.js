import admissionApi from "../apis/admission.apis.js";

const admissionService = {
  getAll: async (page = 1) => {
    const response = await admissionApi.findAll(page);
    return response;
  },
};

export default admissionService;