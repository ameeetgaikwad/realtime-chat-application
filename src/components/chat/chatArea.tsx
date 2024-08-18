import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ClipIcon, SendIcon } from "../icons";
import { useChat } from "@/contexts/chatContext";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDebounce } from "use-debounce";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";

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
    fetchMoreMessages,
  } = useChat();
  const [messageContent, setMessageContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [debouncedMessageContent] = useDebounce(messageContent, 800);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const message = recentMessages?.find(
      (msg) => msg.conversationId == activeConversation
    );
    if (message) {
      markMessagesAsRead(message?.recentMessage?.id);
    }
  }, [activeConversation, messages, currentUser, recentMessages]);

  const handleSendMessage = async () => {
    toast.info("Sending message");

    if (activeConversation && currentUser) {
      setIsTyping(false);
      if (file) {
        try {
          const storageRef = ref(
            storage,
            `chat_files/${Date.now()}_${file.name}`
          );
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          console.log("File available at", downloadURL);
          sendMessage(
            activeConversation,
            messageContent,
            currentUser.id,
            downloadURL,
            file.type
          );
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        setFile(null);
      } else if (messageContent.trim()) {
        sendMessage(activeConversation, messageContent, currentUser.id);
      }
      setMessageContent("");
      getLatestMessages(currentUser?.id as number);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (isLoadingMore) {
        return;
      }
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 800);
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [messages]);

  useEffect(() => {
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
    if (user) {
      joinChat(
        user?.emailAddresses[0].emailAddress,
        user?.firstName || "",
        user?.lastName || ""
      );
    }
  }, [user, isSignedIn]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container && !isLoadingMore) {
      const { scrollTop } = container;
      if (scrollTop === 0) {
        loadMoreMessages();
      }
    }
  };

  const loadMoreMessages = () => {
    if (activeConversation && messages[activeConversation]?.length > 0) {
      setIsLoadingMore(true);

      fetchMoreMessages(activeConversation, 20);
      setTimeout(() => {
        setIsLoadingMore(false);
        console.log("total messages", messages[activeConversation]);
      }, 2000); // Prevent multiple rapid calls
    }
  };

  if (allUsers.length <= 0) {
    return "";
  }
  if (!activeConversation) {
    return (
      <div className="flex-1 p-4">Select a conversation to start chatting</div>
    );
  }

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
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto overflow-x-hidden"
        onScroll={handleScroll}
      >
        {isLoadingMore && (
          <div className="text-center text-gray-500">
            Loading more messages...
          </div>
        )}
        {activeMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 max-w-[70%] break-words rounded-lg ${message.senderId === currentUser?.id ? "bg-[#EF6144] text-white" : "bg-[#F6F6F6] text-[#454545]"}`}
            >
              {message.mediaUrl && message.mediaType?.startsWith("image") && (
                <img
                  src={message.mediaUrl || ""}
                  alt="Uploaded content"
                  className="max-w-full h-auto mb-2 rounded"
                />
              )}
              {message.mediaUrl && message.mediaType?.startsWith("video") && (
                <video controls className="max-w-full h-auto mb-2 rounded">
                  <source src={message.mediaUrl} type={message.mediaType} />
                  Your browser does not support the video tag.
                </video>
              )}
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="hidden"
        />
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => fileInputRef.current?.click()}
        >
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
      {file && (
        <div className="p-2 bg-gray-100">
          <p>Selected file: {file.name}</p>
          <Button onClick={() => setFile(null)}>Remove</Button>
        </div>
      )}
    </div>
  );
};

export { ChatArea };
