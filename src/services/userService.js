/* eslint-disable no-useless-catch */
import usersApi from "../api/usersApi";

const BASE_URL = "";


export const findAll = async () => {
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const save = async ({ username, email, password, admin }) => {
  try {
    return await usersApi.post(
      BASE_URL,
      {
        username,
        email,
        password,
        admin
      }
    );
  } catch (error) {
    throw error;
  }
};

export const update = async ({ username, email, id, admin }) => {
  try {
    return await usersApi.put(
      `${BASE_URL}/${id}`,
      {
        username,
        email,
        admin
      }
    );
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await usersApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
  return undefined;
};
