import { useEffect, useMemo, useState } from "react";

import Modal from "react-modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

import { addHours, differenceInSeconds } from "date-fns";

import { getEnvVariables } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks/";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (getEnvVariables().VITE_MODE !== "test") {
  Modal.setAppElement("#root");
}

export const CalendarModal = () => {
  const { user } = useAuthStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen, handleCloseDateModal } = useUiStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const handleInputChanged = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleDateChanged = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Invalid dates", "Check the dates entered", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);

    await startSavingEvent(formValues);
    handleCloseDateModal();
    setFormSubmitted(false);
  };

  const isReadOnlyField = () => {
    if (activeEvent === null) return false;

    if (activeEvent.user.uid === "") return false;

    if (activeEvent.user.uid !== user.uid) return true;

    return false;
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={handleCloseDateModal}
      style={customStyles}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1 className="m-0">
            {activeEvent?.id ? "Edit event" : "New event"}
          </h1>
          <button className="btn btn-outline" onClick={handleCloseDateModal}>
            <i className="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label className="mb-1 d-block">Start date</label>
            <DatePicker
              readOnly={isReadOnlyField()}
              maxDate={formValues.end}
              className="form-control"
              selected={formValues.start}
              onChange={(event) => handleDateChanged(event, "start")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <div className="form-group mb-2">
            <label className="mb-1 d-block">End date</label>
            <DatePicker
              readOnly={isReadOnlyField()}
              minDate={formValues.start}
              className="form-control"
              selected={formValues.end}
              onChange={(event) => handleDateChanged(event, "end")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <hr />

          <div className="form-group mb-2">
            <label className="mb-1">Title</label>
            <input
              readOnly={isReadOnlyField()}
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Event title"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={handleInputChanged}
            />
            <small id="emailHelp" className="form-text text-muted">
              Short description
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              readOnly={isReadOnlyField()}
              type="text"
              className="form-control"
              placeholder="Notes"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={handleInputChanged}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Additional information
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={isReadOnlyField()}
          >
            <span>
              <i className="far fa-save me-2"></i>Save
            </span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
