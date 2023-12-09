import { useState } from "react";
import { ErrorMessage } from "../../components/error-message";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState<boolean>();
  const [emailValid, setEmailValid] = useState<boolean>();

  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState<boolean>();
  const [passwordValid, setPasswordValid] = useState<boolean>();

  const emailRegex = /^.+@.+\..{2,4}$/g;
  const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/g;

  const emailError = emailValid === false;
  const passwordError = passwordValid === false;

  const buttonDisabled =
    email === "" || password === "" || emailError || passwordError;

  const login = (data: { email: string; password: string }) => {
    fetch("https://bootcamp-api.codeit.kr/api/sign-in", {
      method: "post",
      headers: {
        "Contents-Type": "aplication/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
        gap: "16px",
      }}
    >
      <div className="center">
        <input
          value={email}
          placeholder="이메일을 입력해주세요."
          className={emailError ? "invalid-input" : ""}
          onChange={(e) => {
            const email = e.target.value;
            setEmailValid(emailRegex.test(email));
            setEmail(email);
          }}
          onFocus={() => {
            setEmailFocused(true);
          }}
          onBlur={() => {
            setEmailFocused(false);
          }}
        />
        {emailFocused === false && email === "" && (
          <ErrorMessage text="이메일을 입력해주세요." />
        )}
        {email !== "" && emailValid === false && (
          <ErrorMessage text="올바른 이메일 주소가 아닙니다." />
        )}
      </div>
      <div className="center">
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          className={passwordError ? "invalid-input" : ""}
          onChange={(e) => {
            const password = e.target.value;
            setPasswordValid(passwordRegex.test(password));
            setPassword(password);
          }}
          onFocus={() => {
            setPasswordFocused(true);
          }}
          onBlur={() => {
            setPasswordFocused(false);
          }}
        />
        {password !== "" && passwordValid === false && (
          <ErrorMessage text="비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요." />
        )}
        {passwordFocused === false && password === "" && (
          <ErrorMessage text="비밀번호를 입력해주세요." />
        )}
      </div>
      <button
        disabled={buttonDisabled}
        onClick={() => {
          login({
            email,
            password,
          });
        }}
      >
        로그인
      </button>
    </div>
  );
}
