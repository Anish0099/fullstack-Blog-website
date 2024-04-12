import { NextResponse } from "next/server";
import { main } from "@/lib/db";
import prisma from "@/lib/db";




export const GET = async (req: Request,res:NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        console.log(posts)

        return NextResponse.json({message:"success",posts},{status:200})
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } finally{
        await prisma.$disconnect();
    }
    
}

export const POST = async (req: Request,res:NextResponse) => {
    try {
        const { title, description } = await req.json();
        await main();
        const post = await prisma.post.create({ data: { description, title } });
        return NextResponse.json({ message: "Success", post }, { status: 201 });
      } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
      } finally {
        await prisma.$disconnect();
      }
    
}