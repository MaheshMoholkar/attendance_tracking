import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Student from "./pages/Student";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import theme from "./config/AppTheme";
import Loader from "./components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "students", element: <Student /> },
      { path: "attendance", element: <Attendance /> },
    ],
  },
  { path: "login", element: <Login /> },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <Loader />
    </ThemeProvider>
  );
}

export default App;
