/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const { handlerLogin, handlerLogout, login } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        handlerLogin,
        handlerLogout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
