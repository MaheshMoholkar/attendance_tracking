import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Student from "./components/Student";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";

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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
