import { useState } from "react";
import type { LinksFunction } from "@remix-run/node";

import styles from "../styles/_index.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

function ErrorMessage(props: { text: string }) {
  const { text } = props;

  return (
    <div
      style={{
        color: "red",
      }}
    >
      {text}
    </div>
  );
}

export default function Test() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState<boolean>();
  const [valid, setValid] = useState<boolean>();

  const alreadyExist = email === "test@codeit.com";

  const emailRegex = /^.+@.+\..{2,4}$/g;

  const error = alreadyExist || valid === false;

  return (
    <div>
      <input
        value={email}
        className={error ? "invalid-input" : ""}
        onChange={(e) => {
          const email = e.target.value;
          setValid(emailRegex.test(email));
          setEmail(email);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      {alreadyExist && <ErrorMessage text="이미 사용 중인 이메일입니다." />}
      {focused === false && email === "" && (
        <ErrorMessage text="이메일을 입력해주세요." />
      )}
      {email !== "" && valid === false && (
        <ErrorMessage text="올바른 이메일 주소가 아닙니다." />
      )}
      <input />
      <button disabled={!valid}>회원가입</button>
    </div>
  );
}
