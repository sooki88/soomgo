import { useRef, useState } from "react";

export function useInput<T>(initalValue: T) {
  const [, render] = useState({});

  const target = useRef<T>(initalValue);

  return {
    render,
    target,
  };
}
