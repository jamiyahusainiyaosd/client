import { AxiosError } from "axios";
import classRoutineApis from "../apis/classRoutine.apis";

const classRoutineService = {
  getAllClassRoutines: async (department, jamat) => {
    try {
      const response = await classRoutineApis.findAllRoutines(department, jamat);
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching class routines:", error.message);
      }
      return [];
    }
  },
  getAllDepartments: async () => {
    try {
      const response = await classRoutineApis.findAllDepartments();
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching class departments:", error.message);
      }
      return [];
    }
  },
  getAllDailySchedules: async (department) => {
    try {
      const response = await classRoutineApis.findAllDailySchedules(department);
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching daily schedules:", error.message);
      }
      return [];
    }
  },
  getRoutineMeta: async () => {
    try {
      const response = await classRoutineApis.findRoutineMeta();
      return response?.data || { departments: [], jamats_by_dept: {} };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching routine meta:", error.message);
      }
      return { departments: [], jamats_by_dept: {} };
    }
  },
};

export default classRoutineService;
