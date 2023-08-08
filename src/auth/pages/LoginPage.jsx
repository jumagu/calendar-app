import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import "./LoginPage.css";

import { useAuthStore, useForm } from "../../hooks";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const loginFormValidations = {
  loginEmail: [(value) => value.length > 0, "Email is required"],
  loginPassword: [(value) => value.length > 0, "Password is required"],
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
};

const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

const registerFormValidations = {
  registerName: [(value) => value.length > 0, "Name is required"],
  registerEmail: [
    (value) => emailRegex.test(value),
    "Please enter a valid email",
  ],
  registerPassword: [
    (value) => value.length >= 6,
    "Password must be 6 or more characters",
  ],
};

export const LoginPage = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const handleShowLoginPassword = () => setShowLoginPassword((show) => !show);

  const [showRegistryPassword, setShowRegistryPassword] = useState(false);
  const handleShowRegistryPassword = () =>
    setShowRegistryPassword((show) => !show);

  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);
  const [isRegistryFormSubmitted, setIsRegistryFormSubmitted] = useState(false);

  const { startLogin, startRegistry, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
    isFormValid: isLoginFormValid,
    loginEmailValid,
    loginPasswordValid,
  } = useForm(loginFormFields, loginFormValidations);

  const {
    registerName,
    registerEmail,
    registerPassword,
    onInputChange: onRegisterInputChange,
    isFormValid: isRegisterFormValid,
    registerNameValid,
    registerEmailValid,
    registerPasswordValid,
  } = useForm(registerFormFields, registerFormValidations);

  const onLoginSubmit = (event) => {
    event.preventDefault();

    setIsLoginFormSubmitted(true);

    if (!isLoginFormValid) return;

    startLogin({ email: loginEmail, password: loginPassword });
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();

    setIsRegistryFormSubmitted(true);

    if (!isRegisterFormValid) return;

    startRegistry({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center px-3 login-container">
      <div className="d-sm-flex w-100">
        <div className="login-form-1">
          <h3>Login</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-floating mb-2">
              <input
                type="email"
                name="loginEmail"
                value={loginEmail}
                className={`form-control ${
                  !!loginEmailValid && isLoginFormSubmitted ? "is-invalid" : ""
                }`}
                placeholder="Your email"
                onChange={onLoginInputChange}
              />
              <div className="invalid-feedback">
                {isLoginFormSubmitted ? loginEmailValid : ""}
              </div>
              <label>Email</label>
            </div>

            <div className="input-group has-validation mb-2">
              <div className="form-floating is-invalid">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="loginPassword"
                  value={loginPassword}
                  className={`form-control ${
                    !!loginPasswordValid && isLoginFormSubmitted
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Your password"
                  onChange={onLoginInputChange}
                />
                <label>Password</label>
              </div>
              <button
                type="button"
                style={{ width: "50px" }}
                className="btn bg-light-subtle border-light-subtle"
                onClick={handleShowLoginPassword}
              >
                <i
                  className={`fa-regular ${
                    showLoginPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>

              <div className="invalid-feedback">
                {isLoginFormSubmitted ? loginPasswordValid : ""}
              </div>
            </div>

            <div className="form-group mt-3">
              <button type="submit" className="btnSubmit">
                <span>
                  <i className="fas fa-sign-in-alt me-2"></i>Enter
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="login-form-2">
          <h3>Register</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-floating mb-2">
              <input
                type="text"
                name="registerName"
                value={registerName}
                className={`form-control ${
                  !!registerNameValid && isRegistryFormSubmitted
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Your name"
                onChange={onRegisterInputChange}
              />
              <div className="invalid-feedback fw-semibold">
                {isRegistryFormSubmitted ? registerNameValid : ""}
              </div>
              <label>Name</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="email"
                name="registerEmail"
                value={registerEmail}
                className={`form-control ${
                  !!registerEmailValid && isRegistryFormSubmitted
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Your email"
                onChange={onRegisterInputChange}
              />
              <div className="invalid-feedback fw-semibold">
                {isRegistryFormSubmitted ? registerEmailValid : ""}
              </div>
              <label>Email</label>
            </div>

            <div className="input-group has-validation mb-2">
              <div className="form-floating is-invalid">
                <input
                  type={showRegistryPassword ? "text" : "password"}
                  name="registerPassword"
                  value={registerPassword}
                  className={`form-control ${
                    !!registerPasswordValid && isRegistryFormSubmitted
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Your password"
                  onChange={onRegisterInputChange}
                />
                <label>Password</label>
              </div>
              <button
                type="button"
                style={{ width: "50px" }}
                className="btn bg-light-subtle border-light-subtle"
                onClick={handleShowRegistryPassword}
              >
                <i
                  className={`fa-regular ${
                    showRegistryPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
              <div className="invalid-feedback fw-semibold">
                {isRegistryFormSubmitted ? registerPasswordValid : ""}
              </div>
            </div>

            <div className="form-group mt-3">
              <button type="submit" className="btnSubmit">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};