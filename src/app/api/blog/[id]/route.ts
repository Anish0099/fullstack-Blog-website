import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { main } from "@/utils";

const prisma = new PrismaClient();
export const GET = async (req: Request, res: NextResponse) => {

    try {
        const id = req.url.split("/blog/")[1]
        await main();
        const post = await prisma.post.findUnique({ where: { id } });
        return NextResponse.json({message:"success",post},{status:200})
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } finally{
        await prisma.$disconnect();
    }
    
}

export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1];
        await main();
        const post = await prisma.post.delete({where: {id}});
        return NextResponse.json({message:"success",post},{status:200}) 
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } finally{
        await prisma.$disconnect();
    }
}

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1];
        const {title, description} = await req.json();
        await main();
        const post = await prisma.post.update({data: {title, description}, where: {id}});
        return NextResponse.json({message:"success",post},{status:200}) 
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } finally{
        await prisma.$disconnect();
    }
    
}