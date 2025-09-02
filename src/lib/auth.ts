import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true,
        signUp: {
            enabled: true,
            fields: {
                name: { type: "text", required: true },
                email: { type: "email", required: true },
                password: { type: "password", required: true },
            },
        },
        signIn: {
            enabled: true,
            fields: {
                email: { type: "email", required: true },
                password: { type: "password", required: true },
            },
        },
    }
});