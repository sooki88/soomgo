import { useState } from "react";

export default function useEmailCheck() {
  const emailRegex = /^.+@.+\..{2,4}$/g;

  const [values, setValues] = useState();

  const alreadyExist = values.email === "test@codeit.com";
  const emailError = alreadyExist || values.emailValid === false;

  const onEmailChange = (e) => {
    const emailValue = e.target.value;
    setValues.emailValid(emailRegex.test(emailValue));
    setValues.email(emailValue);
  };

  return { alreadyExist, emailError, values, onEmailChange };
}
