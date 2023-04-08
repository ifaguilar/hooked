import React, { useContext, useEffect } from "react";
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
  const { userDetails, isTokenValid } = useLoaderData();
  const { isAuthenticated, logoutReason, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isTokenValid) {
      logout("Session timeout");
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen font-medium text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Navigate
          to="/login"
          state={{
            logoutReason: logoutReason,
          }}
        />
      </div>
    );
  }

  const tabList = [
    {
      icon: "edit--v1",
      name: "Personal Info",
      component: (
        <PersonalInfo
          name={userDetails?.name}
          avatar={userDetails?.avatar}
          location={userDetails?.location}
          gender={userDetails?.gender}
          birthDate={userDetails?.birthDate}
        />
      ),
    },
    {
      icon: "lock--v1",
      name: "Security",
      component: <Security email={userDetails?.email} />,
    },
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
