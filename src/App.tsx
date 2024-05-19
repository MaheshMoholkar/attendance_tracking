import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Student from "./components/Student";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "students", element: <Student /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
