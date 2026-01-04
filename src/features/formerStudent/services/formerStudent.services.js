import { useQuery } from "@tanstack/react-query";
import {
  fetchFormerStudentsApi,
  fetchFormerStudentByIdApi,
} from "../apis/formerStudent.apis";

const normalizeList = (payload) => {
  if (payload?.data && Array.isArray(payload.data)) {
    return { items: payload.data, meta: payload.meta || {} };
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return {
      items: payload.results,
      meta: {
        count: payload.count,
        next: payload.next,
        previous: payload.previous,
      },
    };
  }

  return { items: Array.isArray(payload) ? payload : [], meta: {} };
};

export const useFormerStudents = (params) => {
  return useQuery({
    queryKey: ["formerStudents", params],
    queryFn: async () => normalizeList(await fetchFormerStudentsApi(params)),
    keepPreviousData: true,
    staleTime: 1000 * 30,
  });
};

export const useFormerStudentById = (id) => {
  return useQuery({
    queryKey: ["formerStudent", id],
    queryFn: () => fetchFormerStudentByIdApi(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
};
