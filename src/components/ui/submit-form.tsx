"use client";
import { useFormStatus } from "react-dom";

type SubmitFormProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export default function SubmitForm({
  children,
  type = "button",
  ...rest
}: SubmitFormProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-indigo-950 rounded-md px-5 py-2 text-white ring-1 ring-indigo-900"
      type={type}
      {...rest}
    >
      {pending ? "wait...." : children}
    </button>
  );
}
