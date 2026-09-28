import TopAchieverApis from "../apis/topAchiever.apis";

export const topAchieverService = {
  getAll: async (params = {}) => {
    try {
      const response = await TopAchieverApis.findAll(params);
      return response.data;
    } catch (err) {
      console.error("Error fetching top achievers:", err);
      return { results: [], count: 0 };
    }
  },
  getFeatured: async () => {
    try {
      const response = await TopAchieverApis.findAll({ is_featured: "true", all: "true" });
      return response.data;
    } catch (err) {
      console.error("Error fetching featured top achievers:", err);
      return { results: [], count: 0 };
    }
  },
  getById: async (id) => {
    try {
      const response = await TopAchieverApis.findOne(id);
      return response.data;
    } catch (err) {
      console.error(`Error fetching top achiever ${id}:`, err);
      return null;
    }
  },
};

export default topAchieverService;
