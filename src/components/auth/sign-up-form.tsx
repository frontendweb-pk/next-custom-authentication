"use client";
import { signup } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import SubmitForm from "../ui/submit-form";
import Input from "../ui/input";
import InputPassword from "../ui/input-password";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, {
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
          <p>Please wait, i am busy to regisering you...</p>
        </div>
      )}
      <Form action={formAction} className="flex flex-col gap-4">
        <Input placeholder="Name" name="name" error={state.errors?.name} />
        <Input placeholder="Email" error={state.errors?.email} name="email" />
        <InputPassword
          placeholder="*******"
          name="password"
          error={state.errors?.password}
          isPassword
        />
        <Input
          placeholder="Mobile"
          error={state.errors?.mobile}
          name="mobile"
        />
        <SubmitForm type="submit">Sign up</SubmitForm>
      </Form>
    </div>
  );
}
