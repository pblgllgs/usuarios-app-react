import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    const result = await findAll();
    dispatch({
      type: "loadingUsers",
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    let response;
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
  };

  const handlerRemoveUser = (id) => {
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
        await remove(id);
        dispatch({
          type: "removeUser",
          payload: id,
        });
        Swal.fire("Eliminado!", "El usuario fue eliminado.", "success");
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
    setUserSelected(initialUserForm);
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    getUsers,
  };
};
