import { DefaultSession, User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    backendToken?: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    backendToken?: string;
    user: {
      id: string;
      backendToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    backendToken?: string;
  }
}
