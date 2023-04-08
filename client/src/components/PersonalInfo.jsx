import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";
import Select from "./Select";
import DatePicker from "./DatePicker";
import FileInput from "./FileInput";

// Constants
import { GENDER_OPTIONS, SERVER_BASE_URL } from "../constants/constants";

// Context
import { AuthContext } from "../context/AuthContext";

// Helpers
import { personalInfoSchema } from "../helpers/validationSchema";

const PersonalInfo = ({ name, avatar, location, gender, birthDate }) => {
  const { logout } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 2 * 1024 * 1024;
      const fileSize = file.size;

      if (fileSize <= maxSize) {
        const reader = new FileReader();
        reader.onloadend = (event) => {
          setPreview(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFieldValue("avatar", "");
        setPreview(null);
        toast.error(
          "The selected file is too large. Please select a file smaller than 2MB.",
          {
            position: "bottom-right",
            className:
              "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
          }
        );
      }
    }
  };

  const handleSubmit = async (values, submitProps) => {
    const body = {
      name: values.name,
      avatar: preview,
      location: values.location,
      gender: values.gender,
      birthDate: values.birthDate,
    };

    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/user/personal-info`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );

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
      <Heading size="md">Personal Info</Heading>
      <div className="flex flex-col gap-8">
        <p>
          From here, you can update your personal information, such as your{" "}
          <span className="highlighted">name</span> and{" "}
          <span className="highlighted">profile picture</span>. We will never
          share your information with third parties without your consent.
        </p>
      </div>
      <Formik
        initialValues={{
          name: name,
          avatar: "",
          location: location,
          gender: gender,
          birthDate: birthDate,
        }}
        validationSchema={personalInfoSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty, handleChange, setFieldValue }) => (
          <Form className="flex flex-col gap-8 w-full max-w-sm xl:grid xl:grid-cols-[384px_384px] xl:max-w-none xl:gap-12">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-12 xl:col-span-2">
              <div className="w-36 h-36 rounded-full self-center overflow-hidden">
                {preview ? (
                  <img
                    className="w-full h-full aspect-square object-cover"
                    src={preview}
                    alt="Profile Picture"
                  />
                ) : (
                  <img
                    className="w-full h-full aspect-square object-cover"
                    src={avatar}
                    alt="Profile Picture"
                  />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="avatar">Profile Picture</label>

                <Field name="avatar">
                  {({ field }) => (
                    <FileInput
                      accept="image/*"
                      variant="secondary"
                      {...field}
                      onChange={(event) => {
                        handleChange(event);
                        handleFileChange(event, setFieldValue);
                      }}
                    />
                  )}
                </Field>
                <p>
                  The maximum upload size is{" "}
                  <span className="highlighted">2MB</span>.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 xl:max-w-sm">
              <label htmlFor="name">Name</label>

              <Field name="name">
                {({ field, meta }) => (
                  <Input
                    touched={meta.touched ? meta.touched : false}
                    error={meta.error ? meta.error : ""}
                    type="text"
                    placeholder="Enter your name"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="name">
                {(message) => <span className="text-red-600">{message}</span>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="location">Location</label>

              <Field name="location">
                {({ field, meta }) => (
                  <Input
                    touched={meta.touched ? meta.touched : false}
                    error={meta.error ? meta.error : ""}
                    type="text"
                    placeholder="Enter your location"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="location">
                {(message) => <span className="text-red-600">{message}</span>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="gender">Gender</label>

              <Field name="gender">
                {({ field }) => <Select options={GENDER_OPTIONS} {...field} />}
              </Field>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="birthDate">Birth Date</label>

              <Field name="birthDate">
                {({ field }) => <DatePicker {...field} />}
              </Field>
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

export default PersonalInfo;
