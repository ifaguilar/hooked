import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Button from "./Button";
import Heading from "./Heading";
import Modal from "./Modal";

// Constants
import { SERVER_BASE_URL } from "../constants/constants";

// Context
import { AuthContext } from "../context/AuthContext";

const Account = () => {
  const { logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/user/account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.ok) {
        logout("Account termination");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message === "Unauthorized.") {
        logout("Session timeout");
      }

      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-16">
        <Heading size="md">Account</Heading>
        <div className="flex flex-col gap-8">
          <p>
            You have the option to{" "}
            <span className="font-semibold text-red-600">
              delete your account
            </span>{" "}
            anytime you want. However, please keep in mind that if you choose to
            do so:
          </p>
          <ul className="flex flex-col gap-4 pl-8 list-disc list-inside">
            <li>
              Your account and all associated data will be deleted permanently
              from our servers.
            </li>
            <li>
              This includes your personal information, watchlist, and favorites
              list.
            </li>
            <li>
              You won't be able to access any of the features that require an
              account.
            </li>
          </ul>
          <p>
            If you're sure you want to proceed with deleting your account,
            please click the{" "}
            <span className="highlighted">"Delete Account"</span> button below.
          </p>
        </div>
        <div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Delete Account
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteAccount}
        title="Delete account"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </>
  );
};

export default Account;
