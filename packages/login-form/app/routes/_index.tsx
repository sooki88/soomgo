import { useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";

import { Input } from "../components";

interface Info {
  value: string;
  error: boolean | undefined;
}

interface Target {
  email: Info;
  password: Info;
  confirmedPassword: Info;
}

export default function SignUpPage() {
  const naviate = useNavigate();

  const [, render] = useState({});

  const target = useRef<Target>({
    email: {
      value: "",
      error: undefined,
    },
    password: {
      value: "",
      error: undefined,
    },
    confirmedPassword: {
      value: "",
      error: undefined,
    },
  });

  const { email, password, confirmedPassword } = target.current;

  const buttonDisabled =
    email.value === "" ||
    password.value === "" ||
    confirmedPassword.value === "" ||
    email.error ||
    password.error ||
    confirmedPassword.error;

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
        marginBottom: "50px",
      }}
    >
      <Input
        name="email"
        target={target}
        pattern="^.+@.+\..{2,4}$"
        render={() => render({})}
        placeholder="이메일을 입력해주세요."
        erorrMessage={{
          empty: "이메일을 입력해주세요.",
          valid: "올바른 이메일 주소가 아닙니다.",
        }}
        customErrors={[
          {
            visible: (value) => value === "test@codeit.com",
            text: "이미 사용 중인 이메일입니다.",
          },
        ]}
      />

      <Input
        name="password"
        target={target}
        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
        render={() => render({})}
        placeholder="비밀번호를 입력해주세요."
        erorrMessage={{
          empty: "비밀번호를 입력해주세요.",
          valid: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
        }}
      />

      <Input
        name="confirmedPassword"
        target={target}
        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
        render={() => render({})}
        placeholder="비밀번호를 확인해주세요."
        customErrors={[
          {
            visible: (value, focused) =>
              focused === false && password !== confirmedPassword,
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
            email: email.value,
            password: password.value,
          });
        }}
        disabled={buttonDisabled}
      >
        회원가입
      </button>
    </div>
  );
}
