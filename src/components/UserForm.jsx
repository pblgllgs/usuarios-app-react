import { useState } from "react";

const initialUserForm = {
  username: "",
  password: "",
  email: "",
};

export const UserForm = () => {
  const [userForm, setUserForm] = useState(initialUserForm);

  const { username, password, email } = userForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password || !email) {
      alert("Debe completar los campos");
      return;
    }
    console.log(userForm);

    //TODO: guardar
    
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
      <input
        className="form-control my-3 w-75"
        placeholder="Password"
        name="password"
        type="password"
        value={password}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <button type="submit" className="btn btn-primary">
        Crear
      </button>
    </form>
  );
};
