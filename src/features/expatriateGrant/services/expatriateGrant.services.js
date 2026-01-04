import { useQuery } from "@tanstack/react-query";
import {
  fetchExpatriateGrantsApi,
  fetchExpatriateGrantByIdApi,
} from "../apis/expatriateGrant.apis";

const normalizeList = (payload) => {
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
  if (payload?.data && Array.isArray(payload.data)) {
    return { items: payload.data, meta: payload.meta || {} };
  }
  return { items: Array.isArray(payload) ? payload : [], meta: {} };
};

export const useExpatriateGrants = ({ page, page_size }) =>
  useQuery({
    queryKey: ["expatriateGrants", page, page_size], 
    queryFn: async () =>
      normalizeList(await fetchExpatriateGrantsApi({ page, page_size })),
    staleTime: 0,
  });

export const useExpatriateGrantById = (id) =>
  useQuery({
    queryKey: ["expatriateGrant", id],
    queryFn: () => fetchExpatriateGrantByIdApi(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
