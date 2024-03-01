import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import prisma  from "../db/prismadb";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  hashedPassword: string | null;
  emailVerified: boolean;
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_CLIENT_ID is not defined in the environment variables."
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      if (!profile.emails) {
        return null;
      }
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.emails[0].value,
          },
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        const user = await prisma.user.create({
          data: {
            name: profile.displayName,
            email: profile.emails[0].value,
            emailVerified: true,
            image: profile.profileUrl
          },
        });

        await prisma.account.create({
          data: {
            type: "Google",
            provider: "Google",
            providerAccountId: profile.id,
            userId: user.id,
            refresh_token: refreshToken,
            access_token: accessToken,
          },
        });

        return done(null, user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return done(error);
        } else {
          return done(new Error("An unexpected error occurred."));
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});