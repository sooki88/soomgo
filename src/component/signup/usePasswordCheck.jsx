import { useState } from "react";

export default function usePasswordCheck() {
  const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/g;

  const [valuesPwd, setValuesPwd] = useState();

  const passwordError = valuesPwd.passwordValid === false;
  const confirmPasswordError = valuesPwd.password !== valuesPwd.confirmPassword;

  const onPasswordChange = (e) => {
    const { value } = e.target;
    setValuesPwd.password(value);
    setValuesPwd.passwordValid(passwordRegex.text(valuesPwd.password));
  };

  const onConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setValuesPwd.confirmPassword(value);
  };

  return {
    valuesPwd,
    passwordError,
    confirmPasswordError,
    onPasswordChange,
    onConfirmPasswordChange,
  };
}
