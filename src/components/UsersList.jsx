/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersList = () => {
  const { users } = useContext(UserContext);
  const { login } = useContext(AuthContext);
  return (
    <table className="table table-hober table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>username</th>
          <th>email</th>
          {!login.isAdmin || (
            <>
              <th>update</th>
              <th>update Route</th>
              <th>remove</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email }) => (
          <UserRow key={id} id={id} username={username} email={email} />
        ))}
      </tbody>
    </table>
  );
};
