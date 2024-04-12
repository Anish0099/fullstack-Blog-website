import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export async function main(){

    
    try {
        await prisma.$connect();
        
    } catch (error) {
        return Error("Database connection error");
    }
}

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;