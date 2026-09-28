import axiosClient from "../../../configs/axios.config";

const classRoutineApis = {
  findAllRoutines: (department, jamat) => {
    const params = {};
    if (department && department !== "all") {
      params.department = department;
    }
    if (jamat && jamat !== "all") {
      params.jamat = jamat;
    }
    return axiosClient.get("/academics/class-routines/", { params });
  },
  findAllDepartments: () => {
    return axiosClient.get("/academics/class-departments/");
  },
  findAllDailySchedules: () => {
    return axiosClient.get("/academics/daily-schedules/");
  },
  findRoutineMeta: () => {
    return axiosClient.get("/academics/class-routines/meta/");
  },
};

export default classRoutineApis;
