import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./contexts/userContext";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
  );
}

export default App;
