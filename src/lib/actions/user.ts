"use server";

import { getSession } from "../auth/dal";
import { sleep } from "../helpers/sleep";
import { User } from "../models";

export async function getUser() {
  await sleep(2000);
  const session = await getSession();
  const user = await User.findOne({ where: { user_id: session.user_id } });
  return user;
}
