import axiosClient from "../../../configs/axios.config";

const examRoutineApis = {
  findAllRoutines: (session, jamat) => {
    const params = {};
    if (session && session !== "all") {
      params.session = session;
      params.session_id = session;
    }
    if (jamat && jamat !== "all") {
      params.jamat = jamat;
      params.jamat_id = jamat;
    }
    return axiosClient.get("/academics/exam-routines/", { params });
  },
  findAllSessions: () => {
    return axiosClient.get("/academics/exam-sessions/");
  },
  findAllInstructions: () => {
    return axiosClient.get("/academics/exam-instructions/");
  },
  findAllJamats: () => {
    return axiosClient.get("/academics/exam-routines/jamats/");
  },
};

export default examRoutineApis;
