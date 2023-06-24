import { Route, Routes } from "react-router-dom";
import { useIsLoggedIn } from "./Providers/AuthProvider";
import Profile from "./Containers/Profile/Profile";
import Register from "./Containers/Register";
import Login from "./Containers/Login";

export default function App() {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Profile />;
  } else {
    return (
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }
}
