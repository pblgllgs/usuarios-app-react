import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";

const initialUsers = [
  {
    id: 1,
    username: "user",
    password: "123456",
    email: "user@gmail.com",
  },
];

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

  const handlerAddUser = (user) => {
    dispatch({
      type: user.id === 0 ? "addUser" : "updateUser",
      payload: user,
    });
    Swal.fire(
      user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
      `El usuario fue ${
        user.id === 0 ? "creado exitosamente!" : "actualizado exitosamente!"
      }`,
      "success"
    );
    handlerCloseForm();
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
    }).then((result) => {
      if (result.isConfirmed) {
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
  };
};
