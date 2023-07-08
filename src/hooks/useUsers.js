import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const { login, handlerLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      dispatch({
        type: "loadingUsers",
        payload: result.data,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire(
          "Error!",
          "La sesión ya no es válida, vuelva  a inciar sesión",
          "error"
        );
        handlerLogout();
      }
    }
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) {
      return;
    }
    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }
      dispatch({
        type: user.id === 0 ? "addUser" : "updateUser",
        payload: response.data,
      });
      Swal.fire(
        user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
        `El usuario fue ${
          user.id === 0 ? "creado exitosamente!" : "actualizado exitosamente!"
        }`,
        "success"
      );
      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
          setErrors({ username: "El username ya existe" });
        }
        if (error.response.data?.message?.includes("UK_email")) {
          setErrors({ email: "El email ya existe" });
        }
      } else if (error.response?.status === 401) {
        Swal.fire(
          "Error!",
          "La sesión ya no es válida, vuelva  a inciar sesión",
          "error"
        );
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveUser = (id) => {
    if (!login.isAdmin) {
      return;
    }
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch({
            type: "removeUser",
            payload: id,
          });
          Swal.fire("Eliminado!", "El usuario fue eliminado.", "success");
        } catch (error) {
          if (error.response?.status === 401) {
            Swal.fire(
              "Error!",
              "La sesión ya no es válida, vuelva  a inciar sesión",
              "error"
            );
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerUserSelectedForm = (user) => {
    setVisibleForm(true);
    setUserSelected({ ...user });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setErrors({});
    setUserSelected(initialUserForm);
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    getUsers,
  };
};
