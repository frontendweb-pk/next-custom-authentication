import SigninForm from "@/components/auth/sign-in-form";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl mb-2 font-bold">Sign in</h1>
        <p className="text-xs">
          If you have an account, please click{" "}
          <Link href="/signup">sign up</Link>
        </p>
      </div>

      <SigninForm />
    </div>
  );
}
