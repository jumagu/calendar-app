import { useMemo } from "react";

import { useAuthStore } from "../../hooks";

export const NavBar = () => {
  const { user, startLogout } = useAuthStore();

  const { name } = user;

  const newUserName = useMemo(() => {
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  }, [name]);

  return (
    // <div className="navbar navbar-dark bg-dark mb-4 px-4 w-100 d-inline-grid d-sm-flex justify-content-center justify-content-sm-between gap-2 gap-sm-0">
    <div className="navbar navbar-dark bg-dark mb-4 px-4 w-100 d-flex justify-content-between gap-2">
      <span className="navbar-brand m-0 p-0 text-center">
        <i className="fas fa-calendar-alt me-2"></i>
        {newUserName}
      </span>

      <button className="btn btn-danger" onClick={startLogout}>
        <span>
          <i className="fas fa-sign-out-alt me-2"></i>Logout
        </span>
      </button>
    </div>
  );
};