import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SendIcon } from "../icons";

const ChatArea = () => {
  return (
    <>
      <div className="flex flex-col w-2/3 h-full">
        <div className="flex items-center p-4 border-b">
          <Avatar className="mr-4">
            <AvatarImage src="/placeholder-user.jpg" alt="Kristine" />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">Kristine</div>
            <div className="text-xs text-muted-foreground">Typing...</div>
          </div>
        </div>
        <div
          className="flex-1 p-4 space-y-4 overflow-y-auto"
          style={{ overflowX: "hidden" }}
        >
          <div className="p-4 bg-gray-100 rounded-lg">
            Hello, i wanted to know more about the product design position
            opened at Atlassian
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            Hello, i wanted to know more about the product design position
            opened at Atlassian
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            Hello, i wanted to know more about the product design position
            opened at Atlassian
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            Hello, i wanted to know more about the product design position
            opened at Atlassian
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            Hello, i wanted to know more about the product design position
            opened at Atlassian
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            Hello, i wanted to know more about the product design position
            opened at Atlassian
          </div>
          <div className="flex justify-end">
            <div className="p-4 bg-red-500 text-white rounded-lg">
              Sure, tell us. what do you wanna know?
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            Take this part of your letter seriously because it's likely one of
            your first genuine opportunities to make a personal, positive
            impression on a prospective employer. You want your words to invite
            them to keep reading and to convey exactly why you're the best
            choice for their open position. Review your language to ensure it's
            concise and informative. If you're applying to multiple positions,
            take great care to edit your letter so that the first paragraph is
            personal and relevant to the exact position you want.
          </div>
          <div className="flex justify-end">
            <div className="p-4 bg-red-500 text-white rounded-lg">
              You've a good folio
            </div>
          </div>
          <div className="flex justify-end">
            <div className="p-4 bg-red-500 text-white rounded-lg">
              However we're looking for someone with a little more experience!
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-right">3 days</div>
        </div>
        <div className="flex items-center p-4 border-t">
          <Input
            type="text"
            placeholder="Type your message here"
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="ml-2">
            <SendIcon className="w-6 h-6 text-red-500" />
          </Button>
        </div>
      </div>
    </>
  );
};

export { ChatArea };
