import SignupForm from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl mb-2 font-bold">Sign up</h1>
        <p className="text-xs">
          If you have an account, please click <Link href="/login">login</Link>
        </p>
      </div>

      <SignupForm />
    </div>
  );
}
