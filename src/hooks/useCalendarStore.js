import { useSelector, useDispatch } from "react-redux";

import {
  setActiveEvent,
  addNewEvent,
  editEvent,
  deleteEvent,
  loadEvents,
  closeDateModal,
} from "../store";
import { calendarApi } from "../apis";
import { convertEventDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent, isLoadingEvents } = useSelector(
    (state) => state.calendar
  );
  const { user } = useSelector((state) => state.auth);

  const handleSetActiveEvent = (calendarEvent) => {
    dispatch(setActiveEvent(calendarEvent));
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events = convertEventDate(data.events);

      dispatch(loadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Upadating
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(editEvent({ ...calendarEvent, user }));

        return;
      }
      // Creating
      const { data } = await calendarApi.post("/events", calendarEvent);

      dispatch(addNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error editing event", error.response.data?.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);

      dispatch(closeDateModal());
      dispatch(deleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error deleting event", error.response.data?.msg, "error");
    }
  };

  return {
    // * Properties
    events,
    activeEvent,
    isLoadingEvents,
    hasEventSelected: !!activeEvent,

    // * Methods
    startSavingEvent,
    startLoadingEvents,
    startDeletingEvent,
    handleSetActiveEvent,
  };
};
