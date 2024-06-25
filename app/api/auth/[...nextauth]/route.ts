import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from "axios"
import { headers } from "next/headers"

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 30;         // 30 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 24 * 60 * 60;  // 1 day

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  "credentials": async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'PaperDog',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'PaperDog',
        },
        password: {
          label: 'Password',
          type: 'text',
          placeholder: 'Manifesto',
        },
      },
      
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "login/",
            method: "post",
            data: credentials,
          });
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      if (account == null) return false;
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user, account, profile, email, credentials
      );
    },
    async jwt({user, token, account}) {
      if (user && account) {
        let backendResponse = account.provider === "credentials" ? user: account.meta;
        //@ts-ignore
        token["user"] = backendResponse.user;
        //@ts-ignore
        token["access_token"] = backendResponse.access;
        //@ts-ignore
        token["refresh_token"] = backendResponse.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        const respID = await fetch(process.env.NEXT_BACKEND_URL+"paperdog2/manifesto", {
            method: "GET",
            headers: headers()
          }).then((res) =>
            res.json()
          )
        console.log(respID)

        return token;
      }
      //@ts-ignore
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      return token;
    },
    async session({ session, token }) {
      //console.log('callback....6')
      //console.log(session)
      //token.expires = session.expires
      //control what is actually visible even at the token level
      //session = token
      
      const newuser = {
        "first_name": 'greatest',
        "last_name": 'ever',
        "email": 'creator@paperdog.org',
        //@ts-ignore
        "username": token.user.username
      }
      session.user = newuser
      console.log('callback....23')
      console.log(session)
      console.log(token)
      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
})

export { handler as GET, handler as POST}