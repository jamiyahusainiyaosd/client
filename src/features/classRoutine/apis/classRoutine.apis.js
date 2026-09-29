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
  findAllDailySchedules: (department) => {
    const params = {};
    if (department && department !== "all") {
      params.department = department;
      params.dept = department;
      params.department_id = department;
    }
    return axiosClient.get("/academics/daily-schedules/", { params });
  },
  findRoutineMeta: () => {
    return axiosClient.get("/academics/class-routines/meta/");
  },
};

export default classRoutineApis;
