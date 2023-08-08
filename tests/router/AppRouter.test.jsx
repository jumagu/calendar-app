/* eslint-disable no-undef */

import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Pruebas en <AppRouter />", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("Debe mostrar la pantalla de carga y llamar el checkAuthToken()", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter></AppRouter>);

    expect(mockCheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  test("Debe mostrar la pantalla de login si no está autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/auth2/algo/otracosa"]}>
        <AppRouter></AppRouter>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Login")).toBeTruthy();
  });

  test("Debe mostrar la pantalla de calendario si está autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter></AppRouter>
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
