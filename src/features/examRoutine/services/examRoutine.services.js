import { AxiosError } from "axios";
import examRoutineApis from "../apis/examRoutine.apis";

const examRoutineService = {
  getAllExamRoutines: async (session, jamat) => {
    try {
      const response = await examRoutineApis.findAllRoutines(session, jamat);
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      if (Array.isArray(data?.data)) return data.data;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching exam routines:", error.message);
      }
      return [];
    }
  },
  getAllSessions: async () => {
    try {
      const response = await examRoutineApis.findAllSessions();
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      if (Array.isArray(data?.sessions)) return data.sessions;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching exam sessions:", error.message);
      }
      return [];
    }
  },
  getAllInstructions: async () => {
    try {
      const response = await examRoutineApis.findAllInstructions();
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      if (Array.isArray(data?.instructions)) return data.instructions;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching exam instructions:", error.message);
      }
      return [];
    }
  },
  getAllJamats: async () => {
    try {
      const response = await examRoutineApis.findAllJamats();
      const data = response?.data;
      if (Array.isArray(data?.jamats)) return data.jamats;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.results)) return data.results;
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching exam jamats:", error.message);
      }
      return [];
    }
  },
};

export default examRoutineService;
