"use client";

import { useChat } from "ai/react";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md  mx-auto stretch">
      <form onSubmit={handleSubmit}>
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))}
        </ScrollArea>
        <div className="w-full mt-2">
          <Input
            className="w-[22rem] mb-0  border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}

// import { Copy } from "lucide-react";

// export function Scrolls() {
//   return (
//     <div>
//       Jokester began sneaking into the castle in the middle of the night and
//       leaving jokes all over the place: under the king's pillow, in his soup,
//       even in the royal toilet. The king was furious, but he couldn't seem to
//       stop Jokester. And then, one day, the people of the kingdom discovered
//       that the jokes left by Jokester were so funny that they couldn't help but
//       laugh. And once they started
//     </div>
//   );
// }
