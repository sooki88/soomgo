import type { InputHTMLAttributes } from "react";
import { ErrorMessage } from "./error-message";

export function Input(
  props: InputHTMLAttributes<HTMLInputElement> & {
    errors: { visible: boolean; text: string }[];
  }
) {
  const { errors } = props;
  const isError = errors.some((error) => error.visible === true);

  return (
    <div className="center">
      <input className={isError ? "invalid-input" : ""} {...props} />
      {errors.map((error, key) => {
        const { visible, text } = error;
        if (!visible) {
          return null;
        }

        return <ErrorMessage key={key} text={text} />;
      })}
    </div>
  );
}
