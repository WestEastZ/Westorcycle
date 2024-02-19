import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./contexts/userContext";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const queryClient = new QueryClient();
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AppRoute />
        </UserProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
