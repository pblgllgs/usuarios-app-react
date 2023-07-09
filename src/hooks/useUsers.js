import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import {
  initialUserForm,
  loadingError,
  loadingUsers,
  addUser,
  removeUser,
  updateUser,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm
} from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {
  const { users, userSelected, visibleForm, errors } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const { login, handlerLogout } = useAuth();
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      dispatch(loadingUsers(result.data));
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
        dispatch(addUser(response.data ));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      }
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
        dispatch(loadingError(error.response.data));
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
          dispatch(loadingError({ username: "El username ya existe" }));
        }
        if (error.response.data?.message?.includes("UK_email")) {
          dispatch(loadingError({ email: "El email ya existe" }));
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
          dispatch(removeUser(id));
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
    dispatch(onUserSelectedForm(user))
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm())
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
    
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
