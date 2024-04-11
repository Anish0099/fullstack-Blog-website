import { PrismaClient } from '@prisma/client';
export async function main(){

    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        
    } catch (error) {
        return Error("Database connection error");
    }
}