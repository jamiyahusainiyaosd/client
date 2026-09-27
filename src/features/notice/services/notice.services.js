import { AxiosError } from "axios";
import noticeApi from "../apis/notice.apis";

const noticeService = {
  getAll: async (page = 1, pageSize = 100) => {
    try {
      const response = await noticeApi.findAll(page, pageSize);
      const data = response.data;

      let results =
        data?.results ||
        data?.data ||
        (Array.isArray(data) ? data : []);
      const totalCount = data?.count;

      // If backend has pagination with more pages (next link or results length < totalCount), fetch all remaining pages
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
            noticeApi.findAll(p, pageSize).catch(() => null)
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

        if (data?.results) {
          data.results = results;
        } else if (data?.data) {
          data.data = results;
        }
      }

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await noticeApi.findOne(id);
      return response.data; 
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw error;
    }
  },
};

export default noticeService;