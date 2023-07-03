/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";

export const UsersList = () => {
  const { users } =
    useContext(UserContext);
  return (
    <table className="table table-hober table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>username</th>
          <th>email</th>
          <th>update</th>
          <th>update Route</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email }) => (
          <UserRow
            key={id}
            id={id}
            username={username}
            email={email}
          />
        ))}
      </tbody>
    </table>
  );
};
