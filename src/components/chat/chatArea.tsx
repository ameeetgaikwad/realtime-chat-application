import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SendIcon } from "../icons";
import { useChat } from "@/contexts/chatContext";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const ChatArea = () => {
  const { user, isSignedIn } = useUser();

  const {
    messages,
    sendMessage,
    activeConversation,
    currentUser,
    joinChat,
    currentReceipient,
  } = useChat();
  const [messageContent, setMessageContent] = useState("");

  const handleSendMessage = () => {
    if (activeConversation && messageContent.trim() && currentUser) {
      sendMessage(activeConversation, messageContent, currentUser.id);
      setMessageContent("");
    }
  };

  useEffect(() => {
    console.log("inside use effect");
    if (user) {
      console.log("inside if",user?.emailAddresses[0].emailAddress);
      joinChat(
        user?.emailAddresses[0].emailAddress,
        user?.firstName || "",
        user?.lastName || ""
      );
    }
  }, [user, isSignedIn]);

  if (!activeConversation) {
    return (
      <div className="flex-1 p-4">Select a conversation to start chatting</div>
    );
  }
  // console.log(messages,'kj')
  const activeMessages = messages[activeConversation] || [];
  return (
    <div className="flex flex-col w-2/3 h-full">
      <div className="flex items-center p-4 border-b">
        <Avatar className="mr-4">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{currentReceipient?.firstName}</div>
          <div className="text-xs text-muted-foreground">Online</div>
        </div>
      </div>
      <div
        className="flex-1 p-4 space-y-4 overflow-y-auto"
        style={{ overflowX: "hidden" }}
      >
        {activeMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-4 rounded-lg ${message.senderId === currentUser?.id ? "bg-red-500 text-white" : "bg-gray-100"}`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 border-t">
        <Input
          type="text"
          placeholder="Type your message here"
          className="flex-1"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={handleSendMessage}
        >
          <SendIcon className="w-6 h-6 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export { ChatArea };
