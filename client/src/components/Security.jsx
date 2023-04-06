import React from "react";

// Components
import Heading from "./Heading";

const Security = () => {
  return (
    <div className="flex flex-col gap-16">
      <Heading size="md">Security</Heading>
      <div className="flex flex-col gap-8">
        <p>
          From here, you can update your{" "}
          <span className="highlighted">email address</span> and{" "}
          <span className="highlighted">password</span> to keep your account
          secure. We encourage you to review and update your security settings
          regularly.
        </p>
      </div>
    </div>
  );
};

export default Security;
