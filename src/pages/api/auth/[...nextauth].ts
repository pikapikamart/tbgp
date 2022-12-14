import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { connectDatabase } from "src/server/database";
import { StaffDocument } from "src/server/models/staff.model";
import { AdminDocument } from "src/server/models/admin.model";
import { findAdminService } from "src/server/services/admin.service";
import { findStaffService } from "src/server/services/staff.service";


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        userType: { type: "hidden" }
      },
      async authorize(credentials, req) {
        await connectDatabase();
        const user = {
          ...credentials,
          name: "",
        }
        let userExistence: StaffDocument | AdminDocument | null = null;

        if ( user.userType==="admin" ) {
          userExistence = await findAdminService({ email: user.email });
        } else if ( user.userType==="staff" ) {
          userExistence = await findStaffService({ email: user.email }, {}, { lean: false })
        }

        if ( !userExistence || !await userExistence.comparePassword(user.password as string) ) {
          return Promise.reject(new Error("Authentication failed. Please check your credentials."));
        }

        const isStaffDocument = ( document: any ): document is StaffDocument => (
          "bastionId" in document
        )

        if ( isStaffDocument(userExistence) ) {
          user.name = userExistence.firstname + " " + userExistence.lastname;
        } else {
          user.name = "Admin"
        }

        return user;
      }
    })
  ],
  callbacks: {
    jwt: async({ token, user }) => {

      if ( user ) {
        token.name = user.name;
        token.email = user.email;
        token.userType = user.userType as string;
      }

      return token;
    },
    session: async({ session, token }) => {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          userType: token.userType,
        }
      }

      return newSession;
    }
  },
  pages: {
    signIn: "/auth/credentials-signin"
  }
}


export default NextAuth(nextAuthOptions);