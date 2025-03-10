import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;