import { AxiosError } from "axios";
import examRoutineApis from "../apis/examRoutine.apis";

const examRoutineService = {
  getAllExamRoutines: async (session, jamat) => {
    try {
      const response = await examRoutineApis.findAllRoutines(session, jamat);
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      return [];
    }
  },
  getAllSessions: async () => {
    try {
      const response = await examRoutineApis.findAllSessions();
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      return [];
    }
  },
  getAllInstructions: async () => {
    try {
      const response = await examRoutineApis.findAllInstructions();
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      return [];
    }
  },
  getAllJamats: async () => {
    try {
      const response = await examRoutineApis.findAllJamats();
      return response?.data?.jamats || [];
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      return [];
    }
  },
};

export default examRoutineService;
