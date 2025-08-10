import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-2xl px-4 py-2 shadow-sm text-sm font-medium border hover:shadow transition ${props.className ?? ""}`}
    />
  );
}
