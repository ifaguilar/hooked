import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";

// Constants
import { SERVER_BASE_URL } from "../constants/constants";

// Context
import { AuthContext } from "../context/AuthContext";

// Helpers
import { securitySchema } from "../helpers/validationSchema";

const Security = ({ email }) => {
  const { logout } = useContext(AuthContext);

  const handleSubmit = async (values, submitProps) => {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = values;

      if (newPassword !== "" && confirmNewPassword !== "") {
        if (currentPassword === "") {
          throw new Error(
            `To update your password, please enter your current password.`
          );
        }
      }

      const response = await fetch(`${SERVER_BASE_URL}/api/user/security`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(data.message, {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
        submitProps.resetForm({ values });
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
      <Formik
        initialValues={{
          email: email,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={securitySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form className="flex flex-col gap-8 w-full max-w-sm xl:grid xl:grid-cols-[384px_384px] xl:max-w-none xl:gap-12">
            <div className="flex flex-col gap-2 xl:max-w-sm">
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
                {(message) => <span className="text-red-600">{message}</span>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword">Current Password</label>

              <Field name="currentPassword">
                {({ field, meta }) => (
                  <Input
                    touched={meta.touched ? meta.touched : false}
                    error={meta.error ? meta.error : ""}
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="currentPassword">
                {(message) => <span className="text-red-600">{message}</span>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword">New Password</label>

              <Field name="newPassword">
                {({ field, meta }) => (
                  <Input
                    touched={meta.touched ? meta.touched : false}
                    error={meta.error ? meta.error : ""}
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="newPassword">
                {(message) => <span className="text-red-600">{message}</span>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>

              <Field name="confirmNewPassword">
                {({ field, meta }) => (
                  <Input
                    touched={meta.touched ? meta.touched : false}
                    error={meta.error ? meta.error : ""}
                    type="password"
                    placeholder="Confirm your new password"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="confirmNewPassword">
                {(message) => <span className="text-red-600">{message}</span>}
              </ErrorMessage>
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !dirty}
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Security;
