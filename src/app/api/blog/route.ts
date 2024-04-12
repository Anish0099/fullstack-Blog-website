import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $posts } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";


export const runtime = "edge";

// export const GET = async (req: Request,res:NextResponse) => {
//     // try {
//     //     await main();
//     //     const posts = await prisma.post.findMany();
//     //     console.log(posts)

//     //     return NextResponse.json({message:"success",posts},{status:200})
        
//     // } catch (error) {
//     //     return NextResponse.json({
//     //         status: 500,
//     //         message: "Internal Server Error",
//     //     }) 
//     // } finally{
//     //     await prisma.$disconnect();
//     // }
    
// }

export const POST = async (req: Request,res:NextResponse) => {
    const { userId } = auth();
    console.log(userId)
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
    try {
        const body = await req.json();
        const {title, description} = body;
       console.log(title,description)

       const post_ids = await db
       .insert($posts).values({
         title,
         description,
         userId,
       })
       .returning({
         insertedId: $posts.id,
       });

       return NextResponse.json({
        post_id: post_ids[0].insertedId,
      });
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        }) 
    } 
    
}