/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { handlerAddUser, initialUserForm, errors } = useUsers();

  const [userForm, setUserForm] = useState(initialUserForm);
  const [checked, setChecked] = useState(userForm.admin);
  
  const { id, username, password, email, admin } = userForm;

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
    handlerAddUser(userForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  const onCheckboxChange = () => {
    setChecked(!checked);
    setUserForm({
      ...userForm,
      admin: checked
    })
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
      <p className="text-danger">{errors?.username}</p>
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
      <p className="text-danger">{errors?.password}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>
      <div className="my-3 form-check form-switch">
        <input
          type="checkbox"
          name="admin"
          role="switch"
          checked={admin}
          className="form-check-input"
          onChange={onCheckboxChange}
          value={checked}
        />
        <label className="form-check-label" >Admin</label>
      </div>

      <input name="id" value={id} type="hidden" />
      <button type="submit" className="btn btn-primary">
        {id > 0 ? "Actualizar" : "Crear"}
      </button>
      {!handlerCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={() => onCloseForm()}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
