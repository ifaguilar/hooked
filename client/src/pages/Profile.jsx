import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

// Components
import Heading from "../components/Heading";

// Context
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, isTokenValid } = useLoaderData();
  const [wasLoggedIn, setWasLoggedIn] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null && !isTokenValid) {
      setWasLoggedIn(true);
      logout();
    }
  }, []);

  if (!isAuthenticated && wasLoggedIn) {
    return (
      <div className="relative min-h-screen font-medium text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Navigate
          to="/login"
          state={{
            wasLoggedIn: true,
          }}
        />
      </div>
    );
  } else if (!isAuthenticated && !wasLoggedIn) {
    return (
      <div className="relative min-h-screen font-medium text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Navigate
          to="/login"
          state={{
            wasLoggedIn: false,
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-32">
      <div className="min-h-[calc(100vh_-_208px)] flex flex-col gap-20">
        <Heading size="md">Profile</Heading>
        <p>Hi</p>
      </div>
    </div>
  );
};

export default Profile;
