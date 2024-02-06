import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./contexts/userContext";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Reset />
        <AppRoute />
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
