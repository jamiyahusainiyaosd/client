import { useQuery } from "@tanstack/react-query";
import {
  fetchFormerStudentsApi,
  fetchFormerStudentByIdApi,
} from "../apis/formerStudent.apis";

const normalizeList = (payload) => {
  if (!payload) return { items: [], meta: {} };

  if (Array.isArray(payload)) {
    return { items: payload, meta: { count: payload.length } };
  }

  const list =
    payload?.data?.data ||
    payload?.data?.results ||
    payload?.data ||
    payload?.results ||
    payload?.items;

  if (Array.isArray(list)) {
    return {
      items: list,
      meta: {
        count: payload?.count || payload?.total || list.length,
        next: payload?.next,
        previous: payload?.previous,
      },
    };
  }

  return { items: [], meta: {} };
};

export const useFormerStudents = (params) => {
  return useQuery({
    queryKey: ["formerStudents", params],
    queryFn: async () => normalizeList(await fetchFormerStudentsApi(params)),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    gcTime: 1000 * 60 * 30, // 30 minutes in memory cache
  });
};

export const useFormerStudentById = (id) => {
  return useQuery({
    queryKey: ["formerStudent", id],
    queryFn: () => fetchFormerStudentByIdApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
