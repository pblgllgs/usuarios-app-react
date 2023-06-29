/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserForm = ({
  handlerAddUser,
  initialUserForm,
  userSelected,
  handlerCloseForm,
}) => {
  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, username, password, email } = userForm;

  useEffect(() => {
    setUserForm({ ...userSelected, password: "" });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (!password && id === 0) || !email) {
      Swal.fire("Error de validación", "Debe completar los campos", "error");
      return;
    }

    handlerAddUser(userForm);

    setUserForm(initialUserForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={onInputChange}
        />
      )}

      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input name="id" value={id} type="hidden" />
      <button type="submit" className="btn btn-primary">
        {id === 0 ? "Crear" : "Actualizar"}
      </button>
      <button
        className="btn btn-primary mx-2"
        type="button"
        onClick={() => onCloseForm()}
      >
        Cerrar
      </button>
    </form>
  );
};
