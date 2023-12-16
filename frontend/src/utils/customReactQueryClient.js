import { QueryClient } from "@tanstack/react-query";

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      //staleTime: 20_000, // after 20s of fetch, it will invalidate data
      retry: 1,
    },
  },
});
export const invalidateQuery = (queryKey) =>
  reactQueryClient.invalidateQueries(queryKey);

export default reactQueryClient;
