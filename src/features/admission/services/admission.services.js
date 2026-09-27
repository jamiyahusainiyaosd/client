import admissionApi from "../apis/admission.apis.js";

const admissionService = {
  getAll: async (page = 1, pageSize = 100) => {
    try {
      const response = await admissionApi.findAll(page, pageSize);
      return response;
    } catch (error) {
      throw error;
    }
  },
  submitApplication: async (data) => {
    try {
      const response = await admissionApi.createApplication(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getRules: async () => {
    try {
      const response = await admissionApi.findRules();
      return response?.data || response;
    } catch (error) {
      return null;
    }
  },
  getStatus: async () => {
    try {
      const response = await admissionApi.getStatus();
      return response?.data || response;
    } catch (error) {
      return null;
    }
  },
};

export default admissionService;