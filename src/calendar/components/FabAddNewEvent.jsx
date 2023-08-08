import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNewEvent = () => {
  const { handleSetActiveEvent, isLoadingEvents } = useCalendarStore();
  const { handleOpenDateModal, isDateModalOpen } = useUiStore();

  const handleNewEvent = () => {
    handleSetActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        uid: "",
        name: "",
      },
    });
    handleOpenDateModal();
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleNewEvent}
      style={{ display: !isDateModalOpen ? "" : "none" }}
      disabled={isLoadingEvents}
    >
      <i className="fa fa-plus"></i>
    </button>
  );
};
