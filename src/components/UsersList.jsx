/* eslint-disable react/prop-types */
import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {
  const { users } = useUsers();
  
  const { login } = useAuth();
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
        {users.map(({ id, username, email, admin }) => (
          <UserRow key={id} id={id} username={username} email={email} admin={admin} />
        ))}
      </tbody>
    </table>
  );
};
