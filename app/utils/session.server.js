import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { execute } from "~/utils/db.server";

// Main Login Function
export async function login(email, pass) {
  const { rows } = await execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (!rows[0]) return null;
  const isCorrectPassword = await bcrypt.compare(pass, rows[0].pass);
  if (!isCorrectPassword) return null;
  return { id: rows[0].id, email: rows[0].email };
}

if (!process.env.SESSION_SECRET)
  throw new Error(".env variable 'SESSION_SECRET' must be set");

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days,
    httpOnly: true,
  },
});

// Add "userId" to session Cookie
export async function createUserSession(userId, redirectTo) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

function getUserSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "number") {
    return null;
  }
  return userId;
}

export async function requireUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  // if (!userId || typeof userId !== "string") {
  //   const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  //   throw redirect(`/login?${searchParams}`);
  // }
  if (!userId || typeof userId !== "number") {
    throw redirect("/login");
  }
  return userId;
}
