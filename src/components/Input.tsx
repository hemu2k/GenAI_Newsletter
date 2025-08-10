import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring ${props.className ?? ""}`}
    />
  );
}
