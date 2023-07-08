import Swal from "sweetalert2";
import { loginReducer } from "../../reducers/loginReducer";
import { useReducer } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();
  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      const user = { username: claims.username };
      dispatch({
        type: "login",
        payload: {
          user,
          isAdmin: claims.isAdmin,
        },
      });
      sessionStorage.setItem("token", `Bearer ${token}`);
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user,
        })
      );
      navigate("/users");
      Swal.fire("Login", "Bienvenido", "success");
    } catch (e) {
      if (e.response?.status === 401) {
        Swal.fire(
          "Error de validación",
          "Username o password incorrectos",
          "error"
        );
      } else if (e.response?.status === 403) {
        Swal.fire(
          "Error",
          "Permisos insuficientes",
          "error"
        );
      } else {
        throw new Error();
      }
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: "logout",
    });
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
  };
  return {
    handlerLogin,
    handlerLogout,
    login,
  };
};
