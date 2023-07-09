/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersPage = () => {
  const { users, visibleForm, handlerOpenForm, getUsers } =
    useUsers();

  const { login } = useAuth();

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
