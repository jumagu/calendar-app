/* eslint-disable no-undef */

import { fireEvent, render, screen } from "@testing-library/react";
import { FabDeleteEvent } from "../../../src/calendar/components/FabDeleteEvent";

import { testUserCredentials } from "../../fixtures/testUser";

import { useUiStore } from "../../../src/hooks/useUiStore";
import { useAuthStore } from "../../../src/hooks/useAuthStore";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useUiStore");
jest.mock("../../../src/hooks/useAuthStore");
jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en <FabDeleteEvent />", () => {
  const mockStartDeletingEvent = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("Debe mostrar el componente correctamente", () => {
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    useAuthStore.mockReturnValue({
      user: testUserCredentials,
    });

    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
      activeEvent: {
        id: "ABC",
        start: new Date("2023-08-27 13:00:00"),
        end: new Date("2023-08-27 16:00:00"),
        title: "Evento Prueba",
        notes: "",
        user: {
          uid: "64e9371420c8ea6961680b14",
          name: "Test",
        },
      },
    });

    render(<FabDeleteEvent />);

    const btn = screen.getByLabelText("btn-delete");

    expect(btn.classList).toContain("btn");
    expect(btn.style.display).toBe("none");
  });

  test("Debe mostrar boton si pasa las validaciones", () => {
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    useAuthStore.mockReturnValue({
      user: testUserCredentials,
    });

    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      activeEvent: {
        id: "ABC",
        start: new Date("2023-08-27 13:00:00"),
        end: new Date("2023-08-27 16:00:00"),
        title: "Evento Prueba",
        notes: "",
        user: {
          uid: "64e9371420c8ea6961680b14",
          name: "Test",
        },
      },
    });

    render(<FabDeleteEvent />);

    // screen.debug();

    const btn = screen.getByLabelText("btn-delete");

    expect(btn.style.display).toBe("");
  });

  test("Debe llamar startDeletingEvent() al hacer click sobre el botón", () => {
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    useAuthStore.mockReturnValue({
      user: testUserCredentials,
    });

    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
      activeEvent: {
        id: "ABC",
        start: new Date("2023-08-27 13:00:00"),
        end: new Date("2023-08-27 16:00:00"),
        title: "Evento Prueba",
        notes: "",
        user: {
          uid: "64e9371420c8ea6961680b14",
          name: "Test",
        },
      },
    });

    render(<FabDeleteEvent />);

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
