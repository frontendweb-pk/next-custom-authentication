import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import { redirect } from "next/navigation";

export const getSession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie!);

  if (!session?.user_id) {
    redirect("/login");
  }

  return { isAuth: true, user_id: session.user_id, role: session.role };
});
