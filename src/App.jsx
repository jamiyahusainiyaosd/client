import { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import { themeService } from "./services/theme.service";

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

// Automatically synchronizes CSS variables with Django Unfold Admin settings
function ThemeSynchronizer() {
  const { data } = useQuery({
    queryKey: ["themeSetting"],
    queryFn: themeService.getThemeSetting,
  });

  useEffect(() => {
    if (data?.bg_alt_color) {
      document.documentElement.style.setProperty(
        "--bg-alt-color",
        data.bg_alt_color,
      );
    }
  }, [data]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSynchronizer />
      <RouterProvider router={Routes} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
