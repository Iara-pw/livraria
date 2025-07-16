import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);

  const login = () => setAutenticado(true);
  const logout = () => setAutenticado(false);

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
