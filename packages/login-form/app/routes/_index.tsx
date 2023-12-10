import { useState } from "react";
import { useNavigate } from "@remix-run/react";

import { Input } from "../components";

export default function Test() {
  const naviate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState<boolean>();
  const [emailValid, setEmailValid] = useState<boolean>();

  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState<boolean>();
  const [passwordValid, setPasswordValid] = useState<boolean>();

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmedPasswordFocused, setConfirmedPasswordFocused] =
    useState<boolean>();

  const alreadyExist = email === "test@codeit.com";

  const emailRegex = /^.+@.+\..{2,4}$/g;
  const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/g;

  const emailError = alreadyExist || emailValid === false;
  const passwordError = passwordValid === false;
  const confirmedPasswordError =
    confirmedPasswordFocused && password !== confirmedPassword;

  const buttonDisabled =
    email === "" ||
    password === "" ||
    confirmedPassword === "" ||
    emailError ||
    passwordError ||
    confirmedPasswordError;

  const login = (data: { email: string; password: string }) => {
    fetch("https://bootcamp-api.codeit.kr/api/sign-in", {
      method: "post",
      headers: {
        "Contents-Type": "aplication/json",
      },
      body: JSON.stringify(data),
    });
  };

  const onEmailChange = (e: any) => {
    const email = e.target.value;
    setEmailValid(emailRegex.test(email));
    setEmail(email);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
        gap: "16px",
        marginBottom: "50px",
      }}
    >
      <Input
        value={email}
        placeholder="이메일을 입력해주세요."
        onChange={onEmailChange}
        onFocus={() => {
          setEmailFocused(true);
        }}
        onBlur={() => {
          setEmailFocused(false);
        }}
        errors={[
          {
            visible: alreadyExist,
            text: "이미 사용 중인 이메일입니다.",
          },
          {
            visible: emailFocused === false && email === "",
            text: "이메일을 입력해주세요.",
          },
          {
            visible: email !== "" && emailValid === false,
            text: "올바른 이메일 주소가 아닙니다.",
          },
        ]}
      />

      <Input
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요."
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
        errors={[
          {
            visible: password !== "" && passwordValid === false,
            text: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
          },
          {
            visible: passwordFocused === false && password === "",
            text: "비밀번호를 입력해주세요.",
          },
        ]}
      />

      <Input
        type="password"
        value={confirmedPassword}
        placeholder="비밀번호를 확인해주세요."
        onChange={(e) => {
          const password = e.target.value;
          setConfirmedPassword(password);
        }}
        onFocus={() => {
          setConfirmedPasswordFocused(true);
        }}
        onBlur={() => {
          setConfirmedPasswordFocused(false);
        }}
        errors={[
          {
            visible: confirmedPasswordError ?? false,
            text: "비밀번호가 일치하지 않아요.",
          },
        ]}
      />

      <button
        onClick={() => {
          naviate("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          login({
            email,
            password,
          });
        }}
        disabled={buttonDisabled}
      >
        회원가입
      </button>
    </div>
  );
}
