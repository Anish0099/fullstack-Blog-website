import { db } from "@/lib/db";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { $posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import { ModeToggle } from "@/components/mode-toggle";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Chat from "./chat/page";

export default async function Home() {
  const { userId } = auth();
  const posts = await db
    .select()
    .from($posts)
    .where(eq($posts.userId, userId!));

  return (
    <main className="w-full h-full p-1">
      <div className="md:w-2/4  sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
          My FULL STACK Blog App With Next.js
        </h1>
      </div>
      {/* Link */}
      <div className="w-full flex  flex-col justify-center items-center">
        <div className=" w-3/4 p-4 rounded-md mx-3 my-2    flex justify-center  items-center gap-2">
          <div>
            <Link
              href={"/blog/add"}
              className=" md:w-1/6 sm:w-2/4 text-center flex justify-center items-center gap-2 rounded-md p-2 m-auto  font-semibold"
            >
              <Button>Add new Blog</Button>
              <UserButton />
            </Link>
          </div>

          <div className="flex justify-center items-center gap-2 text-slate-200 font-semibold">
            <ModeToggle />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Ai Bot</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Ai ChatBot</DialogTitle>
                  <DialogDescription>
                    Chat with this AI releated to your posts!.
                  </DialogDescription>
                </DialogHeader>

                <Chat />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="w-full flex  flex-col justify-center items-center">
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="w-3/4 p-4 rounded-md mx-3 my-2 dark:bg-slate-800 bg-slate-200  flex flex-col justify-center"
          >
            {/* Title and Action */}
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-4 py-1  text-center text-xl  rounded-md font-semibold text-slate-200"
              >
                <Button>Edit</Button>
              </Link>
            </div>
            {/* Date & Description */}
            <div className="mr-auto my-1">
              <blockquote className="font-bold light:text-slate-700 dark:text-slate-400">
                {new Date(post.createdAt).toDateString()}
              </blockquote>
            </div>
            <div className=" mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
