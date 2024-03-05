import * as Yup from "yup";

export const signupValidation = Yup.object({
  email: Yup.string()
    .email("Email is invalid")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Email is invalid")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});
