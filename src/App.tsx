import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./contexts/userContext";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { Reset } from "styled-reset";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Reset />
        <AppRoute />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
