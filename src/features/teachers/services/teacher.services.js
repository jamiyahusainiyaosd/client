import { AxiosError } from "axios";
import teachersApi from "../apis/teacher.apis";

const teacherService = {
  getAllTeacher: async (page = 1, pageSize = 100) => {
    try {
      const response = await teachersApi.findAllTeachers(page, pageSize);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default teacherService;
