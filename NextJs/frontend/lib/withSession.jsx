import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'zacrm_cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  },
};

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
