import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github"

import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_CLIENTSECRET!
        }),
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text", placeholder: "John Smith" },
            },
            async authorize(credentials, req): Promise<any> {
                console.log(this.authorize)
                const user = {
                    email: "teste@email.com",
                    password: "123456",
                    name: "testUser"
                }
                return user
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",
}
