import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { connectToDB } = await import("./app/utils/database");
        const User = (await import("./app/models/user")).default;

        await connectToDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user || typeof user.password !== "string") {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as unknown as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user?.image,
        };
      },
    }),
  ],

callbacks: {
  async jwt({ token, user, account, profile }) {
    if (user) {
      const { connectToDB } = await import("./app/utils/database");
      const User = (await import("./app/models/user")).default;
      console.log(account, profile);

      await connectToDB();

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Create a new user
        existingUser = await User.create({
          email: user.email,
          username: user.name?.replace(/\s+/g, '').toLowerCase() ?? user.email?.split('@')[0],
          image: user.image,
        });
      }

      token.id = existingUser._id.toString(); // ✅ Use Mongo ObjectId
      token.email = existingUser.email;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user && token?.id) {
      session.user.id = token.id as string;
    }
    return session;
  },
},
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
