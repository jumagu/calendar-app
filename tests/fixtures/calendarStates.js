export const events = [
  {
    id: "1",
    start: new Date("2022-10-21 13:00:00"),
    end: new Date("2022-10-21 15:00:00"),
    title: "Cumpleaños del jefe",
    notes: "Alguna nota",
  },
  {
    id: "2",
    start: new Date("2022-11-09 13:00:00"),
    end: new Date("2022-11-09 15:00:00"),
    title: "Día de la independencia",
    notes: "Viva la libertad",
  },
];

export const initialState = {
  events: [],
  activeEvent: null,
  isLoadingEvents: true,
};

export const calendarWithEventsState = {
  events: [...events],
  activeEvent: null,
  isLoadingEvents: false,
};

export const calendarWithActiveEventState = {
  events: [...events],
  activeEvent: { ...events[0] },
  isLoadingEvents: false,
};