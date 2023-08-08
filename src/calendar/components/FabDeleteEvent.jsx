import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const FabDeleteEvent = () => {
  const { startDeletingEvent, hasEventSelected, activeEvent } =
    useCalendarStore();
  const { user } = useAuthStore();
  const { isDateModalOpen } = useUiStore();

  const isEventDeletable = () => {
    if (!hasEventSelected) return false;

    if (isDateModalOpen) return false;

    if (user.uid !== activeEvent.user.uid) return false;

    return true;
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      style={{ display: isEventDeletable() ? "" : "none" }}
      onClick={startDeletingEvent}
    >
      <i className="fa fa-trash-alt"></i>
    </button>
  );
};
