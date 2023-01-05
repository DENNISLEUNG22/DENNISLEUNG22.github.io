import expressSession from "express-session";

export let sessionMiddleware = expressSession({
  secret:
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2),
  resave: true,
  saveUninitialized: true,
});

type User = {
  id: number;
  username: string;
  email: string;
  age: string;
  gender: string;
  phone: number;
  profile_icon?: string;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
