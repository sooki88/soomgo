import { useRef, useState } from "react";

import { Input } from "@login-form/components";
import { signIn } from "@login-form/api/login";

export default function SignInPage() {
  const [, render] = useState({});

  const target = useRef({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });

  const { email, password } = target.current;

  const buttonDisabled =
    email.value === "" ||
    password.value === "" ||
    email.error ||
    password.error;

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
      />

      <Input
        name="password"
        type="password"
        target={target}
        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
        render={() => render({})}
        placeholder="비밀번호를 입력해주세요."
        erorrMessage={{
          empty: "비밀번호를 입력해주세요.",
          valid: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
        }}
      />

      <button
        onClick={() => {
          signIn({
            email: email.value,
            password: password.value,
          });
        }}
      >
        로그인
      </button>
      <button disabled={buttonDisabled}>회원가입</button>
    </div>
  );
}
