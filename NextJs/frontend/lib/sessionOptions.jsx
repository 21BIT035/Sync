export const sessionOptions = {
  password: process.env.SESSION_SECRET || "7bPeLqwxiV9/FE31TfzEZgOc+7uYK2AK5+lEf0zSSZc=",
  cookieName: 'zacrm_cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};
