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

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState<boolean>();
  const valid = new RegExp(pattern ?? "").test(value);

  const empty = value === "";
  const customError =
    customErrors?.some((error) => error.visible(value, focused) === true) ??
    false;

  const emptyError = focused === false && empty;
  const validError = !empty && valid === false;

  const error = customError || emptyError || validError;
  object.error = error;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    Promise.resolve(setValue(v)).then(render);
    object.value = v;
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
