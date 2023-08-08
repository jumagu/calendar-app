import { useEffect, useState } from "react";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEventBox,
  CalendarModal,
  FabAddNewEvent,
  FabDeleteEvent,
  NavBar,
} from "../";

import { calendarLocalizer } from "../../helpers";
import { LoadingEvents } from "../../ui";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { handleOpenDateModal } = useUiStore();
  const { events, handleSetActiveEvent, startLoadingEvents, isLoadingEvents } =
    useCalendarStore();

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventPropGetter = (event) => {
    const isMyEvent = user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      color: "white",
      opacity: 0.75,
    };

    return { style };
  };

  const handleDoubleClickEvent = () => {
    handleOpenDateModal();
  };

  const handleSelectEvent = (event) => {
    handleSetActiveEvent(event);
  };

  const handleViewChangedEvent = (event) => {
    localStorage.setItem("lastView", event);
    handleSetActiveEvent(null);
    setLastView(event);
  };

  return (
    <>
      <NavBar />

      <Calendar
        selectable={true}
        localizer={calendarLocalizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        components={{ event: CalendarEventBox }}
        onSelectSlot={() => handleSetActiveEvent(null)}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectEvent={handleSelectEvent}
        onView={handleViewChangedEvent}
        onNavigate={() => handleSetActiveEvent(null)}
        style={{
          height: "calc(100vh - 104px)",
          margin: "0 1.5rem 1.5rem 1.5rem",
        }}
      />

      {isLoadingEvents ? <LoadingEvents /> : <></>}

      <CalendarModal />

      <FabAddNewEvent />

      <FabDeleteEvent />
    </>
  );
};
