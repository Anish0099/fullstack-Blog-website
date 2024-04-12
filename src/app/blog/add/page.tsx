"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const postBlog = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const res = fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🚀", { id: "1" });
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Blog Posted Successfully", { id: "1" });
      router.push("/");
    }
  };
  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4 p-2">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 text-slate-800 dark:text-slate-200 font-bold p-3">
            Add A Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="bg-slate-200 dark:bg-slate-800 rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md bg-slate-200 dark:bg-slate-800 px-4 py-2 w-full my-2"
            ></textarea>
            <Button className="font-semibold px-4 py-2 shadow-xl  rounded-lg m-auto ">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlog;
