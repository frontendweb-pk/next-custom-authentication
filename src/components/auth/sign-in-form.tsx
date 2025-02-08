"use client";
import { login } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import Input from "../ui/input";
import InputPassword from "../ui/input-password";
import SubmitForm from "../ui/submit-form";
import { toast } from "react-toastify";

export default function SigninForm() {
  const [state, formAction, isPending] = useActionState(login, {
    message: "",
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className="flex flex-col gap-4">
      {isPending && (
        <div className="text-green-950 bg-blue-200 p-2 rounded-md">
          <p>Please wait, i am busy to login you...</p>
        </div>
      )}
      <Form action={formAction} className="flex flex-col gap-4">
        <Input placeholder="Email" error={state.errors?.email} name="email" />
        <InputPassword
          placeholder="*******"
          name="password"
          error={state.errors?.password}
          isPassword
        />
        <SubmitForm type="submit">Sign in</SubmitForm>
      </Form>
    </div>
  );
}
