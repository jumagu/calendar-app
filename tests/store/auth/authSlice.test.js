/* eslint-disable no-undef */

import { testUserCredentials } from "../../fixtures/testUser";
import { authenticatedState, initialState } from "../../fixtures/authStates";

import {
  authSlice,
  login,
  logout,
  clearErrorMessage,
} from "../../../src/store/auth/authSlice";

describe("Pruebas en authSlice", () => {
  test("Debe regresar el estado inicial correctamente", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("Debe realizar el login", () => {
    const state = authSlice.reducer(initialState, login(testUserCredentials));

    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("Debe realizar el loguot", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("Debe realizar el loguot con un mensaje de error", () => {
    const errorMessage = "Invalid Credentials";

    const state = authSlice.reducer(authenticatedState, logout(errorMessage));

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage,
    });
  });

  test("Debe limpiar el mensaje de error", () => {
    const errorMessage = "Invalid Credentials";

    const state = authSlice.reducer(authenticatedState, logout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });
});