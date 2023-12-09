import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

import { ErrorMessage } from "../components/error-message";

//리액트 생명주기 -> custom 함수에서 활용할 수 있게 해주는 것 -> hook (aka. use) -> customHook {정독필수!!(https://react.dev)}
// 그림이 그려지기 전 -> 그림이 그려지는 중 -> 그림이 버려짐
// mount -> render -> unmount

//비즈니스 로직 분리를 customHook을 통해 할 수도 있다.

export default function Test() {
  const naviate = useNavigate();

  //비즈니스 로직
  useEffect(() => {}); //mount, unmount

  const [email, setEmail] = useState(""); //useState -> 컴포넌트가 다시 랜더링되도 유지되는 변수와 그를 설정하는 함수를 사용하게 하는 훅
  const [emailFocused, setEmailFocused] = useState<boolean>();
  const [emailValid, setEmailValid] = useState<boolean>();

  // const emailRef = useRef(""); // 컴포넌트가 다시 랜더링되도 유지되는 변수를 담고있는 오브젝트 다만 setState는 없다 -> 즉 리랜더링을 시킬 수 없다.
  // emailRef.current = '1234'; // 랜더링 발생 x
  // const [test, setTest] = useState('');
  // setTest('1234'); // 랜더링 발생 o

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
    // http, https 통신에 대한 이해
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

  // 뷰 로직
  return (
    <div
      style={{
        //inline style은 잘 쓰지 않는다.
        display: "flex",
        flexDirection: "column", //camelCase
        placeContent: "center", // = justify-content: main axis
        placeItems: "center", // = align-items: cross axis
        gap: "16px", // 개인적인 취향으로는 margin보다는 gap!
        marginBottom: "50px",
      }}
    >
      {/* 컴포넌트 분리로 리팩토링(과제, 자율 -> 예시 코드 작성) */}
      {/* 컴포넌트 네이밍! 중요합니다! */}
      <div className="center">
        <input
          // 앞에 있는 값들은 properties입니다.
          // css attribute
          value={email} // 제어/비제어 컴포넌트(useState를 쓰냐 안쓰냐 => 요걸로 랜더링을 하냐)
          placeholder="이메일을 입력해주세요."
          className={emailError ? "invalid-input" : ""}
          onChange={onEmailChange}
          onFocus={() => {
            setEmailFocused(true);
          }}
          onBlur={() => {
            setEmailFocused(false);
          }}
        />
        {alreadyExist && <ErrorMessage text="이미 사용 중인 이메일입니다." />}
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
      <div className="center">
        <input
          type="password"
          value={confirmedPassword}
          placeholder="비밀번호를 확인해주세요."
          className={
            confirmedPasswordFocused && confirmedPasswordError
              ? "invalid-input"
              : ""
          }
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
        />
        {confirmedPasswordError && (
          <ErrorMessage text="비밀번호가 일치하지 않아요." />
        )}
      </div>
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
