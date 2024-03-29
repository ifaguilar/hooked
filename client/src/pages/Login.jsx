import React, { useContext, useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";

// Constants
import {
  SERVER_BASE_URL,
  WEBSITE_PERSPECTIVE_BG,
} from "../constants/constants";

// Context
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

// Helpers
import { darkModePreference, toggleDarkMode } from "../helpers/darkMode";
import { loginSchema } from "../helpers/validationSchema";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, setLogoutReason, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundRef = useCallback((node) => {
    if (node !== null) {
      node.style.backgroundImage = `url(${WEBSITE_PERSPECTIVE_BG})`;
    }
  });

  useEffect(() => {
    let preloaderImage = document.createElement("img");

    preloaderImage.src = WEBSITE_PERSPECTIVE_BG;

    preloaderImage.addEventListener("load", (event) => {
      setIsLoading(false);
      preloaderImage = null;
    });

    return () => removeEventListener("load", preloaderImage);
  }, []);

  useEffect(() => {
    const logoutReason = location.state?.logoutReason;

    if (logoutReason === "Session timeout") {
      toast.error("Your session has expired. Please, log in again.", {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }

    if (logoutReason === "Account termination") {
      toast.success("Account deleted successfully.", {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }

    setLogoutReason("");
  }, []);

  useEffect(() => {
    switch (theme) {
      case "light":
        localStorage.setItem("theme", "light");
        break;
      case "dark":
        localStorage.setItem("theme", "dark");
        break;
      case "system":
        localStorage.removeItem("theme");
        break;
    }
    toggleDarkMode();
  }, [theme]);

  useEffect(() => {
    darkModePreference.addEventListener("change", toggleDarkMode);

    return () => {
      darkModePreference.removeEventListener("change", toggleDarkMode);
    };
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.ok) {
        login(data.token, data.user);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }
  };

  if (isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-neutral-950">
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-medium bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white">
      <div className="absolute inset-0 lg:grid lg:grid-cols-2">
        <div
          className={`hidden lg:block bg-cover bg-no-repeat bg-center ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          ref={backgroundRef}
        ></div>
        <div className="flex flex-col items-center justify-center gap-16 h-full px-4 lg:px-8">
          <Logo />
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8 w-full max-w-sm">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>

                  <Field name="email">
                    {({ field, meta }) => (
                      <Input
                        touched={meta.touched ? meta.touched : false}
                        error={meta.error ? meta.error : ""}
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    )}
                  </Field>

                  <ErrorMessage name="email">
                    {(message) => (
                      <span className="text-red-600">{message}</span>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>

                  <Field name="password">
                    {({ field, meta }) => (
                      <Input
                        touched={meta.touched ? meta.touched : false}
                        error={meta.error ? meta.error : ""}
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    )}
                  </Field>

                  <ErrorMessage name="password">
                    {(message) => (
                      <span className="text-red-600">{message}</span>
                    )}
                  </ErrorMessage>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-2">
            <p>New to Hooked?</p>
            <Link to="/signup" className="font-semibold">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
