import { QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
  console.error(error);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
