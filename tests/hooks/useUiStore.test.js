/* eslint-disable no-undef */

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { act, renderHook } from "@testing-library/react";

import { uiSlice } from "../../src/store";
import { useUiStore } from "../../src/hooks/useUiStore";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en useUiStore", () => {
  test("Debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      handleOpenDateModal: expect.any(Function),
      handleCloseDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test("handleOpenDateModal() debe cambiar el estado de isDateModalOpen a true", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { handleOpenDateModal } = result.current;

    act(() => handleOpenDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("handleCloseDateModal() debe cambiar el estado de isDateModalOpen a false", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { handleCloseDateModal } = result.current;

    act(() => handleCloseDateModal());

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test("toggleDateModal() debe alternar el estado de isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => result.current.toggleDateModal());

    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => result.current.toggleDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
