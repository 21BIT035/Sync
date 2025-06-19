// lib/withSession.js

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "./sessionOptions";

// For API routes
export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// For getServerSideProps
export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
