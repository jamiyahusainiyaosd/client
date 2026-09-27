import academicsApis from "../apis/academics.apis";

const academicsServices = {
  getAllAcademic: async (page = 1, pageSize = 100) => {
    try {
      const response = await academicsApis.findAllApi(page, pageSize);
      const data = response?.data;

      let results =
        data?.results ||
        data?.data ||
        (Array.isArray(data) ? data : []);
      const totalCount = data?.count;

      // If there are more pages (next link or results length < totalCount), fetch all remaining pages
      if (
        totalCount &&
        Array.isArray(results) &&
        results.length < totalCount &&
        data?.next
      ) {
        const perPage = results.length || 9;
        const totalPages = Math.ceil(totalCount / perPage);
        const fetchPromises = [];

        for (let p = 2; p <= totalPages; p++) {
          fetchPromises.push(
            academicsApis.findAllApi(p, pageSize).catch(() => null)
          );
        }

        const remainingResponses = await Promise.all(fetchPromises);
        for (const res of remainingResponses) {
          const pageResults =
            res?.data?.results ||
            res?.data?.data ||
            (Array.isArray(res?.data) ? res?.data : []);
          if (Array.isArray(pageResults)) {
            results = results.concat(pageResults);
          }
        }

        // Mutate or update data with all results
        if (data?.results) {
          data.results = results;
        } else if (data?.data) {
          data.data = results;
        }
      }

      return response;
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
