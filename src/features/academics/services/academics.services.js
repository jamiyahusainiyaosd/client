import academicsApis from "../apis/academics.apis";

const academicsServices = {
  getAllAcademic: async (page = 1) => {
    try {
      return await academicsApis.findAllApi(page);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
  getOneAcademic: async (id) => {
    try {
      return await academicsApis.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
};

export default academicsServices;
