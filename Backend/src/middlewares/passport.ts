import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

import { Request } from 'express';
const LocalStrategy = require('passport-local').Strategy;

const prisma = new PrismaClient();
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (
      req: Request,
      email: string,
      password: string,
      done: (
        error: any,
        user?: any,
        options?: {
          message?: string | undefined;
        }
      ) => void
    ) {
      try {
        const user = await prisma?.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'Invalid email or password.',
          });
        }

        if (user.hashedPassword !== null) {
          const passwordMatch = await compare(password, user.hashedPassword);
          if (!passwordMatch) {
            return done(null, false, { message: 'Invalid email or password.' });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


passport.serializeUser(function (user: any, done: (error: any, id?: any) => void) {
  done(null, user.id);
});

passport.deserializeUser(async function (id: any, done: (error: any, user?: any) => void) {
  try {
    const user = await prisma?.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
