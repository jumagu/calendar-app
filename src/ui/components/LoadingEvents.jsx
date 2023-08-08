export const LoadingEvents = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="spinner-border text-primary"
        style={{ width: "60px", height: "60px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
