import { useState } from "react";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem("workpal_user")));

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("workpal_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("workpal_user");
    sessionStorage.removeItem("workpal_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}