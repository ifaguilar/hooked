import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

// Components
import PersonalInfo from "../components/PersonalInfo";
import Security from "../components/Security";
import Account from "../components/Account";
import Tabs from "../components/Tabs";

// Context
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const { user, isTokenValid } = useLoaderData();
  const [wasLoggedIn, setWasLoggedIn] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null && !isTokenValid) {
      setWasLoggedIn(true);
      logout();
    } else if (token !== null && isTokenValid) {
      localStorage.setItem("user", JSON.stringify(user));
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

  const tabList = [
    { icon: "edit--v1", name: "Personal Info", component: <PersonalInfo /> },
    { icon: "lock--v1", name: "Security", component: <Security /> },
    { icon: "user", name: "Account", component: <Account /> },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-32">
      <div className="min-h-[calc(100vh_-_208px)] flex flex-col gap-20">
        <Tabs tabList={tabList} />
      </div>
    </div>
  );
};

export default Settings;
