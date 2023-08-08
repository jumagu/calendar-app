/* eslint-disable no-undef */

import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

import {
  addNewEvent,
  calendarSlice,
  clearEventsLogout,
  deleteEvent,
  editEvent,
  loadEvents,
  setActiveEvent,
} from "../../../src/store/calendar/calendarSlice";

describe("Pruebas en calendarSlice", () => {
  test("Debe regresar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test("setActiveEvent() debe activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      setActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("addNewEvent() debe agregar el evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2023-06-11 13:00:00"),
      end: new Date("2023-06-11 15:00:00"),
      title: "Cumpleaños feliz",
      notes: "Alguna nota",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      addNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("editEvent() debe editar el evento", () => {
    const eventToUpdate = {
      id: "1",
      start: new Date("2023-06-11 13:00:00"),
      end: new Date("2023-06-11 15:00:00"),
      title: "Cumpleaños del jefe mk",
      notes: "Nose",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      editEvent(eventToUpdate)
    );

    expect(state.events).toContain(eventToUpdate);
  });

  test("deleteEvent() debe eliminar un evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      deleteEvent()
    );

    expect(state.activeEvent).toBe(null);
    expect(state.events.length).toEqual(1);
    expect(state.events).not.toContain(events[0]);
  });

  test("loadEvents() debe cargar los eventos", () => {
    const state = calendarSlice.reducer(initialState, loadEvents(events));

    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual([...events]);

    const newState = calendarSlice.reducer(state, loadEvents(events));
    expect(newState.events.length).toBe(events.length);
  });

  test("clearEventsLogout() debe limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      clearEventsLogout()
    );

    expect(state).toEqual(initialState);
  });
});
