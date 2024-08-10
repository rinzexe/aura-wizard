import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { useState } from 'react';

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const handler = NextAuth({
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.token = token
      return session;
    },
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+connections+guilds",
    }),
  ],
  secret: process.env.SECRET,
})

export { handler as GET, handler as POST }