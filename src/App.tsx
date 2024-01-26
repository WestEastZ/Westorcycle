import AppRoute from "./routes/AppRoute";
import { UserProvider, useUser } from "./contexts/userContext";
import "./App.css";

function App() {
  const user = useUser();
  console.log(user);

  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
  );
}

export default App;
