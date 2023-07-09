import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

export const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userSelected: initialUserForm,
    visibleForm: false,
    errors: initialErrors,
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.users = [
        ...state.users,
        {
          ...payload,
        },
      ];
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },
    removeUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
    },
    updateUser: (state, { payload }) => {
      state.users = state.users.map((u) => {
        if (u.id === payload.id) {
          return {
            ...payload,
          };
        }
        return u;
      });
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },
    loadingUsers: (state, { payload }) => {
      state.users = payload;
    },
    onUserSelectedForm: (state, { payload }) => {
      state.userSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.userSelected = initialUserForm;
    },
    loadingError: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  updateUser,
  loadingUsers,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = usersSlice.actions;
