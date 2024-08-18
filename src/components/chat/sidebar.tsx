import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useChat, User } from "@/contexts/chatContext";
import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";
import { CHAT_CATEGORIES } from "@/constants/chat-categories";
import { SearchIcon } from "../icons";
import { useEffect, useMemo, useState } from "react";
import { truncateText } from "@/utils/text";

const Sidebar = () => {
  const {
    conversations,
    allUsers,
    setActiveConversation,
    startConversation,
    setCurrentReceipient,
    getConversation,
    currentReceipient,
    currentUser,
    recentMessages,
    getLatestMessages,
  } = useChat();

  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    getLatestMessages(currentUser?.id as number);
  }, [currentUser]);

  const handleUserClick = (user: User) => {
    setCurrentReceipient(user);
    const existingConversation = conversations.find(
      (conv) => conv.user1Id === user.id || conv.user2Id === user.id
    );

    if (existingConversation) {
      setActiveConversation(existingConversation.id);
      getConversation(existingConversation.id);
    } else {
      startConversation(user.id, currentUser?.id as number);
    }
  };

  const renderLatestMessage = (user: User) => {
    const conversation = conversations.find(
      (conv) => conv.user1Id === user?.id || conv.user2Id === user?.id
    );
    if (conversation) {
      const message = recentMessages.find(
        (msg) => msg.conversationId === conversation.id
      );
      if (!message?.recentMessage?.mediaType) {
        return (
          <div className="text-[#454545] font-medium">
            {truncateText(message?.recentMessage?.content || "", 50)}
          </div>
        );
      } else {
        return (
          <div className="text-[#454545] font-medium">
            <span className="text-[#454545] font-medium">Media</span>
          </div>
        );
      }
    }
    return <></>;
  };

  const isRead = (user: User) => {
    const conversation = conversations.find(
      (conv) => conv.user1Id === user?.id || conv.user2Id === user?.id
    );

    if (conversation) {
      const message = recentMessages.find(
        (msg) => msg.conversationId === conversation.id
      );
      if (message == undefined) {
        return true;
      }
      if (message?.recentMessage?.senderId === currentUser?.id) return true;
      return message?.recentMessage?.isRead;
    }
    return false;
  };

  const filteredUsers = useMemo(() => {
    if (currentCategory === "All") return allUsers;
    else if (currentCategory === "Archived" || currentCategory === "Blocked") {
      return [];
    } else if (currentCategory === "Unread") {
      return allUsers.filter((user) => !isRead(user));
    } else {
      return allUsers;
    }
  }, [allUsers, currentCategory, recentMessages]);

  return (
    <>
      {allUsers.length > 0 ? (
        <div className="w-1/3 border-r">
          <div className="p-4 flex items-center">
            <SearchIcon className="absolute left-5" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-8 bg-[#F6F6F6] text-[#6E6D6D] border-[#D1D1D1] border-[1px]"
            />
          </div>
          <div className="flex gap-3 p-2 mb-2 overflow-x-scroll">
            {CHAT_CATEGORIES.map((category) => {
              return (
                <button
                  key={category}
                  className={cn(
                    "text-xs text-[#DC4A2D] bg-[#FEF4F2] border-[#FCB4A5] border-[1px] rounded-full px-2",
                    currentCategory === category && "bg-[#DC4A2D] text-white"
                  )}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex items-start p-4 border-b cursor-pointer",
                  !isRead(user) && "bg-[#FEE7E2]",
                  isRead(user) == undefined && "bg-[#ffffff]",
                  currentReceipient?.id === user.id &&
                    "bg-[#F6F6F6] border-l-2 border-l-[#DC4A2D]"
                )}
                onClick={() => handleUserClick(user)}
              >
                <Avatar className="mr-4">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.email} />
                  <AvatarFallback>{user.email[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{`${user.firstName} ${user.lastName}`}</div>
                  <div className="text-xs text-muted-foreground flex flex-wrap">
                    {renderLatestMessage(user)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-screen flex items-center justify-center w-full">
            <Spinner />
          </div>
        </>
      )}
    </>
  );
};

export { Sidebar };
