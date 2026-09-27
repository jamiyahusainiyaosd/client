import axiosClient from "../configs/axios.config";

export const themeService = {
  getThemeSetting: async () => {
    try {
      const response = await axiosClient.get("/theme/");
      return response.data;
    } catch {
      return null;
    }
  },
  getPrayerTimes: async () => {
    try {
      const response = await axiosClient.get("/theme/prayer-times/");
      return response.data;
    } catch {
      return null;
    }
  },
  getContactSetting: async () => {
    try {
      const response = await axiosClient.get("/theme/contact/");
      return response.data;
    } catch {
      return null;
    }
  },
};

export default themeService;
