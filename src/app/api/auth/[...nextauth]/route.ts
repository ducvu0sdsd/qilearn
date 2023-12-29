import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        session({ session, token, user }: { session: any, token: any, user: any }) {
            return session // The return type will match the one returned in `useSession()`
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }