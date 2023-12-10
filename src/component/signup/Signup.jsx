// import { useNavigate } from "react-router-dom";

import { ErrorMessage } from "../error-message";
import "./Signup.css";
import useEmailCheck from "./useEmailCheck";
import usePasswordCheck from "./usePasswordCheck";

export default function Singup() {
  // const navigate = useNavigate();

  // 비즈니스 로직

  const { alreadyExist, emailError, values, onEmailChange } = useEmailCheck({
    email: "",
    emailFocused: null,
    emailValid: null,
  });

  const {
    valuesPwd,
    passwordError,
    confirmPasswordError,
    onPasswordChange,
    onConfirmPasswordChange,
  } = usePasswordCheck({
    password: "",
    passwordFocused: null,
    passwordValid: null,
    confirmPassword: "",
    confirmPasswordFocused: null,
  });

  // const buttonDisabled =
  //   values.email === "" ||
  //   valuesPwd.password === "" ||
  //   valuesPwd.confirmPassword === "" ||
  //   values.emailError ||
  //   valuesPwd.passwordError ||
  //   valuesPwd.confirmPasswordError;

  // const login = (data = { email, password }) => {
  //   fetch("https://bootcamp-api.codeit.kr/api/sign-in", {
  //     method: "POST",
  //     headers: {
  //       "Contents-Type": "aplication/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // };

  // 뷰로직
  return (
    <div className="signup_container">
      <div>
        <input
          value={values.email}
          placeholder="이메일을 입력해주세요"
          className={emailError ? "invalid-input" : ""}
          onChange={onEmailChange}
          onFocus={() => values.emailFocused(true)}
          onBlur={() => values.emailFocused(false)}
        />
        {alreadyExist && <ErrorMessage text="이미 사용 중인 이메일입니다." />}
        {values.emailFocused === false && values.email === "" && (
          <ErrorMessage text="이메일을 입력해주세요." />
        )}
        {values.email !== "" && values.emailValid === false && (
          <ErrorMessage text="올바른 이메일 주소가 아닙니다." />
        )}
      </div>
      <div>
        <input
          type="password"
          value={valuesPwd.password}
          placeholder="비밀번호를 입력해주세요."
          className={passwordError ? "invalid-input" : ""}
          onChange={onPasswordChange}
          onFocus={() => {
            valuesPwd.passwordFocused(true);
          }}
          onBlur={() => {
            valuesPwd.passwordFocused(false);
          }}
        />
        {valuesPwd.password !== "" && valuesPwd.passwordValid === false && (
          <ErrorMessage text="비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요." />
        )}
        {valuesPwd.passwordFocused === false && valuesPwd.password === "" && (
          <ErrorMessage text="비밀번호를 입력해주세요." />
        )}
      </div>
      <div>
        <input
          type="password"
          value={valuesPwd.confirmPassword}
          placeholder="비밀번호를 확인해주세요."
          className={
            valuesPwd.confirmPasswordFocused && confirmPasswordError
              ? "invalid-input"
              : ""
          }
          onChange={onConfirmPasswordChange}
          onFocus={() => {
            valuesPwd.confirmPasswordFocused(true);
          }}
          onBlur={() => {
            valuesPwd.confirmPasswordFocused(false);
          }}
        />
        {confirmPasswordError && (
          <ErrorMessage text="비밀번호가 일치하지 않아요." />
        )}
      </div>
      {/* <button
        onClick={() => {
          login({ email, password });
        }}
        disabled={buttonDisabled}
      >
        회원가입
      </button> */}
    </div>
  );
}

/* useState와 useRef
공통점 : 컴포넌트가 다시 랜더링되어도 변수는 유지된다.

차이점 :
useState는 변수를 설정하는 함수를 사용하게 하는 훅이고 변수값이 변경될시 레더링이 발생한다.
const [test, setTest] useState("");
setTest('1234');  랜더링 발생 o

useRef는 변수를 담고있는 오브젝트로 setState가 없기때문에 리렌더링을 발생시킬 수 없다.
const emailRef = useRef("");
emailRef.current = '1234';  랜더링 발생 x
*/

//기존 코드
// // import { useNavigate } from "react-router-dom";

// import { ErrorMessage } from "../error-message";
// import { useState } from "react";
// import "./Signup.css";

// export default function Singup() {
//   // const navigate = useNavigate();

//   // 비즈니스 로직
//   const [email, setEmail] = useState("");
//   const [emailFocused, setEmailFocused] = useState(null);
//   const [emailValid, setEmailValid] = useState(null);

//   const [password, setPassword] = useState("");
//   const [passwordFocused, setPasswordFocused] = useState(null);
//   const [passwordValid, setPasswordValid] = useState(null);

//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

//   const alreadyExist = email === "test@codeit.com";

//   const emailRegex = /^.+@.+\..{2,4}$/g;
//   const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/g;

//   const emailError = alreadyExist || emailValid === false;
//   const passwordError = passwordValid === false;
//   const confirmPasswordError = password !== confirmPassword;

//   const buttonDisabled =
//     email === "" ||
//     password === "" ||
//     confirmPassword === "" ||
//     emailError ||
//     passwordError ||
//     confirmPasswordError;

//   const login = (data = { email, password }) => {
//     fetch("https://bootcamp-api.codeit.kr/api/sign-in", {
//       method: "POST",
//       headers: {
//         "Contents-Type": "aplication/json",
//       },
//       body: JSON.stringify(data),
//     });
//   };

//   const onEmailChange = (e) => {
//     const emailValue = e.target.value;
//     setEmailValid(emailRegex.test(emailValue));
//     setEmail(emailValue);
//   };

//   // 뷰로직
//   return (
//     <div className="signup_container">
//       <div>
//         <input
//           value={email}
//           placeholder="이메일을 입력해주세요"
//           className={emailError ? "invalid-input" : ""}
//           onChange={onEmailChange}
//           onFocus={() => setEmailFocused(true)}
//           onBlur={() => setEmailFocused(false)}
//         />
//         {alreadyExist && <ErrorMessage text="이미 사용 중인 이메일입니다." />}
//         {emailFocused === false && email === "" && (
//           <ErrorMessage text="이메일을 입력해주세요." />
//         )}
//         {email !== "" && emailValid === false && (
//           <ErrorMessage text="올바른 이메일 주소가 아닙니다." />
//         )}
//       </div>
//       <div>
//         <input
//           type="password"
//           value={password}
//           placeholder="비밀번호를 입력해주세요."
//           className={passwordError ? "invalid-input" : ""}
//           onChange={(e) => {
//             const password = e.target.value;
//             setPasswordValid(passwordRegex.test(password));
//             setPassword(password);
//           }}
//           onFocus={() => {
//             setPasswordFocused(true);
//           }}
//           onBlur={() => {
//             setPasswordFocused(false);
//           }}
//         />
//         {password !== "" && passwordValid === false && (
//           <ErrorMessage text="비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요." />
//         )}
//         {passwordFocused === false && password === "" && (
//           <ErrorMessage text="비밀번호를 입력해주세요." />
//         )}
//       </div>
//       <div>
//         <input
//           type="password"
//           value={confirmPassword}
//           placeholder="비밀번호를 확인해주세요."
//           className={
//             confirmPasswordFocused && confirmPasswordError
//               ? "invalid-input"
//               : ""
//           }
//           onChange={(e) => {
//             const password = e.target.value;
//             setConfirmPassword(password);
//           }}
//           onFocus={() => {
//             setConfirmPasswordFocused(true);
//           }}
//           onBlur={() => {
//             setConfirmPasswordFocused(false);
//           }}
//         />
//         {confirmPasswordError && (
//           <ErrorMessage text="비밀번호가 일치하지 않아요." />
//         )}
//       </div>
//       <button
//         onClick={() => {
//           login({ email, password });
//         }}
//         disabled={buttonDisabled}
//       >
//         회원가입
//       </button>
//     </div>
//   );
// }

// /* useState와 useRef
// 공통점 : 컴포넌트가 다시 랜더링되어도 변수는 유지된다.

// 차이점 :
// useState는 변수를 설정하는 함수를 사용하게 하는 훅이고 변수값이 변경될시 레더링이 발생한다.
// const [test, setTest] useState("");
// setTest('1234');  랜더링 발생 o

// useRef는 변수를 담고있는 오브젝트로 setState가 없기때문에 리렌더링을 발생시킬 수 없다.
// const emailRef = useRef("");
// emailRef.current = '1234';  랜더링 발생 x
// */
