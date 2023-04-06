import React from "react";

// Components
import Heading from "./Heading";

const PersonalInfo = () => {
  return (
    <div className="flex flex-col gap-16">
      <Heading size="md">Personal Info</Heading>
      <div className="flex flex-col gap-8">
        <p>
          From here, you can update your personal information, such as your{" "}
          <span className="highlighted">name</span> and{" "}
          <span className="highlighted">profile picture</span>. We will never
          share your information with third parties without your consent.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
