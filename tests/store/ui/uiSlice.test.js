/* eslint-disable no-undef */

import {
  uiSlice,
  openDateModal,
  closeDateModal,
} from "../../../src/store/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
  test("Debe regresar el estado por defecto ", () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("Debe cambiar el estado de isDateOpenModal correctamente", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, openDateModal());

    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, closeDateModal());

    expect(state.isDateModalOpen).toBeFalsy();
  });
});
