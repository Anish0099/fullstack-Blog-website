import prisma from "../../prisma";
export async function main(){
    try {
        await prisma.$connect();
        
    } catch (error) {
        return Error("Database connection error");
    }
}