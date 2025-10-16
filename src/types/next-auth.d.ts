import { DefaultSession, User as DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

type UserId = string;
type backendToken = string?;

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: UserId;
    backendToken?: string;
    user?: User;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    backendToken?: string;
    user?: {
      id: UserId;
      backendToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    backendToken?: string;
  }
}
