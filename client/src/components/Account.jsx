import React from "react";

// Components
import Button from "./Button";
import Heading from "./Heading";

const Account = () => {
  return (
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
        <ul className="flex flex-col gap-4 list-disc list-inside pl-8">
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
          If you're sure you want to proceed with deleting your account, please
          click the <span className="highlighted">"Delete Account"</span> button
          below.
        </p>
      </div>
      <div>
        <Button variant="primary">Delete Account</Button>
      </div>
    </div>
  );
};

export default Account;
