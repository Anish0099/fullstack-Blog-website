import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $posts } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export const GET = async (req: Request, res: NextResponse) => {

    try {
        const id = req.url.split("/blog/")[1]
        const postId = parseInt(id);
        const post = await db.select().from($posts).where(eq($posts.id, postId));
        
        return NextResponse.json({message:"success",post},{status:200})
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } 
    
}

export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1]
        const postId = parseInt(id);
        
        const post = await db.delete($posts).where(eq($posts.id, postId));
        return NextResponse.json({message:"success",post},{status:200}) 
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } 
}

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1]
        const postId = parseInt(id);
        const {title, description} = await req.json();
        
        const post = await db.update($posts).set({title, description}).where(eq($posts.id, postId));
        return NextResponse.json({message:"success",post},{status:200}) 
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } 
    
}