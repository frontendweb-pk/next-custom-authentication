# Custom Authenctation in NextJS

There are many libraries available for **authentication**, but we need to understand how authentication works under the hood.

Let's dive deeper.

Before implementing the authentication we need to understand the below concepts.

- Authentication:
- Session Management:
- Authorization:

**Authentication:**

Authentication means, identify and verify the user if the user is available in the system. it requires the user need to prove their identity with some values, such as

```ts
// user will put the info into the auth system, to verify their identity
// email, password or mobile or third party providers
```

Let's create the sign-up and sign-in form:

- Create a sign-up / sign-in form.
- Create login / register server-action.

for more info see:

- **login:** src / app / (auth) / login / page.tsx
- **signup:** src / app / (auth) / signup / page.tsx

`Note:`

Since Server Actions always execute on the server, they provide a secure environment for handling authentication logic.

<br />

**Session Management:**

Session management ensures that the user's authenticated state is preserved accross the requests. It involves creating, storing, refreshing, and deleting sessions or tokens.

There are two types of session:

- **Stateless:**
- **Database:**

**`Stateless Session Management:`**

In a stateless system, session data or authentication tokens (such as JWT) are typically stored in the browser's cookies. With each subsequent request, the cookie is sent along with the request, allowing the server to verify the session without having to maintain server-side session data.

This approach simplifies scaling since no server-side storage is needed to track each session, and it’s commonly used in modern web applications, particularly those using token-based authentication systems.

However, stateless sessions can be less secure if not implemented with the right precautions. For instance:

- **Token Security:**

  If the tokens are not securely stored (e.g., using plain cookies), they can be vulnerable to attacks like **Cross-Site Scripting (XSS)** or **Cross-Site Request Forgery (CSRF)**.

- **Token Expiry:**

  Without proper token expiration handling, long-lived tokens can be stolen and used maliciously. It’s essential to set short expiration times and implement refresh tokens for continuous user authentication.

- **Secure Cookies:**

  If the cookie isn’t configured securely, attackers can hijack or tamper with session data. It's crucial to set the Secure, HttpOnly, and SameSite attributes on cookies to minimize the risk of attacks.

To securely implement stateless session management while avoiding common vulnerabilities, here’s a solution that incorporates best practices:

1. **Use Secure Cookies:**

   - **HttpOnly:**

     Prevents client-side JavaScript from accessing cookies, which reduces the risk of XSS attacks.

   - **Secure:**

     Ensures that cookies are only sent over HTTPS, preventing interception of the cookie in transit (man-in-the-middle attacks).

   - **SameSite:**

     Restricts how cookies are sent with cross-site requests, helping protect against CSRF attacks. You can set this to **Strict**, **Lax**, or **None** (with Secure if None is used).

   - **Max-Age** or Expires: Delete the cookie after a certain period.

   - **Path:** Define the URL path for the cookie.

   ```tsx
   // nextjs example
   // lib/session.ts
   import "server-only"; // ensure execute only on server
   import { cookies } from "next/headers";
   export async function createSession(payload: {
     user_id: string;
     role: string;
   }) {
     const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
     const session = await encrypt({ ...payload, expiresAt });
     const cookieStore = await cookies();

     // store session serverside
     cookieStore.set("session", session, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "lax",
       expires: expiresAt,
       path: "/",
     });
   }
   ```

2. **Refresh Tokens:**

   Implement refresh tokens with a longer expiration time (e.g., a few days or weeks). The refresh token can be used to obtain a new access token without needing the user to log in again. However, make sure refresh tokens are securely stored and transmitted.

   **Workflow:**

   - Client sends access token with request.
   - If access token is expired, client can use the refresh token to request a new access token.
   - Refresh tokens should also be securely stored, ideally in an HttpOnly, Secure cookie, and their usage should be limited.

3. **Token Encryption:**
