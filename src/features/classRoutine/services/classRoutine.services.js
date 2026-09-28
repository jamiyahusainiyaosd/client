import { AxiosError } from "axios";
import classRoutineApis from "../apis/classRoutine.apis";

const classRoutineService = {
  getAllClassRoutines: async (department, jamat) => {
    try {
      const response = await classRoutineApis.findAllRoutines(department, jamat);
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      return [];
    }
  },
  getAllDepartments: async () => {
    try {
      const response = await classRoutineApis.findAllDepartments();
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      return [];
    }
  },
  getAllDailySchedules: async () => {
    try {
      const response = await classRoutineApis.findAllDailySchedules();
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      return [];
    }
  },
  getRoutineMeta: async () => {
    try {
      const response = await classRoutineApis.findRoutineMeta();
      return response?.data || { departments: [], jamats_by_dept: {} };
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      return { departments: [], jamats_by_dept: {} };
    }
  },
};

export default classRoutineService;
