import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ClipIcon, SendIcon } from "../icons";
import { useChat } from "@/contexts/chatContext";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDebounce } from "use-debounce";

const ChatArea = () => {
  const { user, isSignedIn } = useUser();
  const {
    messages,
    sendMessage,
    activeConversation,
    currentUser,
    joinChat,
    currentReceipient,
    startTyping,
    isUserTyping,
    isUserOnline,
    allUsers,
    getLatestMessages,
    recentMessages,
    markMessagesAsRead,
  } = useChat();
  const [messageContent, setMessageContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [debouncedMessageContent] = useDebounce(messageContent, 800);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const message = recentMessages?.find(
      (msg) => msg.conversationId == activeConversation
    );
    if (message) {
      markMessagesAsRead(message?.recentMessage?.id);
    }
  }, [activeConversation, messages, currentUser, recentMessages]);

  const handleSendMessage = () => {
    if (activeConversation && messageContent.trim() && currentUser) {
      setIsTyping(false);
      sendMessage(activeConversation, messageContent, currentUser.id);
      setMessageContent("");
      getLatestMessages(currentUser?.id as number);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    console.log("inside use effect", isUserOnline);
    if (isUserOnline[currentReceipient?.id as number] == false) {
      setIsOnline(false);
    } else if (currentReceipient?.isOnline) {
      setIsOnline(true);
    } else if (isUserOnline[currentReceipient?.id as number]) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [isUserOnline, currentReceipient]);

  useEffect(() => {
    if (messageContent && !isTyping && activeConversation && currentUser) {
      setIsTyping(true);
      startTyping(true, activeConversation, currentUser?.id);
    }

    if (!messageContent && activeConversation && currentUser) {
      startTyping(false, activeConversation, currentUser?.id);
    }

    if (
      debouncedMessageContent === messageContent &&
      isTyping &&
      activeConversation &&
      currentUser
    ) {
      setIsTyping(false);
      startTyping(false, activeConversation, currentUser?.id);
    }
  }, [messageContent, debouncedMessageContent]);

  useEffect(() => {
    console.log("inside use effect");
    if (user) {
      console.log("inside if", user?.emailAddresses[0].emailAddress);
      joinChat(
        user?.emailAddresses[0].emailAddress,
        user?.firstName || "",
        user?.lastName || ""
      );
      console.log("donnee");
    }
  }, [user, isSignedIn]);

  if (allUsers.length <= 0 || recentMessages.length <= 0) {
    return "";
  }
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
          <div className="font-semibold flex gap-1">
            {currentReceipient?.firstName}
            {isOnline ? (
              <div className="rounded-full bg-green-400 w-2 h-2"></div>
            ) : (
              ""
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {isUserTyping[activeConversation]?.isTyping == true &&
            isUserTyping[activeConversation]?.userId == currentReceipient?.id
              ? "Typing..."
              : ""}
          </div>
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
              className={`p-3 rounded-lg ${message.senderId === currentUser?.id ? "bg-[#EF6144] text-white" : "bg-[#F6F6F6] text-[#454545]"}`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-4 border-t gap-2">
        <Input
          type="text"
          placeholder="Type your message here"
          className="flex-1 bg-[#F6F6F6] text-[#6E6D6D] border-[#D1D1D1] border-[1px]"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="ghost" size="icon" className="">
          <ClipIcon className="w-6 h-6 text-red-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 hover:bg-[#FEE7E2]"
          onClick={handleSendMessage}
        >
          <SendIcon className="w-6 h-6 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export { ChatArea };
