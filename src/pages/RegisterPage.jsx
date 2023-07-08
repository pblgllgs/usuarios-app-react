/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

export const RegisterPage = () => {
  const {
    initialUserForm,
    users = [],
  } = useContext(UserContext);
  const [userSelected, setUserSelected] = useState(initialUserForm);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id == id) || initialUserForm;
      setUserSelected(user);
    }
  }, [id, initialUserForm, users]);

  return (
    <div className="container my-4">
      <h4>{id === undefined ? "Registro" : "Editar"} de usuarios</h4>
      <div className="row">
        <div className="col">
          <UserForm
            userSelected={userSelected}
          />
        </div>
      </div>
    </div>
  );
};
