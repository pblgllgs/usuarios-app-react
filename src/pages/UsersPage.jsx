/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersPage = () => {
  const { users, visibleForm, handlerOpenForm, getUsers } =
    useContext(UserContext);

  const { login } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {!visibleForm || <UserModalForm />}
      <div className="container my-4">
        <h2>Users App</h2>
        <div className="row">
          <div className="col">
            {(visibleForm || !login.isAdmin) ||  (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Agregar usuarios
              </button>
            )}
            {users.length > 0 ? (
              <UsersList />
            ) : (
              <div className="alert alert-warning">No hay usuarios</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
