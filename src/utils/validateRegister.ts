import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateRegister = ({
  username,
  email,
  password,
}: UsernamePasswordInput) => {
  if (username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }

  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email address",
      },
    ];
  }

  if (username.includes("@")) {
    return [
      {
        field: "username",
        message: "username must not include @ symbol",
      },
    ];
  }

  if (email.length <= 2) {
    return [
      {
        field: "email",
        message: "length must be greater than 2",
      },
    ];
  }

  if (password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }
  return null;
};
