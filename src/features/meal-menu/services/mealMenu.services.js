import mealMenuApis from "../apis/mealMenu.apis";

const mealMenuService = {
  getMealMenus: async () => {
    try {
      const response = await mealMenuApis.findMealMenus();
      return Array.isArray(response.data) ? response.data : (response.data?.results || []);
    } catch (error) {
      console.error("Error fetching meal menus:", error);
      return [];
    }
  },

  getMealTimings: async () => {
    try {
      const response = await mealMenuApis.findMealTimings();
      return Array.isArray(response.data) ? response.data : (response.data?.results || []);
    } catch (error) {
      console.error("Error fetching meal timings:", error);
      return [];
    }
  },

  getMealRules: async () => {
    try {
      const response = await mealMenuApis.findMealRules();
      return Array.isArray(response.data) ? response.data : (response.data?.results || []);
    } catch (error) {
      console.error("Error fetching meal rules:", error);
      return [];
    }
  },
};

export default mealMenuService;
