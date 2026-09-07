import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes fresh in cache (0ms instant reload)
      gcTime: 1000 * 60 * 30, // 30 minutes in memory
      refetchOnWindowFocus: false, // Prevents sudden refetching on tab switch
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
