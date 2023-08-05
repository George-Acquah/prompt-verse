import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

// interface IProfile {
//   profile: {
//     email: string;
//     name: string;
//     picture: string;
//   };
// }


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ], 

  async session({ session }) {
    try {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        session.user.id = sessionUser._id;

        return session; // Return the modified session
    } catch (error) {
      console.error(error);
      return session; // Return the original session on error
    }
  },

  async signIn({ profile }) {
    try {
      await connectToDB();

      //CHECK IF USER ALREADY EXISTS
      const userExists = await User.findOne({
        email: profile.email,
      });

      //ELSE CREATE A NEW USER AND SAVE IN DB
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(' ', '').toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
