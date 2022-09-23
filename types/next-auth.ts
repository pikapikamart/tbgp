import { ISODateString } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      name?: string | null,
      email?: string | null,
      userType?: string | null
  };
  expires: ISODateString;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null,
    email?: string | null,
    userType?: string | null
  }
}