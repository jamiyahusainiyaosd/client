import axiosClient from "../../../configs/axios.config";

const mealMenuApis = {
  findMealMenus: () => {
    return axiosClient.get("/academics/meal-menus/");
  },
  findMealTimings: () => {
    return axiosClient.get("/academics/meal-timings/");
  },
  findMealRules: () => {
    return axiosClient.get("/academics/meal-rules/");
  },
};

export default mealMenuApis;
