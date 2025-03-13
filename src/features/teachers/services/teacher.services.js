import { AxiosError } from "axios";
import teachersApi from "../apis/teacher.apis";

const teacherService = {
  getAllTeacher: async () => {
    try {
      const response = await teachersApi.findAllTeachers();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default teacherService;
