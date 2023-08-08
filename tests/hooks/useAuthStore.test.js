/* eslint-disable no-undef */

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { act, renderHook, waitFor } from "@testing-library/react";

import { testUserCredentials } from "../fixtures/testUser";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";

import { calendarApi } from "../../src/apis";

import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("Debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      user: {},
      status: "checking",
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegistry: expect.any(Function),
      checkAuthToken: expect.any(Function),
    });
  });

  /************************************* Pruebas en startLogin() **************************/

  test("startLogin() debe realizar el login correctamente", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => await result.current.startLogin(testUserCredentials));

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { uid: "64e9371420c8ea6961680b14", name: "Test" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin() debe fallar la autenticación", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(
      async () =>
        await result.current.startLogin({
          email: "nose@gmail.com",
          password: "123456",
        })
    );

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
    expect(localStorage.getItem("token")).toBe(null);

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  /************************************* Pruebas en startRegistry() **************************/

  test("startRegistry() debe crear un usuario", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "ABC",
        name: "Nose",
        token: "Algún token",
      },
    });

    await act(
      async () =>
        await result.current.startRegistry({
          name: "Nose",
          email: "nose@gmail.com",
          password: "123456",
        })
    );

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { name: "Nose", uid: "ABC" },
      status: "authenticated",
    });

    spy.mockRestore();
  });

  test("startRegistry() debe fallar la creación del usuario", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(
      async () => await result.current.startRegistry(testUserCredentials)
    );

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: "There is already a user associated with that email",
      user: {},
      status: "not-authenticated",
    });
  });

  /************************************* Pruebas en checkAuthToken() **************************/

  test("checkAuthToken() debe autenticar el usuario si hay un token válido", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);

    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => await result.current.checkAuthToken());

    const { errorMessage, user, status } = result.current;

    console.log({ errorMessage, user, status });

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { name: "Test", uid: "64e9371420c8ea6961680b14" },
      status: "authenticated",
    });
  });

  test("checkAuthToken() debe fallar si no hay token", async () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => await result.current.checkAuthToken());

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });
});
