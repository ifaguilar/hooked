import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),

  password: Yup.string().required("Password is required."),
});

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Please enter a name with at least 3 characters.")
    .required("Name is required."),

  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),

  password: Yup.string()
    .min(8, "Please enter a password with at least 8 characters.")
    .required("Password is required."),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
});

export const personalInfoSchema = Yup.object({
  name: Yup.string()
    .min(3, "Please enter a name with at least 3 characters.")
    .required("Name is required."),

  location: Yup.string().min(
    3,
    "Please enter a location with at least 3 characters."
  ),
});

export const securitySchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),

  newPassword: Yup.string().min(
    8,
    "Please enter a password with at least 8 characters."
  ),

  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords must match."
  ),
});
