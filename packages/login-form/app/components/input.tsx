import {
  useState,
  type InputHTMLAttributes,
  type ChangeEvent,
  type FocusEvent,
  type MutableRefObject,
} from "react";
import { ErrorMessage } from "@login-form/components";

export function Input<T>(
  props: InputHTMLAttributes<HTMLInputElement> & {
    name: keyof T;
    target: MutableRefObject<T>;
    render: () => void;
    erorrMessage?: { empty: string; valid: string };
    customErrors?: {
      visible: (value: string, focused: boolean | undefined) => boolean;
      text: string;
    }[];
  }
) {
  const { customErrors, pattern, erorrMessage, target, name, render, ...rest } =
    props;

  const object = target.current[name] as { value: string; error: boolean };

  const value = object.value;
  const [focused, setFocused] = useState<boolean>();

  const getErrors = (v: string) => {
    const valid = new RegExp(pattern ?? "").test(v);

    const empty = v === "";
    const customError =
      customErrors?.some((error) => error.visible(v, focused) === true) ??
      false;

    const emptyError = focused === false && empty;
    const validError = !empty && valid === false;

    return {
      customError,
      emptyError,
      validError,
    };
  };

  const { customError, emptyError, validError } = getErrors(value);
  const error = customError || emptyError || validError;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    object.value = v;
    const { customError, emptyError, validError } = getErrors(v);

    object.error = customError || emptyError || validError;
    render();
    props.onChange?.(e);
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);

    props.onFocus?.(e);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    props.onBlur?.(e);
  };

  return (
    <div className="center">
      <input
        className={error ? "invalid-input" : ""}
        {...rest}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {emptyError && erorrMessage?.empty && (
        <ErrorMessage text={erorrMessage.empty} />
      )}
      {validError && erorrMessage?.valid && (
        <ErrorMessage text={erorrMessage.valid} />
      )}
      {customErrors?.map((error, key) => {
        const { visible, text } = error;
        if (!visible(value, focused)) {
          return null;
        }

        return <ErrorMessage key={key} text={text} />;
      })}
    </div>
  );
}
