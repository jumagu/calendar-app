/* eslint-disable no-undef */

import calendarApi from "../../src/apis/calendarApi";

describe("Pruebas en calendarApi()", () => {
  test("Debe tener la configuración por defecto", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("El header x-token debe de estar en todas las peticiones", async () => {
    const token = "ABC-123-XYZ";
    localStorage.setItem("token", token);

    const res = await calendarApi.get("/auth");

    expect(res.config.headers["x-token"]).toBe(token);
  });
});