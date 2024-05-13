import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';
import { auth } from '@clerk/nextjs';
import { $posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  
  const { messages } = await req.json();

  const { userId } = auth();
  const posts = await db
    .select()
    .from($posts)
    .where(eq($posts.userId, userId!));

  const systemMessage = {
    role: 'system',
    content: 'You are a intelligent assistant. You answer the users questions based on their existing notes.' + 'The relevant notes are:\n ' + posts.map((post) => `Title : ${post.title}\n\n Description : \n${post.description}`).join('\n\n')
  }

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [systemMessage, ...messages],
  });

  return new StreamingTextResponse(result.toAIStream());
}