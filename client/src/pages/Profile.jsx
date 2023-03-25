import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

// Components
import Heading from "../components/Heading";

// Context
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, isTokenValid } = useLoaderData();

  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isTokenValid) {
      logout();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen font-medium text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Navigate
          to="/login"
          state={{
            isTokenValid: false,
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
