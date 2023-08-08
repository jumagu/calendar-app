import PropTypes from "prop-types";

export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};

CalendarEventBox.propTypes = {
  event: PropTypes.object.isRequired,
};