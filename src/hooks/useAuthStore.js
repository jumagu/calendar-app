import { useDispatch, useSelector } from "react-redux";

import {
  checkingCredentials,
  clearErrorMessage,
  clearEventsLogout,
  login,
  logout,
} from "../store";

import { calendarApi } from "../apis";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (error.response && !error.response.data.ok) {
        dispatch(logout("Invalid Credentials"));
      } else {
        dispatch(logout("Internal Server Error"));
      }

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegistry = async ({ name, email, password }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (error.response && !error.response.data.ok) {
        dispatch(logout(error.response?.data.msg));
      } else {
        dispatch(logout("Internal Server Error"));
      }

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(logout());

    try {
      const { data } = await calendarApi.get("auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(logout());
    }
  };

  const startLogout = () => {
    localStorage.clear();

    dispatch(logout());
    dispatch(clearEventsLogout());
  };

  return {
    // * Properties
    user,
    status,
    errorMessage,

    // * Methods
    startLogin,
    startLogout,
    startRegistry,
    checkAuthToken,
  };
};
