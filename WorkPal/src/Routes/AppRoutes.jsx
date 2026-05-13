import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

import Login from "../Pages/Login/Login";

import Register from "../Pages/Register/RegisterUser";

import Home from "../Pages/Home/Home";

import SearchProjects from "../Pages/SearchProjects/SearchProjects";

import ProjectDetails from "../Pages/ProjectDetails/ProjectDetails";

import CreateProject from "../Pages/CreateProject/CreateProject";

import NotFound from "../Pages/NotFound/NotFound";

import ProtectedRoute from "../Components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PRIVATE */}
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

        {/* REDIRECT */}
        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}