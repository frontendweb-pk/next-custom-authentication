import "server-only";

import { SignJWT, jwtVerify } from "jose";
import type { JWTPayload } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

interface SessionPayload extends JWTPayload, UserPayload {}

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodeKey);
};

export const decrypt = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, encodeKey);
    return payload as SessionPayload;
  } catch (error) {
    console.error("Session Error", error);
    return null;
  }
};

export const createSession = async (payload: UserPayload) => {
  const expires = new Date(Date.now() + payload.expireTime * 1000);
  const session = await encrypt({ ...payload, expires });
  const cookieStore = await cookies();

  const isSecure = process.env.NODE_ENV === "production";
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    expires,
    path: "/",
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};
