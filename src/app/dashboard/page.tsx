import SubmitForm from "@/components/ui/submit-form";
import Form from "next/form";
import { logout } from "@/lib/actions/auth";
import { getUser } from "@/lib/actions/user";

export default async function Page() {
  const user = await getUser();
  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(user)}
      <Form action={logout}>
        <SubmitForm type="submit">Logout</SubmitForm>
      </Form>
    </div>
  );
}
