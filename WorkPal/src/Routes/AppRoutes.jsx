import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Login/Login";
import RegisterUser from "../Pages/Register/RegisterUser";
import Home from "../Pages/Home/Home";
import SearchProjects from "../Pages/SearchProjects/SearchProjects";
import ProjectDetails from "../Pages/ProjectDetails/ProjectDetails";
import CreateProject from "../Pages/CreateProject/CreateProject";
import ProtectedRoute from "../Components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<RegisterUser />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchProjects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}